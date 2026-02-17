'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Star, GitFork, Eye, AlertCircle, ExternalLink, 
  Download, FileText, Users, BookOpen, ArrowLeft,
  Loader2, Copy, Check, Folder, FileCode, File
} from 'lucide-react';
import { useProject } from '@/hooks/useProjects';
import { formatNumber, formatDate, getLanguageColor } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { ReadmeViewer } from '@/components/project/readme-viewer';

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const owner = params.owner as string;
  const repo = params.repo as string;

  const { project, readme, contributors, isLoading, error } = useProject(owner, repo);
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`https://github.com/${owner}/${repo}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (format: 'zip' | 'tarball') => {
    // Direct download links from GitHub
    const downloadUrl = `https://github.com/${owner}/${repo}/${format === 'zip' ? 'archive' : 'tarball'}/refs/heads/${project?.defaultBranch || 'main'}`;
    window.open(downloadUrl, '_blank');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-16">
          <Button variant="ghost" onClick={() => router.back()} className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <AlertCircle className="h-16 w-16 text-destructive mb-4" />
            <h3 className="text-xl font-semibold mb-2">Project not found</h3>
            <p className="text-muted-foreground mb-4">{error.message}</p>
            <Button onClick={() => router.push('/')}>
              Go Home
            </Button>
          </div>
        </main>
      </div>
    );
  }

  if (isLoading || !project) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center py-32">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </main>
      </div>
    );
  }

  const languageColor = project.language ? getLanguageColor(project.language) : '#6B7280';

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Project Header */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            {project.avatarUrl && (
              <Image
                src={project.avatarUrl}
                alt={project.owner}
                width={64}
                height={64}
                className="rounded-lg"
              />
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1">{project.name}</h1>
              <p className="text-muted-foreground mb-2">
                by <Link href={`/search?q=${project.owner}`} className="hover:underline">{project.owner}</Link>
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {project.language && (
                  <span className="flex items-center gap-1.5 text-sm">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: languageColor }} />
                    {project.language}
                  </span>
                )}
                {project.license && (
                  <span className="text-sm text-muted-foreground">
                    {project.license}
                  </span>
                )}
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-4 w-4" />
                  {formatNumber(project.stars)}
                </span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <GitFork className="h-4 w-4" />
                  {formatNumber(project.forks)}
                </span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  {formatNumber(project.watchers || 0)}
                </span>
              </div>
            </div>
          </div>

          <p className="text-lg text-muted-foreground mb-6">
            {project.description || 'No description available'}
          </p>

          {/* Topics */}
          {project.topics && project.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.topics.map((topic: string) => (
                <Link
                  key={topic}
                  href={`/search?q=${topic}`}
                  className="px-3 py-1 text-sm bg-muted rounded-full hover:bg-muted/80 transition-colors"
                >
                  {topic}
                </Link>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => handleDownload('zip')}>
              <Download className="h-4 w-4 mr-2" />
              Download ZIP
            </Button>
            <Button variant="outline" onClick={() => handleDownload('tarball')}>
              <Download className="h-4 w-4 mr-2" />
              Download TAR
            </Button>
            <Button variant="outline" asChild>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                View on GitHub
              </a>
            </Button>
            <Button variant="outline" onClick={handleCopyUrl}>
              {copied ? (
                <Check className="h-4 w-4 mr-2" />
              ) : (
                <Copy className="h-4 w-4 mr-2" />
              )}
              Copy URL
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* README */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  README
                </CardTitle>
              </CardHeader>
              <CardContent>
                {readme ? (
                  <ReadmeViewer content={readme.content} />
                ) : (
                  <p className="text-muted-foreground">No README available</p>
                )}
              </CardContent>
            </Card>

            {/* Contributors */}
            {contributors && contributors.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Contributors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {contributors.map((contributor: { login: string; avatar_url: string; contributions: number }) => (
                      <Link
                        key={contributor.login}
                        href={`/search?q=${contributor.login}`}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <Image
                          src={contributor.avatar_url}
                          alt={contributor.login}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <span className="text-sm font-medium">{contributor.login}</span>
                        <span className="text-xs text-muted-foreground">
                          {contributor.contributions} commits
                        </span>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <Card>
              <CardHeader>
                <CardTitle>Project Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Last Updated</div>
                  <div className="text-sm">{formatDate(project.lastUpdated)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Created</div>
                  <div className="text-sm">{formatDate(project.createdAt)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Default Branch</div>
                  <div className="text-sm font-mono">{project.defaultBranch}</div>
                </div>
                {project.size && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Size</div>
                    <div className="text-sm">{(project.size / 1024).toFixed(1)} KB</div>
                  </div>
                )}
                {project.issues !== undefined && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Open Issues</div>
                    <div className="text-sm">{project.issues}</div>
                  </div>
                )}
                {project.homepage && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Website</div>
                    <a
                      href={project.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {project.homepage}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Stars</span>
                  <span className="font-semibold">{formatNumber(project.stars)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Forks</span>
                  <span className="font-semibold">{formatNumber(project.forks)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Watchers</span>
                  <span className="font-semibold">{formatNumber(project.watchers || 0)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
