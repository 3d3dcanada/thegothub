'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { SearchAutocomplete } from '@/components/search/search-autocomplete';
import { ProjectCard } from '@/components/project/project-card';
import { ProjectCardSkeleton } from '@/components/project/project-card-skeleton';
import { SplashModal, useOnboarding } from '@/components/onboarding/splash-modal';
import { TrendingUp, Star, Download, ArrowRight, Loader2, AlertCircle, AlertTriangle, Github, Heart, Coffee, Code2, Sparkles, Wrench, Target, Rocket, Lightbulb, Users, Zap, Flame, Activity, Gauge, BarChart2, Trophy, Crown, Medal, Award, Hexagon, Gift, CheckCircle, Package, Unlock, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTrendingProjects, useProjects, useStats, useFeaturedProjects, trackFeaturedClick, useFreeToUseProjects } from '@/hooks/useProjects';
import { cn } from '@/lib/utils';
import { CommunityBanner } from '@/components/ui/section-banners';

const PLATFORMS = [
  { name: 'All', value: 'all', icon: '🌐', count: '389M+' },
  { name: 'GitHub', value: 'github', icon: '🐙', count: '330M+' },
  { name: 'GitLab', value: 'gitlab', icon: '🦊', count: '30M+' },
  { name: 'Bitbucket', value: 'bitbucket', icon: '🪣', count: '28M+' },
  { name: 'Hugging Face', value: 'huggingface', icon: '🤗', count: '1M+' },
];

const LANGUAGES = [
  { name: 'All', value: 'all' },
  { name: 'JavaScript', value: 'javascript', color: '#F7DF1E' },
  { name: 'TypeScript', value: 'typescript', color: '#3178C6' },
  { name: 'Python', value: 'python', color: '#3776AB' },
  { name: 'Go', value: 'go', color: '#00ADD8' },
  { name: 'Rust', value: 'rust', color: '#DEA584' },
  { name: 'Java', value: 'java', color: '#B07219' },
  { name: 'C++', value: 'cpp', color: '#F34B7D' },
  { name: 'Ruby', value: 'ruby', color: '#CC342D' },
  { name: 'PHP', value: 'php', color: '#777BB4' },
  { name: 'Swift', value: 'swift', color: '#FA7343' },
  { name: 'C#', value: 'csharp', color: '#239120' },
  { name: 'Kotlin', value: 'kotlin', color: '#A97BFF' },
  { name: 'Dart', value: 'dart', color: '#00B4AB' },
  { name: 'Scala', value: 'scala', color: '#DC322F' },
  { name: 'Shell', value: 'shell', color: '#89E051' },
];

// Category icons and colors for additional filtering
const CATEGORIES = [
  { name: 'Game Engines', value: 'game-engine', icon: '🎮' },
  { name: 'Machine Learning', value: 'machine-learning', icon: '🤖' },
  { name: 'Data Science', value: 'data-science', icon: '📊' },
  { name: 'DevOps', value: 'devops', icon: '🔧' },
  { name: 'Security', value: 'security', icon: '🔒' },
  { name: 'Blockchain', value: 'blockchain', icon: '⛓️' },
  { name: 'Creative Tools', value: 'creative', icon: '🎨' },
  { name: 'Video & Audio', value: 'multimedia', icon: '🎬' },
  { name: 'Networking', value: 'networking', icon: '🌐' },
  { name: 'Embedded', value: 'embedded', icon: '📟' },
];

// Sponsored / Promote your project section
const SPONSORED_SPOTS = [
  {
    id: 'sp1',
    name: 'Promote Your Project',
    description: 'Get your open source project featured in front of thousands of developers.',
    owner: 'THE GOT HUB',
    stars: 0,
    forks: 0,
    platform: 'sponsored' as const,
    avatarUrl: null,
    url: '#sponsor',
    language: null,
    topics: ['sponsor', 'advertise', 'promote'],
    defaultBranch: 'main',
    lastUpdated: new Date().toISOString(),
    downloadedCount: 0,
    license: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPromo: true,
    promoText: 'Get Featured',
  },
  {
    id: 'sp2',
    name: 'Host with Us',
    description: 'Interested in hosting or sponsoring? Learn about partnership opportunities.',
    owner: 'THE GOT HUB',
    stars: 0,
    forks: 0,
    platform: 'sponsored' as const,
    avatarUrl: null,
    url: '#partner',
    language: null,
    topics: ['hosting', 'partner', 'sponsorship'],
    defaultBranch: 'main',
    lastUpdated: new Date().toISOString(),
    downloadedCount: 0,
    license: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPromo: true,
    promoText: 'Become a Partner',
  },
  {
    id: 'sp3',
    name: 'API Access',
    description: 'Need programmatic access to our project data? Check out our API.',
    owner: 'THE GOT HUB',
    stars: 0,
    forks: 0,
    platform: 'sponsored' as const,
    avatarUrl: null,
    url: '/api',
    language: null,
    topics: ['api', 'developers', 'integration'],
    defaultBranch: 'main',
    lastUpdated: new Date().toISOString(),
    downloadedCount: 0,
    license: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPromo: true,
    promoText: 'View API Docs',
  },
];

const SPONSORED_PROJECTS = [
  {
    id: 's1',
    name: 'react',
    description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
    owner: 'facebook',
    stars: 219000,
    forks: 46000,
    platform: 'github' as const,
    avatarUrl: 'https://avatars.githubusercontent.com/u/69631?v=4',
    url: 'https://github.com/facebook/react',
    language: 'JavaScript',
    topics: ['react', 'javascript', 'frontend', 'ui'],
    defaultBranch: 'main',
    lastUpdated: new Date().toISOString(),
    downloadedCount: 1500000,
    license: 'MIT',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 's2',
    name: 'next.js',
    description: 'The React Framework for the Web',
    owner: 'vercel',
    stars: 115000,
    forks: 25000,
    platform: 'github' as const,
    avatarUrl: 'https://avatars.githubusercontent.com/u/14985020?v=4',
    url: 'https://github.com/vercel/next.js',
    language: 'TypeScript',
    topics: ['nextjs', 'react', 'ssr', 'framework'],
    defaultBranch: 'canary',
    lastUpdated: new Date().toISOString(),
    downloadedCount: 890000,
    license: 'MIT',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 's3',
    name: 'typescript',
    description: 'TypeScript is a superset of JavaScript that compiles to clean JavaScript output.',
    owner: 'microsoft',
    stars: 95000,
    forks: 12400,
    platform: 'github' as const,
    avatarUrl: 'https://avatars.githubusercontent.com/u/6154722?v=4',
    url: 'https://github.com/microsoft/typescript',
    language: 'TypeScript',
    topics: ['typescript', 'language', 'javascript'],
    defaultBranch: 'main',
    lastUpdated: new Date().toISOString(),
    downloadedCount: 750000,
    license: 'Apache-2.0',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 's4',
    name: 'tailwindcss',
    description: 'A utility-first CSS framework for rapid UI development.',
    owner: 'tailwindlabs',
    stars: 76000,
    forks: 3900,
    platform: 'github' as const,
    avatarUrl: 'https://avatars.githubusercontent.com/u/42157845?v=4',
    url: 'https://github.com/tailwindlabs/tailwindcss',
    language: 'CSS',
    topics: ['tailwindcss', 'css', 'framework', 'utility-first'],
    defaultBranch: 'main',
    lastUpdated: new Date().toISOString(),
    downloadedCount: 620000,
    license: 'MIT',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function HomeContent() {
  const router = useRouter();
  const { showOnboarding, closeOnboarding } = useOnboarding();
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [trendingDateRange, setTrendingDateRange] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [trendingExpanded, setTrendingExpanded] = useState(false);

  // Auto-cycle through trending date ranges every 30 seconds
  useEffect(() => {
    const ranges: ('daily' | 'weekly' | 'monthly')[] = ['daily', 'weekly', 'monthly'];
    const interval = setInterval(() => {
      setTrendingDateRange(current => {
        const currentIndex = ranges.indexOf(current);
        const nextIndex = (currentIndex + 1) % ranges.length;
        return ranges[nextIndex];
      });
    }, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Fetch trending projects with current date range and expanded state
  const { projects: trendingProjects, isLoading: trendingLoading, error: trendingError } = useTrendingProjects({
    dateRange: trendingDateRange,
    limit: trendingExpanded ? 20 : 8,
  });

  // Fetch projects for Top Projects section
  const { projects: projects, isLoading: projectsLoading, error: projectsError } = useProjects({
    language: selectedLanguage === 'all' ? undefined : selectedLanguage,
    sort: 'stars',
    order: 'desc',
    perPage: 12,
  });

  // Fetch live stats
  const { stats, isLoading: statsLoading } = useStats();

  // Fetch featured projects
  const { featuredProjects, totalClicks, isLoading: featuredLoading, refetch: refetchFeatured } = useFeaturedProjects(4);

  // Auto-refresh featured projects every 30 seconds for rotation
  useEffect(() => {
    const interval = setInterval(() => {
      refetchFeatured();
    }, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, [refetchFeatured]);

  // Fetch free-to-use projects (random on each refresh)
  const { projects: freeToUseProjects, isLoading: freeToUseLoading } = useFreeToUseProjects(8);

  // Format large numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B+';
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M+';
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K+';
    return num.toString();
  };

  const handleLanguageFilter = (lang: string) => {
    setSelectedLanguage(lang);
  };

  return (
    <div className="min-h-screen bg-background">
      <SplashModal isOpen={showOnboarding} onClose={closeOnboarding} />

      {/* Hero Section */}
      <section className="relative bg-linear-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Discover <span className="text-primary">Open Source</span>
              <br className="hidden sm:block" /> Projects
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
              Search millions of open source projects from GitHub, GitLab, SourceForge, Hugging Face, and more.
              Find, explore, and connect with developers worldwide.
            </p>

            {/* Search */}
            <div className="mx-auto max-w-2xl mb-8 relative z-50">
              <SearchAutocomplete />
            </div>

            {/* Popular Tags */}
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              <span className="text-muted-foreground">Trending:</span>
              {['react', 'vue', 'ai', 'machine learning', 'docker', 'kubernetes'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => router.push(`/search?q=${tag}`)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        </div>
      </section>

      {/* Stats - Real data from GitHub API */}
      <section className="border-y bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-2xl font-bold text-foreground">
                <Star className="h-5 w-5 text-primary" />
                {statsLoading ? (
                  <span className="h-6 w-20 animate-pulse bg-muted rounded" />
                ) : stats?.totals?.allRepos ? (
                  formatNumber(stats.totals.allRepos)
                ) : (
                  '357M+'
                )}
              </div>
              <div className="text-sm text-muted-foreground">Total Repos</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-2xl font-bold text-foreground">
                <TrendingUp className="h-5 w-5 text-primary" />
                {statsLoading ? (
                  <span className="h-6 w-20 animate-pulse bg-muted rounded" />
                ) : stats?.totals?.active ? (
                  formatNumber(stats.totals.active)
                ) : (
                  '3.3M+'
                )}
              </div>
              <div className="text-sm text-muted-foreground">Active Repos</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-2xl font-bold text-foreground">
                <Download className="h-5 w-5 text-primary" />
                {statsLoading ? (
                  <span className="h-6 w-20 animate-pulse bg-muted rounded" />
                ) : stats?.platforms?.github?.repos ? (
                  formatNumber(stats.platforms.github.repos)
                ) : (
                  '298M+'
                )}
              </div>
              <div className="text-sm text-muted-foreground">GitHub Repos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {statsLoading ? (
                  <span className="h-6 w-12 inline-block animate-pulse bg-muted rounded" />
                ) : (
                  '5+'
                )}
              </div>
              <div className="text-sm text-muted-foreground">Platforms</div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Tabs */}
      <section className="container mx-auto px-4 pt-8 pb-2">
        <div className="flex gap-2 justify-center overflow-x-auto pb-2">
          {PLATFORMS.map((platform) => (
            <Button
              key={platform.value}
              variant={selectedPlatform === platform.value ? 'default' : 'outline'}
              onClick={() => setSelectedPlatform(platform.value)}
              className="gap-2 whitespace-nowrap"
            >
              <span>{platform.icon}</span>
              {platform.name}
              <span className="text-xs opacity-70">({platform.count})</span>
            </Button>
          ))}
        </div>
      </section>

      {/* Categories - condensed single row */}
      <section id="categories" className="container mx-auto px-4 pb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((category) => (
            <Button
              key={category.value}
              variant="outline"
              size="sm"
              onClick={() => router.push(`/search?q=${category.value}`)}
              className="gap-1.5 h-8 text-xs"
            >
              <span>{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>
      </section>

      {/* Community Projects Section */}
      {/* Featured Section - Community Projects with integrated banner */}
      <section className="container mx-auto px-4 pb-8">
        <div className="relative rounded-3xl border-2 border-amber-300 dark:border-amber-700 bg-gradient-to-br from-amber-50/80 to-orange-50/80 dark:from-amber-950/40 dark:to-orange-950/40 overflow-hidden px-6 pb-6">
          {/* Floating icons */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[
              { icon: Heart, color: 'text-rose-400' },
              { icon: Coffee, color: 'text-amber-400' },
              { icon: Code2, color: 'text-blue-400' },
              { icon: Sparkles, color: 'text-yellow-400' },
              { icon: Wrench, color: 'text-gray-400' },
              { icon: Target, color: 'text-red-400' },
              { icon: Rocket, color: 'text-orange-400' },
              { icon: Lightbulb, color: 'text-yellow-300' },
              { icon: Users, color: 'text-green-400' },
              { icon: Star, color: 'text-purple-400' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className={`absolute ${item.color}`}
                style={{
                  left: `${5 + i * 10}%`,
                  top: `${15 + (i % 3) * 28}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, i % 2 === 0 ? 10 : -10, 0],
                  scale: [1, 1.1, 1],
                  opacity: [0.15, 0.35, 0.15],
                }}
                transition={{
                  duration: 2.5 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
              >
                <item.icon className="w-8 h-8" strokeWidth={1.5} />
              </motion.div>
            ))}
          </div>
          
          <div className="relative z-10 py-6">
            {/* Brutalist header */}
            <h2 className="text-4xl font-black text-white mb-4 text-center tracking-wider uppercase"
                style={{
                  textShadow: '3px 3px 0 rgba(0,0,0,0.3), -1px -1px 0 rgba(255,255,255,0.1)',
                  WebkitTextStroke: '1px rgba(255,255,255,0.3)'
                }}>
              ▸ Community Projects ◂
            </h2>
            
            {/* Main value prop - brutalist box */}
            <div className="flex flex-wrap justify-center gap-2 mb-3">
              <span className="px-4 py-1.5 bg-black/50 text-white text-base font-bold border-2 border-white/70 shadow-[4px_4px_0_rgba(255,255,255,0.3)]">
                🚀 Get your project Noticed by thousands daily
              </span>
            </div>
            
            {/* Feature bullets - sharp brutalist boxes */}
            <div className="flex flex-wrap justify-center gap-2 mb-3">
              <span className="px-3 py-1 bg-black/40 text-white text-sm font-semibold border border-white/50">
                ⏱ 1 week exposure
              </span>
              <span className="px-3 py-1 bg-black/40 text-white text-sm font-semibold border border-white/50">
                💰 donate what you can
              </span>
              <span className="px-3 py-1 bg-black/40 text-white text-sm font-semibold border border-white/50">
                🎯 only 4 spots.
              </span>
            </div>
            
            {/* CTA - bold with glow */}
            <div className="flex flex-col items-center gap-2 mb-4">
              <span className="px-4 py-2 bg-white/10 text-white text-sm font-bold border-2 border-white animate-pulse">
                ✉ Get on the waitlist now!
              </span>
            </div>
            {/* Enhanced Sponsor Zone with symbols */}
            <div className="flex items-center justify-center gap-1">
              {/* Left: Sponsor with brutalist symbol */}
              <span className="text-white font-bold text-sm flex items-center gap-1 px-2 py-1 border border-white/60 bg-black/20">
                💎 Sponsor
              </span>
              
              {/* Brutalist arrow/chevron */}
              <span className="text-white/80 mx-1">➤</span>
              
              {/* Ko-fi button */}
              <a
                href="https://ko-fi.com/3d3dca"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  src="/kofi-button.png"
                  alt="Sponsor a week on Ko-fi"
                  className="h-6 hover:scale-110 transition-transform"
                />
              </a>
              
              {/* Brutalist arrow/chevron */}
              <span className="text-white/80 mx-1">➤</span>
              
              {/* Right: Feed a Dev! with brutalist symbol */}
              <span className="text-white font-bold text-sm flex items-center gap-1 px-2 py-1 border border-white/60 bg-black/20">
                Feed a Dev! 💸
              </span>
            </div>
          </div>
          {featuredLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </div>
          ) : featuredProjects.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Render actual featured projects */}
              {featuredProjects.map((project) => (
                <div key={project.id} className="relative group">
                  {/* Project Card - Unclickable, displays info */}
                  <div className="border rounded-xl p-4 bg-card hover:bg-accent/50 transition-colors cursor-not-allowed">
                    <div className="flex items-center gap-3 mb-3">
                      {project.avatarUrl ? (
                        <Image
                          src={project.avatarUrl}
                          alt={project.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <Star className="h-5 w-5" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{project.name}</h3>
                        <p className="text-xs text-muted-foreground truncate">{project.owner}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {project.description || 'No description'}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                      {project.stars !== undefined && (
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {project.stars}
                        </span>
                      )}
                      {project.forks !== undefined && (
                        <span className="flex items-center gap-1">
                          <Github className="h-3 w-3" />
                          {project.forks}
                        </span>
                      )}
                      {project.language && (
                        <span>{project.language}</span>
                      )}
                    </div>
                    {project.website && (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                        onClick={() => trackFeaturedClick(project.id)}
                      >
                        Visit Website →
                      </a>
                    )}
                  </div>
                  
                  {/* Click count badge */}
                  {project.clickCount > 0 && (
                    <div className="absolute top-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-0.5 rounded-full">
                      {project.clickCount} clicks
                    </div>
                  )}
                </div>
              ))}
              
              {/* Render Reserve Your Spot overlays for empty slots */}
              {!featuredLoading && featuredProjects.length < 4 && (
                Array.from({ length: 4 - featuredProjects.length }).map((_, i) => (
                  <div key={`reserve-${i}`} className="relative group">
                    <div className="border-2 border-dashed border-amber-500/50 rounded-xl p-4 bg-amber-50/50 dark:bg-amber-950/20 hover:bg-amber-100/50 dark:hover:bg-amber-900/30 transition-colors min-h-[140px] flex flex-col items-center justify-center text-center">
                      <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mb-3">
                        <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">Reserve Your Spot</h3>
                      <p className="text-xs text-amber-700 dark:text-amber-300 mb-2">
                        Get your indie project featured
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-amber-500 text-amber-700 hover:bg-amber-100 dark:text-amber-300 dark:border-amber-600 dark:hover:bg-amber-900/50"
                      >
                        Apply Now →
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No featured projects yet.</p>
              <p className="text-sm">Want to showcase your open source project?</p>
            </div>
          )}
        </div>
      </section>

      {/* Trending Section */}
      <section id="trending" className="container mx-auto px-4 pb-8">
        <div className="relative rounded-3xl border-2 border-rose-300 dark:border-rose-700 bg-gradient-to-br from-rose-50/80 to-pink-50/80 dark:from-rose-950/40 dark:to-pink-950/40 overflow-hidden px-6 pb-6">
          {/* Floating icons */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[
              { icon: Zap, color: 'text-rose-400' },
              { icon: Flame, color: 'text-orange-400' },
              { icon: Activity, color: 'text-pink-400' },
              { icon: Gauge, color: 'text-rose-300' },
              { icon: BarChart2, color: 'text-red-400' },
              { icon: Target, color: 'text-rose-500' },
              { icon: TrendingUp, color: 'text-pink-500' },
              { icon: Flame, color: 'text-orange-300' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className={`absolute ${item.color}`}
                style={{
                  left: `${5 + i * 12}%`,
                  top: `${15 + (i % 3) * 28}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, i % 2 === 0 ? 10 : -10, 0],
                  scale: [1, 1.1, 1],
                  opacity: [0.15, 0.35, 0.15],
                }}
                transition={{
                  duration: 2.5 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
              >
                <item.icon className="w-8 h-8" strokeWidth={1.5} />
              </motion.div>
            ))}
          </div>
          
          {/* Header - brutalist style */}
          <div className="relative z-10 py-6 text-center">
            <h2 className="text-4xl font-black text-white mb-4 tracking-wider uppercase"
                style={{
                  textShadow: '3px 3px 0 rgba(0,0,0,0.3), -1px -1px 0 rgba(255,255,255,0.1)',
                  WebkitTextStroke: '1px rgba(255,255,255,0.3)'
                }}>
              ▸ Trending Now ◂
            </h2>
            
            {/* Value prop */}
            <div className="flex flex-wrap justify-center gap-2 mb-3">
              <span className="px-4 py-1.5 bg-black/50 text-white text-base font-bold border-2 border-white/70 shadow-[4px_4px_0_rgba(255,255,255,0.3)]">
                ⚡ Hot repos blowing up right now
              </span>
            </div>
            
            {/* Facts */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <span className="px-3 py-1 bg-black/40 text-white text-sm font-semibold border border-white/50">
                📈 Updated hourly
              </span>
              <span className="px-3 py-1 bg-black/40 text-white text-sm font-semibold border border-white/50">
                🎯 8 fresh picks
              </span>
              <span className="px-3 py-1 bg-black/40 text-white text-sm font-semibold border border-white/50">
                🔥 Real-time data
              </span>
            </div>
            
            {/* Date range pills - update local state only */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {(['daily', 'weekly', 'monthly'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTrendingDateRange(range)}
                  className={`px-4 py-1.5 text-sm rounded-full transition-all ${
                    trendingDateRange === range
                      ? 'bg-rose-500 text-white shadow-md'
                      : 'bg-rose-100/60 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-800'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* View All button */}
          <div className="relative z-10 mb-6 flex items-center justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setTrendingExpanded(!trendingExpanded)}>
              {trendingExpanded ? 'Show Less' : 'Show More'}
            </Button>
            <Button variant="ghost" className="gap-2" onClick={() => router.push('/search?sort=stars')}>
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {trendingError ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-destructive mb-4" />
              <h3 className="text-lg font-semibold">Failed to load trending projects</h3>
              <p className="text-muted-foreground">Please check your connection.</p>
            </div>
          ) : trendingLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: trendingExpanded ? 20 : 8 }).map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {trendingProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Top Projects Section */}
      <section id="top-projects" className="container mx-auto px-4 pb-8">
        <div className="relative rounded-3xl border-2 border-violet-300 dark:border-violet-700 bg-gradient-to-br from-violet-50/80 to-purple-50/80 dark:from-violet-950/40 dark:to-purple-950/40 overflow-hidden px-6 pb-6">
          {/* Floating icons */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[
              { icon: Trophy, color: 'text-violet-400' },
              { icon: Crown, color: 'text-yellow-400' },
              { icon: Medal, color: 'text-amber-400' },
              { icon: Award, color: 'text-purple-400' },
              { icon: Star, color: 'text-violet-500' },
              { icon: Hexagon, color: 'text-pink-400' },
              { icon: Sparkles, color: 'text-violet-300' },
              { icon: Trophy, color: 'text-amber-500' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className={`absolute ${item.color}`}
                style={{
                  left: `${5 + i * 12}%`,
                  top: `${15 + (i % 3) * 28}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, i % 2 === 0 ? 10 : -10, 0],
                  scale: [1, 1.1, 1],
                  opacity: [0.15, 0.35, 0.15],
                }}
                transition={{
                  duration: 2.5 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
              >
                <item.icon className="w-8 h-8" strokeWidth={1.5} />
              </motion.div>
            ))}
          </div>
          
          {/* Header - brutalist style */}
          <div className="relative z-10 py-6 text-center">
            <h2 className="text-4xl font-black text-white mb-4 tracking-wider uppercase"
                style={{
                  textShadow: '3px 3px 0 rgba(0,0,0,0.3), -1px -1px 0 rgba(255,255,255,0.1)',
                  WebkitTextStroke: '1px rgba(255,255,255,0.3)'
                }}>
              ▸ Top Projects ◂
            </h2>
            
            {/* Value prop */}
            <div className="flex flex-wrap justify-center gap-2 mb-3">
              <span className="px-4 py-1.5 bg-black/50 text-white text-base font-bold border-2 border-white/70 shadow-[4px_4px_0_rgba(255,255,255,0.3)]">
                🏆 The cream of the crop
              </span>
            </div>
            
            {/* Facts */}
            <div className="flex flex-wrap justify-center gap-2 mb-2">
              <span className="px-3 py-1 bg-black/40 text-white text-sm font-semibold border border-white/50">
                ⭐ Hand-picked
              </span>
              <span className="px-3 py-1 bg-black/40 text-white text-sm font-semibold border border-white/50">
                💎 Quality verified
              </span>
              <span className="px-3 py-1 bg-black/40 text-white text-sm font-semibold border border-white/50">
                🌟 100% legit
              </span>
            </div>
          </div>
          
          {/* View All button */}
          <div className="relative z-10 mb-6 flex items-center justify-end gap-2">
            <Button variant="ghost" className="gap-2" onClick={() => router.push(`/search?language=${selectedLanguage}`)}>
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {projectsError ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-destructive mb-4" />
              <h3 className="text-lg font-semibold">Failed to load projects</h3>
              <p className="text-muted-foreground">Please check your connection.</p>
            </div>
          ) : projectsLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Free to Use Section */}
      <section className="container mx-auto px-4 pb-8">
        <div className="relative rounded-3xl border-2 border-emerald-300 dark:border-emerald-700 bg-gradient-to-br from-emerald-50/80 to-teal-50/80 dark:from-emerald-950/40 dark:to-teal-950/40 overflow-hidden px-6 pb-6">
          {/* Floating icons */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[
              { icon: Gift, color: 'text-emerald-400' },
              { icon: Heart, color: 'text-rose-400' },
              { icon: Sparkles, color: 'text-teal-400' },
              { icon: CheckCircle, color: 'text-emerald-500' },
              { icon: Download, color: 'text-blue-400' },
              { icon: Package, color: 'text-emerald-300' },
              { icon: Unlock, color: 'text-teal-500' },
              { icon: Heart, color: 'text-rose-300' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className={`absolute ${item.color}`}
                style={{
                  left: `${5 + i * 12}%`,
                  top: `${15 + (i % 3) * 28}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, i % 2 === 0 ? 10 : -10, 0],
                  scale: [1, 1.1, 1],
                  opacity: [0.15, 0.35, 0.15],
                }}
                transition={{
                  duration: 2.5 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
              >
                <item.icon className="w-8 h-8" strokeWidth={1.5} />
              </motion.div>
            ))}
          </div>
          
          {/* Header - brutalist style */}
          <div className="relative z-10 py-6 text-center">
            <h2 className="text-4xl font-black text-white mb-4 tracking-wider uppercase"
                style={{
                  textShadow: '3px 3px 0 rgba(0,0,0,0.3), -1px -1px 0 rgba(255,255,255,0.1)',
                  WebkitTextStroke: '1px rgba(255,255,255,0.3)'
                }}>
              ▸ Free to Use ◂
            </h2>
            
            {/* Value prop */}
            <div className="flex flex-wrap justify-center gap-2 mb-3">
              <span className="px-4 py-1.5 bg-black/50 text-white text-base font-bold border-2 border-white/70 shadow-[4px_4px_0_rgba(255,255,255,0.3)]">
                💸 Free tools that actually work
              </span>
            </div>
            
            {/* Facts */}
            <div className="flex flex-wrap justify-center gap-2 mb-2">
              <span className="px-3 py-1 bg-black/40 text-white text-sm font-semibold border border-white/50">
                🔓 No licenses
              </span>
              <span className="px-3 py-1 bg-black/40 text-white text-sm font-semibold border border-white/50">
                🆓 100% free
              </span>
              <span className="px-3 py-1 bg-black/40 text-white text-sm font-semibold border border-white/50">
                ⚖️ Terms vary
              </span>
            </div>
          </div>
          
          {freeToUseLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : freeToUseProjects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {freeToUseProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No free-to-use projects found. Please try again later.</p>
          </div>
        )}
      </div>
    </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to explore?</h2>
          <p className="mb-8 text-primary-foreground/80 max-w-xl mx-auto">
            Discover amazing open source projects from developers around the world.
          </p>
          <Button variant="secondary" size="lg" onClick={() => router.push('/search')}>
            Explore Projects
          </Button>
        </div>
      </section>

      {/* Footer */}
      {/* Sponsored / Promote Section - Bottom */}
      <section className="bg-linear-to-r from-primary/5 via-primary/10 to-primary/5 py-12">
        <div className="container mx-auto px-4">
          {/* Header - brutalist style */}
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-black text-foreground mb-4 tracking-wider uppercase"
                style={{
                  textShadow: '3px 3px 0 rgba(0,0,0,0.1)'
                }}>
              ▸ Promote Your Project ◂
            </h2>
            
            {/* Value prop */}
            <div className="flex flex-wrap justify-center gap-2 mb-3">
              <span className="px-4 py-1.5 bg-black/50 text-white text-base font-bold border-2 border-white/70 shadow-[4px_4px_0_rgba(255,255,255,0.3)]">
                📢 Get your work in front of 10K+ devs
              </span>
            </div>
            
            {/* Facts */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <span className="px-3 py-1 bg-black/40 text-white text-sm font-semibold border border-white/50">
                🎯 1 week exposure
              </span>
              <span className="px-3 py-1 bg-black/40 text-white text-sm font-semibold border border-white/50">
                💰 Pay what you want
              </span>
              <span className="px-3 py-1 bg-black/40 text-white text-sm font-semibold border border-white/50">
                ⚡ Fast turnaround
              </span>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {SPONSORED_SPOTS.map((spot) => (
              <a
                key={spot.id}
                href={spot.url}
                className="block p-6 bg-card border rounded-xl hover:shadow-lg transition-shadow text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  {spot.id === 'sp1' && (
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  )}
                  {spot.id === 'sp2' && (
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  )}
                  {spot.id === 'sp3' && (
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  )}
                </div>
                <h3 className="font-semibold mb-2">{spot.name}</h3>
                <p className="text-sm text-muted-foreground">{spot.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex flex-col items-center gap-2 md:items-start">
              <span className="text-lg font-bold">THE GOT HUB</span>
              <p className="text-sm text-muted-foreground">
                Your gateway to open source discovery
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground md:items-end">
              <p>Powered by GitHub, GitLab, SourceForge, Hugging Face • Open source • Built with Next.js</p>
              <a href="mailto:develop@ktk3d.com" className="hover:text-primary transition-colors">
                develop@ktk3d.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function HomePage() {
  return <HomeContent />;
}
