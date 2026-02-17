// Featured Projects - In-memory store (replace with DB later)
import { GitHubRepository } from './github';

export interface FeaturedProject {
  id: string;
  name: string;
  owner: string;
  repo: string;
  description: string | null;
  avatarUrl: string | null;
  imageUrl: string | null;
  website: string | null;
  priority: number;
  isActive: boolean;
  isCorporate: boolean;
  clickCount: number;
  impressionCount: number;
  createdAt: string;
}

// Default featured projects - indie/small projects with 100-1000 stars
const DEFAULT_FEATURED: FeaturedProject[] = [
  {
    id: 'fp1',
    name: 'CopilotForXcode',
    owner: 'intitni',
    repo: 'copilotforxcode',
    description: 'The missing GitHub Copilot and Claude Code assistant for Xcode.',
    avatarUrl: 'https://avatars.githubusercontent.com/u/23043173?v=4',
    imageUrl: null,
    website: 'https://intii.net/copilot-for-xcode',
    priority: 1,
    isActive: true,
    isCorporate: false,
    clickCount: 0,
    impressionCount: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'fp2',
    name: 'Penpot',
    owner: 'penpot',
    repo: 'penpot',
    description: 'Penpot is the first Open Source design and prototyping platform.',
    avatarUrl: 'https://avatars.githubusercontent.com/u/42042539?v=4',
    imageUrl: null,
    website: 'https://penpot.app',
    priority: 2,
    isActive: true,
    isCorporate: false,
    clickCount: 0,
    impressionCount: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'fp3',
    name: 'Hocuspocus',
    owner: 'getoutline',
    repo: 'hocuspocus',
    description: 'A collaborative editing framework built with ProseMirror and Yjs.',
    avatarUrl: 'https://avatars.githubusercontent.com/u/34115566?v=4',
    imageUrl: null,
    website: 'https://tiptap.dev/hocuspocus',
    priority: 3,
    isActive: true,
    isCorporate: false,
    clickCount: 0,
    impressionCount: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'fp4',
    name: 'Eraser',
    owner: 'eraserhq',
    repo: 'headless',
    description: 'Build internal tools, dramatically faster.',
    avatarUrl: 'https://avatars.githubusercontent.com/u/66894463?v=4',
    imageUrl: null,
    website: 'https://eraser.io',
    priority: 4,
    isActive: true,
    isCorporate: false,
    clickCount: 0,
    impressionCount: 0,
    createdAt: new Date().toISOString(),
  },
];

// In-memory store (would be DB in production)
let featuredProjects: FeaturedProject[] = [...DEFAULT_FEATURED];

export async function getFeaturedProjects(limit: number = 4): Promise<FeaturedProject[]> {
  // Prioritize non-corporate, then by priority
  const active = featuredProjects
    .filter(p => p.isActive)
    .sort((a, b) => {
      // Non-corporate first
      if (a.isCorporate !== b.isCorporate) {
        return a.isCorporate ? 1 : -1;
      }
      return a.priority - b.priority;
    });
  
  return active.slice(0, limit);
}

export async function getFeaturedProjectById(id: string): Promise<FeaturedProject | null> {
  return featuredProjects.find(p => p.id === id) || null;
}

export async function trackClick(id: string): Promise<FeaturedProject | null> {
  const project = featuredProjects.find(p => p.id === id);
  if (project) {
    project.clickCount += 1;
    return project;
  }
  return null;
}

export async function trackImpression(id: string): Promise<FeaturedProject | null> {
  const project = featuredProjects.find(p => p.id === id);
  if (project) {
    project.impressionCount += 1;
    return project;
  }
  return null;
}

export async function addFeaturedProject(project: Omit<FeaturedProject, 'id' | 'clickCount' | 'impressionCount' | 'createdAt'>): Promise<FeaturedProject> {
  const newProject: FeaturedProject = {
    ...project,
    id: `fp${Date.now()}`,
    clickCount: 0,
    impressionCount: 0,
    createdAt: new Date().toISOString(),
  };
  featuredProjects.push(newProject);
  return newProject;
}

export async function updateFeaturedProject(id: string, updates: Partial<FeaturedProject>): Promise<FeaturedProject | null> {
  const index = featuredProjects.findIndex(p => p.id === id);
  if (index !== -1) {
    featuredProjects[index] = { ...featuredProjects[index], ...updates };
    return featuredProjects[index];
  }
  return null;
}

export async function deleteFeaturedProject(id: string): Promise<boolean> {
  const index = featuredProjects.findIndex(p => p.id === id);
  if (index !== -1) {
    featuredProjects.splice(index, 1);
    return true;
  }
  return false;
}

export async function getTotalClicks(): Promise<number> {
  return featuredProjects.reduce((sum, p) => sum + p.clickCount, 0);
}
