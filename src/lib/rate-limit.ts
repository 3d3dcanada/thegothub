// Rate limiting with Redis backing and in-memory fallback
// Supports IP + fingerprint-based throttling

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  keyPrefix?: string;
}

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

// In-memory fallback for when Redis is unavailable
const memoryStore = new Map<string, { count: number; resetTime: number }>();

function getMemoryRateLimit(key: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now();
  const record = memoryStore.get(key);
  
  if (!record || now > record.resetTime) {
    memoryStore.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - 1,
      reset: now + config.windowMs,
    };
  }
  
  if (record.count >= config.maxRequests) {
    return {
      success: false,
      limit: config.maxRequests,
      remaining: 0,
      reset: record.resetTime,
    };
  }
  
  record.count++;
  return {
    success: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - record.count,
    reset: record.resetTime,
  };
}

// Redis rate limiter (lazy loaded)
let redisRateLimiter: Awaited<ReturnType<typeof createRedisRateLimiter>> | null = null;

async function createRedisRateLimiter() {
  try {
    const { Ratelimit } = await import('@upstash/ratelimit');
    const { Redis } = await import('@upstash/redis');
    
    const redis = Redis.fromEnv();
    return new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, '1 m'),
      analytics: true,
      prefix: 'thegothub',
    });
  } catch {
    return null;
  }
}

export async function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = { windowMs: 60000, maxRequests: 100 }
): Promise<RateLimitResult> {
  // Try Redis first
  try {
    if (!redisRateLimiter) {
      redisRateLimiter = await createRedisRateLimiter();
    }
    
    if (redisRateLimiter) {
      const result = await redisRateLimiter.limit(identifier);
      return {
        success: result.success,
        limit: result.limit,
        remaining: result.remaining,
        reset: result.reset,
      };
    }
  } catch {
    // Fall back to memory
  }
  
  // Fallback to in-memory
  return getMemoryRateLimit(`${config.keyPrefix || 'rl'}:${identifier}`, config);
}

// Pre-configured rate limiters for different use cases
export const rateLimiters = {
  api: (ip: string) => checkRateLimit(ip, { windowMs: 60000, maxRequests: 100, keyPrefix: 'api' }),
  search: (ip: string) => checkRateLimit(ip, { windowMs: 60000, maxRequests: 30, keyPrefix: 'search' }),
  download: (ip: string) => checkRateLimit(ip, { windowMs: 60000, maxRequests: 20, keyPrefix: 'dl' }),
  featured: (ip: string) => checkRateLimit(ip, { windowMs: 60000, maxRequests: 10, keyPrefix: 'feat' }),
};

// Helper to extract client identifier
export function getClientIdentifier(request: Request): string {
  // Try various headers for real IP
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfIp = request.headers.get('cf-connecting-ip');
  
  if (cfIp) return cfIp;
  if (realIp) return realIp;
  if (forwarded) return forwarded.split(',')[0].trim();
  
  // Fallback to user agent hash for some identification
  const ua = request.headers.get('user-agent') || 'unknown';
  return `ua:${hashString(ua)}`;
}

function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}