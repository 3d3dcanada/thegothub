'use client';

import { useQuery } from '@tanstack/react-query';
import type { Project } from '@/types';

interface UseProjectsOptions {
  query?: string;
  language?: string;
  sort?: 'stars' | 'forks' | 'updated';
  order?: 'asc' | 'desc';
  page?: number;
  perPage?: number;
}

interface UseProjectsResult {
  projects: Project[];
  isLoading: boolean;
  error: Error | null;
  total: number;
  page: number;
  totalPages: number;
  refetch: () => void;
}

export function useProjects(options: UseProjectsOptions = {}): UseProjectsResult {
  const {
    query = '',
    language,
    sort = 'stars',
    order = 'desc',
    page = 1,
    perPage = 20,
  } = options;

  const queryParams = new URLSearchParams();
  if (query) queryParams.set('q', query);
  if (language && language !== 'all') queryParams.set('language', language);
  queryParams.set('sort', sort);
  queryParams.set('order', order);
  queryParams.set('page', String(page));
  queryParams.set('per_page', String(perPage));

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['projects', query, language, sort, order, page, perPage],
    queryFn: async () => {
      const response = await fetch(`/api/github/search?${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    projects: data?.projects || [],
    isLoading,
    error: error as Error | null,
    total: data?.total || 0,
    page: data?.page || 1,
    totalPages: data?.totalPages || 1,
    refetch,
  };
}

export function useTrendingProjects(options: {
  dateRange?: 'daily' | 'weekly' | 'monthly';
  language?: string;
  limit?: number;
} = {}) {
  const { dateRange = 'weekly', language, limit = 20 } = options;

  const queryParams = new URLSearchParams();
  queryParams.set('dateRange', dateRange);
  queryParams.set('limit', String(limit));
  if (language) queryParams.set('language', language);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['trending', dateRange, language, limit],
    queryFn: async () => {
      const response = await fetch(`/api/github/trending?${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch trending projects');
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    projects: (data?.projects as Project[]) || [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
}

export function useProject(owner: string, repo: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['project', owner, repo],
    queryFn: async () => {
      const response = await fetch(
        `/api/github/repo/${owner}/${repo}?readme=true&contributors=true`
      );
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Project not found');
        }
        throw new Error('Failed to fetch project');
      }
      return response.json();
    },
    enabled: !!owner && !!repo,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    project: data?.project,
    readme: data?.readme,
    contributors: data?.contributors,
    isLoading,
    error: error as Error | null,
    refetch,
  };
}

export function useStats() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const response = await fetch('/api/github/stats');
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });

  return {
    stats: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
}

export interface FeaturedProjectData {
  id: string;
  name: string;
  owner: string;
  repo: string;
  description: string | null;
  avatarUrl: string | null;
  imageUrl: string | null;
  website: string | null;
  priority?: number;
  isActive?: boolean;
  isCorporate?: boolean;
  clickCount: number;
  impressionCount?: number;
  // GitHub API fields
  stars?: number;
  forks?: number;
  language?: string;
  updatedAt?: string;
}

interface UseFeaturedProjectsResult {
  featuredProjects: FeaturedProjectData[];
  totalClicks: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<any>;
}

export function useFeaturedProjects(limit: number = 4): UseFeaturedProjectsResult {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['featured', limit],
    queryFn: async () => {
      const response = await fetch(`/api/featured?limit=${limit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch featured projects');
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    featuredProjects: data?.projects || [],
    totalClicks: data?.totalClicks || 0,
    isLoading,
    error: error as Error | null,
    refetch,
  };
}

export async function trackFeaturedClick(id: string): Promise<number> {
  const response = await fetch(`/api/featured/${id}`, { method: 'POST' });
  if (!response.ok) {
    throw new Error('Failed to track click');
  }
  const data = await response.json();
  return data.clickCount;
}

// Free to Use Projects Hook
interface UseFreeToUseProjectsResult {
  projects: any[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<any>;
}

export function useFreeToUseProjects(limit: number = 8): UseFreeToUseProjectsResult {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['free-to-use', limit],
    queryFn: async () => {
      const response = await fetch(`/api/free-to-use?limit=${limit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch free-to-use projects');
      }
      return response.json();
    },
    staleTime: 0, // Always fetch fresh data on each page load for true randomness
    refetchOnWindowFocus: true,
  });

  return {
    projects: data?.projects || [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
}
