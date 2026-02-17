export interface Project {
  id: string;
  name: string;
  // Optional repo name - if different from display name (e.g., "Godot Engine" vs "godot")
  repo?: string;
  description: string | null;
  url: string;
  platform: 'github' | 'gitlab' | 'sourceforge' | 'bitbucket';
  stars: number;
  forks: number;
  language: string | null;
  license: string | null;
  lastUpdated: Date | string;
  downloadedCount: number;
  avatarUrl: string | null;
  owner: string;
  defaultBranch: string;
  topics: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
  watchers?: number;
  issues?: number;
  size?: number;
  homepage?: string | null;
  categories?: Category[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  color: string | null;
}

export interface Download {
  id: string;
  projectId: string;
  format: 'zip' | 'tarball';
  source: 'software-heritage' | 'platform-native';
  createdAt: Date;
}

export interface SearchFilters {
  query?: string;
  platform?: string;
  language?: string;
  category?: string;
  sort?: 'stars' | 'forks' | 'updated' | 'downloads';
  order?: 'asc' | 'desc';
}

export interface GitHubRepo {
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
  owner: {
    login: string;
    avatar_url: string;
  };
  default_branch: string;
  topics: string[];
}

export interface SoftwareHeritageArchiveResponse {
  archive_url: string;
}
