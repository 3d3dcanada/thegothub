import { NextResponse } from 'next/server';

const GITHUB_API_BASE = 'https://api.github.com';

async function fetchGitHub(url: string) {
  const token = process.env.GITHUB_TOKEN;
  
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'THE-GOT-HUB',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(url, { headers });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `GitHub API error: ${response.status}`);
  }
  
  return response.json();
}

export async function GET() {
  try {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    // Get total public repos count
    const totalReposResponse = await fetchGitHub(
      `${GITHUB_API_BASE}/search/repositories?is:public&q=is:public&per_page=1`
    );
    const totalRepos = totalReposResponse.total_count || 0;

    // Get new repos created today
    const newReposResponse = await fetchGitHub(
      `${GITHUB_API_BASE}/search/repositories?is:public&q=created:>${todayStr}&per_page=1`
    );
    const newReposToday = newReposResponse.total_count || 0;

    // Get repos updated in last week (active)
    const activeReposResponse = await fetchGitHub(
      `${GITHUB_API_BASE}/search/repositories?is:public&q=pushed:>${lastWeek}&per_page=1`
    );
    const activeRepos = activeReposResponse.total_count || 0;

    // Calculate estimates for other platforms based on known ratios
    // GitLab: ~30M repos, Bitbucket: ~28M, HuggingFace: ~1M
    // These are static estimates since we don't have tokens for those
    const gitlabRepos = 30000000;
    const bitbucketRepos = 28000000;
    const huggingfaceRepos = 1000000;
    
    const allPlatformsTotal = totalRepos + gitlabRepos + bitbucketRepos + huggingfaceRepos;

    return NextResponse.json({
      platforms: {
        github: {
          repos: totalRepos,
          active: activeRepos,
        },
        gitlab: {
          repos: gitlabRepos,
          note: 'Estimated based on public data',
        },
        bitbucket: {
          repos: bitbucketRepos,
          note: 'Estimated based on public data',
        },
        huggingface: {
          repos: huggingfaceRepos,
          note: 'Estimated based on public data',
        },
      },
      totals: {
        allRepos: allPlatformsTotal,
        newToday: newReposToday,
        active: activeRepos,
      },
      lastUpdated: new Date().toISOString(),
      source: 'GitHub Search API + platform estimates',
    });
  } catch (error) {
    console.error('GitHub Stats API error:', error);
    
    // Return fallback data on error
    return NextResponse.json({
      platforms: {
        github: { repos: 330000000, active: 4000000 },
        gitlab: { repos: 30000000 },
        bitbucket: { repos: 28000000 },
        huggingface: { repos: 1000000 },
      },
      totals: {
        allRepos: 389000000,
        newToday: null,
        active: 4000000,
      },
      lastUpdated: new Date().toISOString(),
      source: 'Fallback - API error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
