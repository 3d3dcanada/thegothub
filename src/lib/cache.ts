// Redis caching layer with in-memory fallback
// Supports TTL, namespacing, and automatic fallback

interface CacheOptions {
  ttl?: number; // Time to live in seconds
  namespace?: string;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

// In-memory cache with TTL support
const memoryCache = new Map<string, CacheEntry<unknown>>();

// Redis client (lazy loaded)
let redisClient: Awaited<ReturnType<typeof createRedisClient>> | null = null;

async function createRedisClient() {
  try {
    const { Redis } = await import('@upstash/redis');
    return Redis.fromEnv();
  } catch {
    return null;
  }
}

// Check if entry is still valid
function isValid<T>(entry: CacheEntry<T> | undefined): entry is CacheEntry<T> {
  if (!entry) return false;
  return Date.now() - entry.timestamp < entry.ttl * 1000;
}

// Get from memory cache
function getMemory<T>(key: string): T | null {
  const entry = memoryCache.get(key) as CacheEntry<T> | undefined;
  if (isValid(entry)) {
    return entry.data;
  }
  memoryCache.delete(key);
  return null;
}

// Set in memory cache
function setMemory<T>(key: string, data: T, ttl: number): void {
  memoryCache.set(key, {
    data,
    timestamp: Date.now(),
    ttl,
  });
  
  // Cleanup old entries periodically
  if (memoryCache.size > 1000) {
    const now = Date.now();
    for (const [k, v] of memoryCache.entries()) {
      if (!isValid(v as CacheEntry<unknown>)) {
        memoryCache.delete(k);
      }
    }
  }
}

// Main cache functions
export async function cacheGet<T>(key: string, options: CacheOptions = {}): Promise<T | null> {
  const fullKey = options.namespace ? `${options.namespace}:${key}` : key;
  
  // Try Redis first
  try {
    if (!redisClient) {
      redisClient = await createRedisClient();
    }
    
    if (redisClient) {
      const data = await redisClient.get<T>(fullKey);
      return data;
    }
  } catch {
    // Fall back to memory
  }
  
  // Fallback to memory
  return getMemory<T>(fullKey);
}

export async function cacheSet<T>(
  key: string, 
  data: T, 
  options: CacheOptions = {}
): Promise<void> {
  const fullKey = options.namespace ? `${options.namespace}:${key}` : key;
  const ttl = options.ttl || 3600; // Default 1 hour
  
  // Try Redis first
  try {
    if (!redisClient) {
      redisClient = await createRedisClient();
    }
    
    if (redisClient) {
      await redisClient.set(fullKey, data, { ex: ttl });
      return;
    }
  } catch {
    // Fall back to memory
  }
  
  // Fallback to memory
  setMemory(fullKey, data, ttl);
}

export async function cacheDelete(key: string, namespace?: string): Promise<void> {
  const fullKey = namespace ? `${namespace}:${key}` : key;
  
  // Try Redis
  try {
    if (!redisClient) {
      redisClient = await createRedisClient();
    }
    
    if (redisClient) {
      await redisClient.del(fullKey);
    }
  } catch {
    // Ignore
  }
  
  // Also delete from memory
  memoryCache.delete(fullKey);
}

export async function cacheDeletePattern(pattern: string, namespace?: string): Promise<void> {
  const fullPattern = namespace ? `${namespace}:${pattern}` : pattern;
  
  // Try Redis
  try {
    if (!redisClient) {
      redisClient = await createRedisClient();
    }
    
    if (redisClient) {
      // Note: Upstash Redis doesn't support KEYS command well
      // For production, use a set to track keys or use SCAN
      // For now, we'll just clear memory cache
    }
  } catch {
    // Ignore
  }
  
  // Clear matching from memory
  for (const key of memoryCache.keys()) {
    if (key.includes(pattern)) {
      memoryCache.delete(key);
    }
  }
}

// Cache wrapper for async functions
export function withCache<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  keyGenerator: (...args: Parameters<T>) => string,
  options: CacheOptions = {}
): T {
  return (async (...args: Parameters<T>) => {
    const key = keyGenerator(...args);
    const cached = await cacheGet<ReturnType<T>>(key, options);
    
    if (cached !== null) {
      return cached;
    }
    
    const result = await fn(...args);
    await cacheSet(key, result, options);
    return result;
  }) as T;
}

// Pre-configured cache namespaces with TTLs
export const caches = {
  github: {
    get: <T>(key: string) => cacheGet<T>(key, { namespace: 'gh', ttl: 3600 }),
    set: (key: string, data: unknown) => cacheSet(key, data, { namespace: 'gh', ttl: 3600 }),
  },
  trending: {
    get: <T>(key: string) => cacheGet<T>(key, { namespace: 'trend', ttl: 900 }), // 15 min
    set: (key: string, data: unknown) => cacheSet(key, data, { namespace: 'trend', ttl: 900 }),
  },
  search: {
    get: <T>(key: string) => cacheGet<T>(key, { namespace: 'search', ttl: 300 }), // 5 min
    set: (key: string, data: unknown) => cacheSet(key, data, { namespace: 'search', ttl: 300 }),
  },
  project: {
    get: <T>(key: string) => cacheGet<T>(key, { namespace: 'proj', ttl: 7200 }), // 2 hours
    set: (key: string, data: unknown) => cacheSet(key, data, { namespace: 'proj', ttl: 7200 }),
  },
};