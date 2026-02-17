// GitHub API Service - Fetches real data from GitHub

const GITHUB_API_BASE = 'https://api.github.com';

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  license: { name: string } | null;
  updated_at: string;
  created_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  default_branch: string;
  topics: string[];
  forks: number;
  open_issues_count: number;
  watchers_count: number;
  size: number;
  homepage: string | null;
}

export interface GitHubSearchResult {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubRepository[];
}

export interface GitHubContent {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string | null;
  type: 'file' | 'dir';
  content?: string;
  encoding?: string;
}

export interface GitHubReadme {
  name: string;
  path: string;
  html_url: string;
  content: string;
  encoding: string;
}

class GitHubAPI {
  private token: string | undefined;

  constructor() {
    this.token = process.env.GITHUB_TOKEN;
  }

  private async fetch<T>(endpoint: string): Promise<T> {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (this.token) {
      headers['Authorization'] = `token ${this.token}`;
    }

    const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `GitHub API error: ${response.status}`);
    }

    return response.json();
  }

  // Search repositories
  async searchRepositories(query: string, options?: {
    sort?: 'stars' | 'forks' | 'updated';
    order?: 'asc' | 'desc';
    page?: number;
    perPage?: number;
  }): Promise<GitHubSearchResult> {
    const params = new URLSearchParams({
      q: query,
      sort: options?.sort || 'stars',
      order: options?.order || 'desc',
      page: String(options?.page || 1),
      per_page: String(options?.perPage || 20),
    });

    return this.fetch<GitHubSearchResult>(`/search/repositories?${params}`);
  }

  // Get trending repositories
  async getTrendingRepositories(options?: {
    language?: string;
    dateRange?: 'daily' | 'weekly' | 'monthly';
    limit?: number;
  }): Promise<GitHubRepository[]> {
    const { language, dateRange = 'weekly', limit = 20 } = options || {};
    
    const date = new Date();
    if (dateRange === 'daily') date.setDate(date.getDate() - 1);
    else if (dateRange === 'weekly') date.setDate(date.getDate() - 7);
    else date.setMonth(date.getMonth() - 1);
    
    const dateString = date.toISOString().split('T')[0];
    let query = `created:>${dateString}`;
    if (language) query += `+language:${language}`;
    
    const result = await this.searchRepositories(query, {
      sort: 'stars',
      order: 'desc',
      perPage: limit,
    });
    
    return result.items;
  }

  // Get top repositories by stars
  async getTopRepositories(options?: {
    language?: string;
    limit?: number;
  }): Promise<GitHubRepository[]> {
    const { language, limit = 20 } = options || {};
    
    let query = '';
    if (language) query = `language:${language}`;
    
    const result = await this.searchRepositories(query || '*', {
      sort: 'stars',
      order: 'desc',
      perPage: limit,
    });
    
    return result.items;
  }

  // Get repository details
  async getRepository(owner: string, repo: string): Promise<GitHubRepository> {
    return this.fetch<GitHubRepository>(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`);
  }

  // Get repository contents (file tree)
  async getContents(owner: string, repo: string, path: string = ''): Promise<GitHubContent[]> {
    const endpoint = path
      ? `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${encodeURIComponent(path)}`
      : `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents`;
    
    const data = await this.fetch<GitHubContent | GitHubContent[]>(endpoint);
    return Array.isArray(data) ? data : [data];
  }

  // Get README content
  async getReadme(owner: string, repo: string): Promise<GitHubReadme> {
    return this.fetch<GitHubReadme>(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/readme`);
  }

  // Get repository contributors
  async getContributors(owner: string, repo: string): Promise<Array<{
    login: string;
    avatar_url: string;
    contributions: number;
  }>> {
    return this.fetch(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contributors?per_page=10`);
  }

  // Get repository languages
  async getLanguages(owner: string, repo: string): Promise<Record<string, number>> {
    return this.fetch(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`);
  }
}

export const githubApi = new GitHubAPI();
