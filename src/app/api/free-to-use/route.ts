import { NextRequest, NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

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

    // Fetch random free-to-use projects from GitHub
    const projects = await fetchFreeToUseFromGitHub(limit);

    return NextResponse.json({
      projects,
      count: projects.length,
    });
  } catch (error) {
    console.error('Error fetching free-to-use projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch free-to-use projects' },
      { status: 500 }
    );
  }
}
