import { NextRequest, NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Fallback free-to-use projects (no API needed)
const FALLBACK_PROJECTS = [
  {
    id: '1',
    name: '7-Zip',
    owner: 'ip7z',
    repo: '7zip',
    description: 'File archiver with a high compression ratio',
    avatarUrl: 'https://avatars.githubusercontent.com/u/9171168?v=4',
    stars: 5200,
    forks: 1200,
    website: 'https://www.7-zip.org/',
    language: 'C++',
    defaultBranch: 'master',
    updatedAt: '2024-01-15T00:00:00Z',
    url: 'https://github.com/ip7z/7zip',
    platform: 'github' as const,
    topics: ['freeware', 'compression', 'archiver'],
    license: 'LGPL-2.1',
    lastUpdated: '2024-01-15T00:00:00Z',
    downloadedCount: 0,
    createdAt: '2016-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'VLC',
    owner: 'videolan',
    repo: 'vlc',
    description: 'LibVLC, the core engine of the VLC family',
    avatarUrl: 'https://avatars.githubusercontent.com/u/178106?v=4',
    stars: 15000,
    forks: 3800,
    website: 'https://www.videolan.org/vlc/',
    language: 'C',
    defaultBranch: 'master',
    updatedAt: '2024-01-20T00:00:00Z',
    url: 'https://github.com/videolan/vlc',
    platform: 'github' as const,
    topics: ['video', 'media-player', 'freeware'],
    license: 'GPL-2.0',
    lastUpdated: '2024-01-20T00:00:00Z',
    downloadedCount: 0,
    createdAt: '2009-03-08T00:00:00Z',
  },
  {
    id: '3',
    name: 'GIMP',
    owner: 'GNOME',
    repo: 'gimp',
    description: 'GNU Image Manipulation Program',
    avatarUrl: 'https://avatars.githubusercontent.com/u/1796210?v=4',
    stars: 11000,
    forks: 2100,
    website: 'https://www.gimp.org/',
    language: 'C',
    defaultBranch: 'master',
    updatedAt: '2024-01-18T00:00:00Z',
    url: 'https://github.com/GNOME/gimp',
    platform: 'github' as const,
    topics: ['image-editing', 'graphics', 'free-software'],
    license: 'GPL-3.0',
    lastUpdated: '2024-01-18T00:00:00Z',
    downloadedCount: 0,
    createdAt: '2009-11-02T00:00:00Z',
  },
  {
    id: '4',
    name: 'FileZilla',
    owner: 'filezilla-project',
    repo: 'filezilla',
    description: 'Fast and reliable FTP, FTPS and SFTP client',
    avatarUrl: 'https://avatars.githubusercontent.com/u/178105?v=4',
    stars: 4200,
    forks: 890,
    website: 'https://filezilla-project.org/',
    language: 'C++',
    defaultBranch: 'master',
    updatedAt: '2024-01-10T00:00:00Z',
    url: 'https://github.com/filezilla-project/filezilla',
    platform: 'github' as const,
    topics: ['ftp', 'client', 'freeware'],
    license: 'GPL-2.0',
    lastUpdated: '2024-01-10T00:00:00Z',
    downloadedCount: 0,
    createdAt: '2011-04-20T00:00:00Z',
  },
  {
    id: '5',
    name: 'Audacity',
    owner: 'audacity',
    repo: 'audacity',
    description: 'Audio editor and recording application',
    avatarUrl: 'https://avatars.githubusercontent.com/u/4504792?v=4',
    stars: 9800,
    forks: 1400,
    website: 'https://www.audacityteam.org/',
    language: 'C++',
    defaultBranch: 'audacity-3.0',
    updatedAt: '2024-01-22T00:00:00Z',
    url: 'https://github.com/audacity/audacity',
    platform: 'github' as const,
    topics: ['audio', 'editor', 'free-software'],
    license: 'GPL-2.0',
    lastUpdated: '2024-01-22T00:00:00Z',
    downloadedCount: 0,
    createdAt: '2015-06-28T00:00:00Z',
  },
  {
    id: '6',
    name: 'Blender',
    owner: 'blender',
    repo: 'blender',
    description: 'Official mirror of Blender',
    avatarUrl: 'https://avatars.githubusercontent.com/u/1063356?v=4',
    stars: 18500,
    forks: 4200,
    website: 'https://www.blender.org/',
    language: 'C',
    defaultBranch: 'main',
    updatedAt: '2024-01-25T00:00:00Z',
    url: 'https://github.com/blender/blender',
    platform: 'github' as const,
    topics: ['3d', 'animation', 'free-software'],
    license: 'GPL-2.0',
    lastUpdated: '2024-01-25T00:00:00Z',
    downloadedCount: 0,
    createdAt: '2011-11-07T00:00:00Z',
  },
  {
    id: '7',
    name: 'Inkscape',
    owner: 'inkscape',
    repo: 'inkscape',
    description: 'Vector Graphics Editor',
    avatarUrl: 'https://avatars.githubusercontent.com/u/1611734?v=4',
    stars: 5500,
    forks: 980,
    website: 'https://inkscape.org/',
    language: 'C++',
    defaultBranch: 'master',
    updatedAt: '2024-01-19T00:00:00Z',
    url: 'https://github.com/inkscape/inkscape',
    platform: 'github' as const,
    topics: ['vector-graphics', 'editor', 'free-software'],
    license: 'GPL-2.0',
    lastUpdated: '2024-01-19T00:00:00Z',
    downloadedCount: 0,
    createdAt: '2013-03-04T00:00:00Z',
  },
  {
    id: '8',
    name: 'HandBrake',
    owner: 'handbrake',
    repo: 'handbrake',
    description: "HandBrake's main development repository",
    avatarUrl: 'https://avatars.githubusercontent.com/u/855303?v=4',
    stars: 12500,
    forks: 1800,
    website: 'https://handbrake.fr/',
    language: 'C',
    defaultBranch: 'master',
    updatedAt: '2024-01-21T00:00:00Z',
    url: 'https://github.com/handbrake/handbrake',
    platform: 'github' as const,
    topics: ['video', 'converter', 'free-software'],
    license: 'GPL-2.0',
    lastUpdated: '2024-01-21T00:00:00Z',
    downloadedCount: 0,
    createdAt: '2010-02-12T00:00:00Z',
  },
];

// In-memory cache for free-to-use projects
let cachedProjects: any[] = [];
let lastFetchDate: string = '';

function getRandomElements<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function fetchFreeToUseFromGitHub(limit: number): Promise<any[]> {
  if (!GITHUB_TOKEN) {
    console.error('Missing GITHUB_TOKEN');
    return [];
  }

  // User wants random on every page refresh - always fetch fresh data
  // Only use cache as fallback if API fails
  try {
    // Search for repos with free-software/freeware topics
    const queries = [
      'topic:free-software stars:>100',
      'topic:freeware stars:>100',
      'topic:gratis stars:>100',
    ];

    const allProjects: any[] = [];
    
    for (const query of queries) {
      const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=50`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (!response.ok) {
        console.error('GitHub search error:', response.status, await response.text());
        continue;
      }

      const data = await response.json();
      
      if (data.items && Array.isArray(data.items)) {
        const items = data.items
          .filter((repo: any) => {
            const isCorporate = [
              'microsoft', 'google', 'amazon', 'facebook', 'meta',
              'github', 'gitlab', 'jetbrains', 'redhat', 'ibm',
              'oracle', 'adobe', 'aws', 'azure', 'docker'
            ].some(corp => repo.full_name.toLowerCase().includes(corp));
            
            // Must have at least 100 stars
            if (repo.stargazers_count < 100) return false;
            
            return !isCorporate;
          })
          .map((repo: any) => ({
            id: repo.id.toString(),
            name: repo.name,
            owner: repo.owner.login,
            repo: repo.name,
            description: repo.description,
            avatarUrl: repo.owner.avatar_url,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            website: repo.homepage || `https://github.com/${repo.full_name}`,
            language: repo.language,
            defaultBranch: repo.default_branch,
            updatedAt: repo.updated_at,
            url: repo.html_url,
            platform: 'github' as const,
            topics: repo.topics || [],
            license: repo.license?.name || null,
            lastUpdated: repo.updated_at,
            downloadedCount: 0,
            createdAt: repo.created_at,
          }));

        allProjects.push(...items);
      }
    }

    // Remove duplicates based on repo name
    const uniqueProjects = allProjects.filter((project, index, self) =>
      index === self.findIndex((p) => p.name === project.name)
    );

    // Update cache
    cachedProjects = uniqueProjects;
    lastFetchDate = new Date().toISOString().split('T')[0];

    console.log(`Fetched ${cachedProjects.length} free-to-use projects from GitHub`);
    
    // Return random selection
    return getRandomElements(cachedProjects, Math.min(limit, cachedProjects.length));
  } catch (error) {
    console.error('Error fetching free-to-use projects from GitHub:', error);
    // Fallback to cache if available
    if (cachedProjects.length > 0) {
      return getRandomElements(cachedProjects, limit);
    }
    return [];
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '8');

    // Try to fetch from GitHub API if token is available
    if (GITHUB_TOKEN) {
      const projects = await fetchFreeToUseFromGitHub(limit);
      if (projects.length > 0) {
        return NextResponse.json({
          projects,
          count: projects.length,
        });
      }
    }

    // Fallback to hardcoded projects if no token or API failed
    const fallbackProjects = getRandomElements(FALLBACK_PROJECTS, Math.min(limit, FALLBACK_PROJECTS.length));
    
    return NextResponse.json({
      projects: fallbackProjects,
      count: fallbackProjects.length,
      source: 'fallback',
    });
  } catch (error) {
    console.error('Error fetching free-to-use projects:', error);
    // Always return fallback on error
    const fallbackProjects = getRandomElements(FALLBACK_PROJECTS, 8);
    return NextResponse.json({
      projects: fallbackProjects,
      count: fallbackProjects.length,
      source: 'fallback',
    });
  }
}
