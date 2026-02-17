import { NextResponse } from 'next/server';

// Mock projects data for demonstration
const mockProjects = [
  {
    id: '1',
    name: 'react',
    description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
    url: 'https://github.com/facebook/react',
    platform: 'github',
    stars: 219000,
    forks: 46000,
    language: 'JavaScript',
    license: 'MIT',
    lastUpdated: new Date().toISOString(),
    downloadedCount: 1500000,
    avatarUrl: 'https://avatars.githubusercontent.com/u/69631?v=4',
    owner: 'facebook',
    defaultBranch: 'main',
    topics: ['react', 'javascript', 'frontend', 'ui'],
  },
  {
    id: '2',
    name: 'next.js',
    description: 'The React Framework for the Web',
    url: 'https://github.com/vercel/next.js',
    platform: 'github',
    stars: 115000,
    forks: 25000,
    language: 'TypeScript',
    license: 'MIT',
    lastUpdated: new Date().toISOString(),
    downloadedCount: 890000,
    avatarUrl: 'https://avatars.githubusercontent.com/u/14985020?v=4',
    owner: 'vercel',
    defaultBranch: 'canary',
    topics: ['nextjs', 'react', 'ssr', 'framework'],
  },
  {
    id: '3',
    name: 'typescript',
    description: 'TypeScript is a superset of JavaScript that compiles to clean JavaScript output.',
    url: 'https://github.com/microsoft/typescript',
    platform: 'github',
    stars: 95000,
    forks: 12400,
    language: 'TypeScript',
    license: 'Apache-2.0',
    lastUpdated: new Date().toISOString(),
    downloadedCount: 750000,
    avatarUrl: 'https://avatars.githubusercontent.com/u/6154722?v=4',
    owner: 'microsoft',
    defaultBranch: 'main',
    topics: ['typescript', 'language', 'javascript'],
  },
  {
    id: '4',
    name: 'tailwindcss',
    description: 'A utility-first CSS framework for rapid UI development.',
    url: 'https://github.com/tailwindlabs/tailwindcss',
    platform: 'github',
    stars: 76000,
    forks: 3900,
    language: 'CSS',
    license: 'MIT',
    lastUpdated: new Date().toISOString(),
    downloadedCount: 620000,
    avatarUrl: 'https://avatars.githubusercontent.com/u/42157845?v=4',
    owner: 'tailwindlabs',
    defaultBranch: 'main',
    topics: ['tailwindcss', 'css', 'framework', 'utility-first'],
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const platform = searchParams.get('platform');
  const language = searchParams.get('language');
  const sort = searchParams.get('sort') || 'stars';
  const order = searchParams.get('order') || 'desc';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  let filteredProjects = [...mockProjects];

  // Filter by query
  if (query) {
    const q = query.toLowerCase();
    filteredProjects = filteredProjects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.owner.toLowerCase().includes(q) ||
        p.topics?.some((t) => t.toLowerCase().includes(q))
    );
  }

  // Filter by platform
  if (platform) {
    filteredProjects = filteredProjects.filter((p) => p.platform === platform);
  }

  // Filter by language
  if (language) {
    filteredProjects = filteredProjects.filter((p) => p.language === language);
  }

  // Sort
  filteredProjects.sort((a, b) => {
    const aVal = a[sort as keyof typeof a] as number;
    const bVal = b[sort as keyof typeof b] as number;
    return order === 'desc' ? bVal - aVal : aVal - bVal;
  });

  // Paginate
  const start = (page - 1) * limit;
  const paginatedProjects = filteredProjects.slice(start, start + limit);

  return NextResponse.json({
    projects: paginatedProjects,
    total: filteredProjects.length,
    page,
    limit,
    totalPages: Math.ceil(filteredProjects.length / limit),
  });
}
