import { NextRequest, NextResponse } from 'next/server';
import { githubApi, GitHubRepository, GitHubContent, GitHubReadme } from '@/lib/github';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ owner: string; repo: string }> }
) {
  const { owner, repo } = await params;
  const searchParams = request.nextUrl.searchParams;
  const includeContents = searchParams.get('contents') === 'true';
  const includeReadme = searchParams.get('readme') === 'true';
  const includeContributors = searchParams.get('contributors') === 'true';

  try {
    // Get repository details
    const details = await githubApi.getRepository(owner, repo);

    const project = {
      id: String(details.id),
      name: details.name,
      description: details.description,
      url: details.html_url,
      platform: 'github' as const,
      stars: details.stargazers_count,
      forks: details.forks_count,
      language: details.language,
      license: details.license?.name || null,
      lastUpdated: details.updated_at,
      downloadedCount: 0,
      avatarUrl: details.owner.avatar_url,
      owner: details.owner.login,
      defaultBranch: details.default_branch,
      topics: details.topics || [],
      createdAt: details.created_at,
      updatedAt: details.updated_at,
      watchers: details.watchers_count,
      issues: details.open_issues_count,
      size: details.size,
      homepage: details.homepage,
    };

    // Optionally include additional data
    const response: Record<string, unknown> = { project };

    if (includeContents) {
      try {
        const contents = await githubApi.getContents(owner, repo);
        response.contents = contents.map((c: GitHubContent) => ({
          name: c.name,
          path: c.path,
          type: c.type,
          size: c.size,
          url: c.html_url,
        }));
      } catch {
        response.contents = [];
      }
    }

    if (includeReadme) {
      try {
        const readme = await githubApi.getReadme(owner, repo);
        // Decode base64 content
        const content = Buffer.from(readme.content, 'base64').toString('utf-8');
        response.readme = {
          name: readme.name,
          path: readme.path,
          content,
          htmlUrl: readme.html_url,
        };
      } catch {
        response.readme = null;
      }
    }

    if (includeContributors) {
      try {
        const contributors = await githubApi.getContributors(owner, repo);
        response.contributors = contributors;
      } catch {
        response.contributors = [];
      }
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch repository' },
      { status: error instanceof Error && error.message.includes('Not Found') ? 404 : 500 }
    );
  }
}
