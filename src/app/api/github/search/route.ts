// Fallback data for when GitHub API rate limit is hit
// Note: Real-time data preferred - caching system will populate cache over time
const FALLBACK_SEARCH_PROJECTS = [
  {
    id: '101',
    name: 'blender',
    description: 'Blender is the free and open source 3D creation suite.',
    url: 'https://github.com/blender/blender',
    platform: 'github' as const,
    stars: 125000,
    forks: 18000,
    language: 'Python',
    license: 'GPL-3.0',
    lastUpdated: new Date().toISOString(),
    downloadedCount: 5000000,
    avatarUrl: 'https://avatars.githubusercontent.com/u/156509?v=4',
    owner: 'blender',
    defaultBranch: 'main',
    topics: ['blender', '3d', 'graphics', 'animation', 'game-engine'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '102',
    name: 'godot',
    description: 'Godot Engine – Multi-platform 2D and 3D game engine',
    url: 'https://github.com/godotengine/godot',
    platform: 'github' as const,
    stars: 98000,
    forks: 22000,
    language: 'C++',
    license: 'MIT',
    lastUpdated: new Date().toISOString(),
    downloadedCount: 3200000,
    avatarUrl: 'https://avatars.githubusercontent.com/u/11782833?v=4',
    owner: 'godotengine',
    defaultBranch: 'master',
    topics: ['godot', 'game-engine', '2d', '3d', 'cpp'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '103',
    name: 'diffusers',
    description: 'Diffusers: State-of-the-art diffusion models for image and audio generation in PyTorch',
    url: 'https://github.com/huggingface/diffusers',
    platform: 'github' as const,
    stars: 28000,
    forks: 5200,
    language: 'Python',
    license: 'Apache-2.0',
    lastUpdated: new Date().toISOString(),
    downloadedCount: 890000,
    avatarUrl: 'https://avatars.githubusercontent.com/u/25720743?v=4',
    owner: 'huggingface',
    defaultBranch: 'main',
    topics: ['diffusion', 'pytorch', 'machine-learning', 'ai', 'image-generation'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '104',
    name: 'transformers',
    description: '🤗 Transformers: State-of-the-art Machine Learning for JAX, PyTorch and TensorFlow',
    url: 'https://github.com/huggingface/transformers',
    platform: 'github' as const,
    stars: 125000,
    forks: 28000,
    language: 'Python',
    license: 'Apache-2.0',
    lastUpdated: new Date().toISOString(),
    downloadedCount: 4500000,
    avatarUrl: 'https://avatars.githubusercontent.com/u/25720743?v=4',
    owner: 'huggingface',
    defaultBranch: 'main',
    topics: ['transformers', 'nlp', 'pytorch', 'tensorflow', 'machine-learning'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '105',
    name: 'nginx',
    description: 'An HTTP and reverse proxy server',
    url: 'https://github.com/nginx/nginx',
    platform: 'github' as const,
    stars: 22000,
    forks: 6800,
    language: 'C',
    license: 'BSD-2-Clause',
    lastUpdated: new Date().toISOString(),
    downloadedCount: 12000000,
    avatarUrl: 'https://avatars.githubusercontent.com/u/3194564?v=4',
    owner: 'nginx',
    defaultBranch: 'stable-1.24',
    topics: ['nginx', 'web-server', 'proxy', 'http'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '106',
    name: 'unreal-engine',
    description: 'Unreal Engine source code',
    url: 'https://github.com/EpicGames/UnrealEngine',
    platform: 'github' as const,
    stars: 32000,
    forks: 8900,
    language: 'C++',
    license: 'Proprietary',
    lastUpdated: new Date().toISOString(),
    downloadedCount: 2100000,
    avatarUrl: 'https://avatars.githubusercontent.com/u/140593135?v=4',
    owner: 'EpicGames',
    defaultBranch: 'main',
    topics: ['unreal', 'game-engine', '3d', 'c-plus-plus'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '107',
    name: 'libreoffice',
    description: 'LibreOffice is a free and open-source office suite.',
    url: 'https://github.com/LibreOffice/core',
    platform: 'github' as const,
    stars: 12000,
    forks: 3200,
    language: 'C++',
    license: 'MPL-2.0',
    lastUpdated: new Date().toISOString(),
    downloadedCount: 18000000,
    avatarUrl: 'https://avatars.githubusercontent.com/u/8551804?v=4',
    owner: 'LibreOffice',
    defaultBranch: 'main',
    topics: ['libreoffice', 'office', 'productivity', 'open-source'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '108',
    name: 'gimp',
    description: 'GIMP is a cross-platform image editor',
    url: 'https://github.com/GNOME/gimp',
    platform: 'github' as const,
    stars: 11000,
    forks: 2800,
    language: 'C',
    license: 'GPL-3.0',
    lastUpdated: new Date().toISOString(),
    downloadedCount: 15000000,
    avatarUrl: 'https://avatars.githubusercontent.com/u/29591430?v=4',
    owner: 'GNOME',
    defaultBranch: 'master',
    topics: ['gimp', 'image-editor', 'graphics', 'photo-editing'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '109',
    name: 'inkscape',
    description: 'Inkscape Vector Graphics Editor',
    url: 'https://github.com/inkscape/inkscape',
    platform: 'github' as const,
    stars: 5500,
    forks: 1200,
    language: 'C++',
    license: 'GPL-2.0',
    lastUpdated: new Date().toISOString(),
    downloadedCount: 8900000,
    avatarUrl: 'https://avatars.githubusercontent.com/u/1610822?v=4',
    owner: 'inkscape',
    defaultBranch: 'master',
    topics: ['inkscape', 'vector-graphics', 'svg', 'editor'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '110',
    name: 'obs-studio',
    description: 'OBS Studio - Free and open source software for live streaming and screen recording',
    url: 'https://github.com/obsproject/obs-studio',
    platform: 'github' as const,
    stars: 58000,
    forks: 7500,
    language: 'C',
    license: 'GPL-2.0',
    lastUpdated: new Date().toISOString(),
    downloadedCount: 4500000,
    avatarUrl: 'https://avatars.githubusercontent.com/u/7145964?v=4',
    owner: 'obsproject',
    defaultBranch: 'master',
    topics: ['obs', 'streaming', 'recording', 'live', 'screen-recorder'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '111',
    name: 'arduino',
    description: 'Arduino IDE',
    url: 'https://github.com/arduino/Arduino',
    platform: 'github' as const,
    stars: 13000,
    forks: 8200,
    language: 'Java',
    license: 'GPL-2.0',
    lastUpdated: new Date().toISOString(),
    downloadedCount: 25000000,
    avatarUrl: 'https://avatars.githubusercontent.com/u/833833?v=4',
    owner: 'arduino',
    defaultBranch: 'main',
    topics: ['arduino', 'microcontroller', 'iot', 'embedded'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '112',
    name: 'rclone',
    description: 'rsync for cloud storage',
    url: 'https://github.com/rclone/rclone',
    platform: 'github' as const,
    stars: 33000,
    forks: 3200,
    language: 'Go',
    license: 'MIT',
    lastUpdated: new Date().toISOString(),
    downloadedCount: 1200000,
    avatarUrl: 'https://avatars.githubusercontent.com/u/5611915?v=4',
    owner: 'rclone',
    defaultBranch: 'master',
    topics: ['rclone', 'cloud-storage', 'backup', 'sync'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Simple in-memory cache with TTL
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<unknown>>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data;
  }
  cache.delete(key);
  return null;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

import { NextRequest, NextResponse } from 'next/server';
import { githubApi, GitHubRepository } from '@/lib/github';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';
  const sort = searchParams.get('sort') as 'stars' | 'forks' | 'updated' | null;
  const order = searchParams.get('order') as 'asc' | 'desc' | null;
  const page = parseInt(searchParams.get('page') || '1');
  const perPage = Math.min(parseInt(searchParams.get('per_page') || '20'), 100);
  const language = searchParams.get('language');

  // Check cache
  const cacheKey = `search:${query}:${sort}:${order}:${page}:${perPage}:${language}`;
  const cached = getCached<{ projects: unknown[]; total: number; page: number; perPage: number; totalPages: number }>(cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }

  try {
    // Build the search query - GitHub requires a non-empty query
    // For empty queries, directly use fallback data
    if (!query.trim()) {
      throw new Error('Empty query - using fallback');
    }

    let searchQuery = query.trim();
    if (language && language !== 'all') {
      searchQuery += ` language:${language}`;
    }

    const result = await githubApi.searchRepositories(searchQuery, {
      sort: sort || 'stars',
      order: order || 'desc',
      page,
      perPage,
    });

    // Transform to our format
    const projects = result.items.map((repo: GitHubRepository) => ({
      id: String(repo.id),
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      platform: 'github' as const,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      license: repo.license?.name || null,
      lastUpdated: repo.updated_at,
      downloadedCount: 0,
      avatarUrl: repo.owner.avatar_url,
      owner: repo.owner.login,
      defaultBranch: repo.default_branch,
      topics: repo.topics || [],
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
    }));

    const response = {
      projects,
      total: result.total_count,
      page,
      perPage,
      totalPages: Math.ceil(result.total_count / perPage),
    };

    // Cache the response
    setCache(cacheKey, response);

    // Try to save to persistent cache (fire and forget)
    try {
      fetch(`${request.nextUrl.origin}/api/cache`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projects }),
      }).catch(() => {}); // Ignore errors
    } catch {}

    return NextResponse.json(response);
  } catch (error) {
    console.error('GitHub API error, trying cache:', error);
    
    // Try to get from persistent cache
    try {
      const cacheRes = await fetch(
        `${request.nextUrl.origin}/api/cache?sort=stars&limit=${perPage}`
      );
      if (cacheRes.ok) {
        const cacheData = await cacheRes.json();
        if (cacheData.projects && cacheData.projects.length > 0) {
          return NextResponse.json({
            projects: cacheData.projects,
            total: cacheData.projects.length,
            page,
            perPage,
            totalPages: 1,
            fromCache: true,
          });
        }
      }
    } catch {}

    // Return fallback data when API fails
    const filteredProjects = query
      ? FALLBACK_SEARCH_PROJECTS.filter(p =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.topics.some(t => t.toLowerCase().includes(query.toLowerCase()))
        )
      : FALLBACK_SEARCH_PROJECTS;
    
    const start = (page - 1) * perPage;
    const paginatedProjects = filteredProjects.slice(start, start + perPage);
    
    const response = {
      projects: paginatedProjects,
      total: filteredProjects.length,
      page,
      perPage,
      totalPages: Math.ceil(filteredProjects.length / perPage),
      fallback: true,
    };

    // Cache the fallback response too
    setCache(cacheKey, response);

    return NextResponse.json(response);
  }
}
