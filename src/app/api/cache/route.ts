// In-memory cache for when database is unavailable
import { NextRequest, NextResponse } from 'next/server';

const memoryCache: Map<string, any> = new Map();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projects } = body;

    if (!Array.isArray(projects) || projects.length === 0) {
      return NextResponse.json({ error: 'No projects provided' }, { status: 400 });
    }

    // Store in memory cache (keyed by platform+owner+name)
    projects.forEach((project: any) => {
      const key = `${project.platform || 'github'}:${project.owner}:${project.name}`;
      const existing = memoryCache.get(key);
      memoryCache.set(key, {
        ...project,
        cachedAt: new Date().toISOString(),
        viewCount: (existing?.viewCount || 0) + 1,
      });
    });

    // Also try database if available
    try {
      const { prisma } = await import('@/lib/prisma');
      await Promise.all(
        projects.map(async (project: any) => {
          const data = {
            name: project.name,
            owner: project.owner,
            description: project.description || null,
            url: project.url,
            platform: project.platform || 'github',
            stars: project.stars || 0,
            forks: project.forks || 0,
            language: project.language || null,
            license: project.license || null,
            avatarUrl: project.avatarUrl || null,
            topics: Array.isArray(project.topics) ? JSON.stringify(project.topics) : '[]',
            lastUpdated: new Date(),
            cachedAt: new Date(),
          };

          return prisma.cachedProject.upsert({
            where: {
              platform_owner_name: {
                platform: data.platform,
                owner: data.owner,
                name: data.name,
              },
            },
            update: { ...data, viewCount: { increment: 1 } },
            create: { ...data, viewCount: 1 },
          }).catch(() => {});
        })
      );
    } catch {}

    return NextResponse.json({
      success: true,
      cached: projects.length,
      cacheSize: memoryCache.size,
    });
  } catch (error) {
    console.error('Cache save error:', error);
    return NextResponse.json({ error: 'Failed to save to cache' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '12');

    // Try memory cache first
    let projects = Array.from(memoryCache.values());
    
    // Sort by stars descending
    projects.sort((a, b) => (b.stars || 0) - (a.stars || 0));
    projects = projects.slice(0, limit);

    if (projects.length > 0) {
      return NextResponse.json({
        projects,
        fromMemory: true,
      });
    }

    // Try database cache if available
    try {
      const { prisma } = await import('@/lib/prisma');
      const dbProjects = await prisma.cachedProject.findMany({
        orderBy: { stars: 'desc' },
        take: limit,
      });

      if (dbProjects.length > 0) {
        const formatted = dbProjects.map(p => ({
          id: p.id,
          name: p.name,
          owner: p.owner,
          description: p.description,
          url: p.url,
          platform: p.platform,
          stars: p.stars,
          forks: p.forks,
          language: p.language,
          license: p.license,
          avatarUrl: p.avatarUrl,
          topics: JSON.parse(p.topics || '[]'),
          lastUpdated: p.lastUpdated,
        }));
        
        // Populate memory cache
        formatted.forEach(p => {
          const key = `${p.platform}:${p.owner}:${p.name}`;
          memoryCache.set(key, p);
        });

        return NextResponse.json({
          projects: formatted,
          fromDatabase: true,
        });
      }
    } catch {}

    return NextResponse.json({ projects: [] });
  } catch (error) {
    console.error('Cache fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch from cache' }, { status: 500 });
  }
}
