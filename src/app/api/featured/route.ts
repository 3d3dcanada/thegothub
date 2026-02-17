import { NextRequest, NextResponse } from 'next/server';

// In-memory cache for featured projects (rotates daily)
let cachedProjects: any[] = [];
let lastFetchDate: string = '';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Indie-friendly topics to search for
const INDIE_TOPICS = [
  'open-source',
  'awesome',
  'devtools',
  'cli',
  'productivity',
  'developer-tools',
  'indie',
  'maker',
  'self-hosted',
  'raspberry-pi',
  'home-automation',
  'hackathon',
  'community',
  'tools',
  'software',
  'library',
  'framework'
];

function getRandomElements<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function fetchIndieProjectsFromGitHub(limit: number): Promise<any[]> {
  if (!GITHUB_TOKEN) {
    console.error('Missing GITHUB_TOKEN');
    return [];
  }

  const today = new Date().toISOString().split('T')[0];
  
  // Return cached projects if same day
  if (cachedProjects.length > 0 && lastFetchDate === today) {
    return cachedProjects.slice(0, limit);
  }

  try {
    // Search for repos with indie topics, sorted by recently updated
    // We want projects with <1000 stars that are active
    const queries = [
      'topic:open-source stars:<1000',
      'topic:devtools stars:<1000',
      'topic:cli stars:<1000',
      'topic:developer-tools stars:<1000',
      'topic:self-hosted stars:<1000',
      'topic:productivity stars:<1000',
    ];

    const allProjects: any[] = [];
    
    for (const query of queries) {
      const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=30`;
      
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
        // Filter out corporate projects and very large repos
        const indieItems = data.items
          .filter((repo: any) => {
            const isCorporate = [
              'microsoft', 'google', 'amazon', 'facebook', 'meta',
              'github', 'gitlab', 'jetbrains', 'redhat', 'ibm',
              'oracle', 'adobe', 'aws', 'azure', 'docker'
            ].some(corp => repo.full_name.toLowerCase().includes(corp));
            
            // Skip if has too many stars (someone might have paid for promotion)
            if (repo.stargazers_count >= 1000) return false;
            
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
            updatedAt: repo.updated_at,
          }));

        allProjects.push(...indieItems);
      }
    }

    // Remove duplicates based on repo name
    const uniqueProjects = allProjects.filter((project, index, self) =>
      index === self.findIndex((p) => p.name === project.name)
    );

    // Shuffle and take random selection
    const shuffled = getRandomElements(uniqueProjects, Math.min(limit * 3, uniqueProjects.length));
    cachedProjects = shuffled;
    lastFetchDate = today;

    console.log(`Fetched ${cachedProjects.length} indie projects from GitHub`);
    return cachedProjects.slice(0, limit);
  } catch (error) {
    console.error('Error fetching indie projects from GitHub:', error);
    return cachedProjects.length > 0 ? cachedProjects.slice(0, limit) : [];
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '4');

    // Fetch rotating indie projects from GitHub
    const projects = await fetchIndieProjectsFromGitHub(limit);

    // Return mock click counts for now (in a real app, these would be tracked)
    const projectsWithClicks = projects.map((p, i) => ({
      ...p,
      clickCount: Math.floor(Math.random() * 50), // Simulated clicks for demo
    }));

    const totalClicks = projectsWithClicks.reduce((sum, p) => sum + p.clickCount, 0);

    return NextResponse.json({
      projects: projectsWithClicks,
      totalClicks,
      count: projectsWithClicks.length,
    });
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // POST is disabled since we're now using GitHub API for rotating content
  return NextResponse.json(
    { error: 'POST disabled - using GitHub API for rotating featured projects' },
    { status: 403 }
  );
}
