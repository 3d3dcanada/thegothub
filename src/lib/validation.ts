// Zod validation schemas for API inputs
import { z } from 'zod';

// GitHub owner/repo validation
export const githubOwnerSchema = z
  .string()
  .min(1, 'Owner cannot be empty')
  .max(39, 'Owner name too long')
  .regex(/^[a-zA-Z0-9_-]+$/, 'Invalid owner format');

export const githubRepoSchema = z
  .string()
  .min(1, 'Repo cannot be empty')
  .max(100, 'Repo name too long')
  .regex(/^[a-zA-Z0-9._-]+$/, 'Invalid repo format');

// Search validation
export const searchQuerySchema = z
  .string()
  .max(256, 'Query too long')
  .transform(q => q.trim())
  .refine(q => q.length === 0 || q.length >= 2, {
    message: 'Query must be at least 2 characters',
  });

export const languageSchema = z.enum([
  'all', 'javascript', 'typescript', 'python', 'go', 'rust', 
  'java', 'cpp', 'ruby', 'php', 'swift', 'csharp', 'kotlin', 
  'dart', 'scala', 'shell'
]).optional();

export const sortSchema = z.enum(['stars', 'forks', 'updated']).optional();
export const orderSchema = z.enum(['asc', 'desc']).optional();

export const pageSchema = z
  .string()
  .transform(val => parseInt(val, 10))
  .refine(val => val > 0 && val < 1000, 'Page must be between 1 and 999')
  .optional();

export const perPageSchema = z
  .string()
  .transform(val => parseInt(val, 10))
  .refine(val => val > 0 && val <= 100, 'Per page must be between 1 and 100')
  .optional();

export const dateRangeSchema = z.enum(['daily', 'weekly', 'monthly']).optional();

// Full search params validation
export const searchParamsSchema = z.object({
  q: searchQuerySchema.optional(),
  language: languageSchema,
  sort: sortSchema,
  order: orderSchema,
  page: pageSchema,
  per_page: perPageSchema,
});

// Project validation
export const projectSchema = z.object({
  name: z.string().min(1).max(200),
  owner: z.string().min(1).max(100),
  description: z.string().max(1000).nullable(),
  url: z.string().url(),
  platform: z.enum(['github', 'gitlab', 'sourceforge', 'bitbucket']),
  stars: z.number().int().min(0),
  forks: z.number().int().min(0),
  language: z.string().max(50).nullable(),
  license: z.string().max(100).nullable(),
  topics: z.array(z.string().max(50)).max(20),
});

// Featured project validation
export const featuredProjectSchema = z.object({
  name: z.string().min(1).max(200),
  owner: z.string().min(1).max(100),
  repo: z.string().min(1).max(100),
  description: z.string().max(500).nullable(),
  website: z.string().url().nullable(),
  imageUrl: z.string().url().nullable(),
});

// Sanitize string for display (prevent XSS)
export function sanitizeString(str: string): string {
  return str
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Validate and parse search params from URL
export function parseSearchParams(params: URLSearchParams): {
  query: string;
  language: string;
  sort: 'stars' | 'forks' | 'updated';
  order: 'asc' | 'desc';
  page: number;
  perPage: number;
} {
  const result = searchParamsSchema.safeParse({
    q: params.get('q') || undefined,
    language: params.get('language') || undefined,
    sort: params.get('sort') || undefined,
    order: params.get('order') || undefined,
    page: params.get('page') || undefined,
    per_page: params.get('per_page') || undefined,
  });

  if (result.success) {
    return {
      query: result.data.q || '',
      language: result.data.language || 'all',
      sort: result.data.sort || 'stars',
      order: result.data.order || 'desc',
      page: result.data.page || 1,
      perPage: result.data.per_page || 20,
    };
  }

  // Return defaults on validation error
  return {
    query: '',
    language: 'all',
    sort: 'stars',
    order: 'desc',
    page: 1,
    perPage: 20,
  };
}