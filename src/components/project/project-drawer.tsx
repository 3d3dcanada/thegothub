'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Star, GitFork, Eye, Download, ExternalLink, 
  Copy, Check, Loader2, BookOpen, Users, Calendar,
  Folder, FileCode, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from '@/components/ui/drawer';
import { useProject } from '@/hooks/useProjects';
import { formatNumber, formatDate, getLanguageColor } from '@/lib/utils';
import { ReadmeViewer } from '@/components/project/readme-viewer';
import type { Project } from '@/types';

interface ProjectDrawerProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDrawer({ project, open, onOpenChange }: ProjectDrawerProps) {
  const { project: fullProject, readme, contributors, isLoading, error } = useProject(
    project?.owner || '',
    project?.repo || project?.name || ''
  );
  
  const [copied, setCopied] = useState(false);
  
  const displayProject = fullProject || project;
  
  const handleCopyUrl = () => {
    if (displayProject?.url) {
      navigator.clipboard.writeText(displayProject.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = (format: 'zip' | 'tarball') => {
    if (!displayProject) return;
    const downloadUrl = `https://github.com/${displayProject.owner}/${displayProject.name}/${format === 'zip' ? 'archive' : 'tarball'}/refs/heads/${displayProject.defaultBranch || 'main'}`;
    window.open(downloadUrl, '_blank');
  };

  const languageColor = displayProject?.language ? getLanguageColor(displayProject.language) : '#6B7280';

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="w-full h-full sm:w-[50vw] sm:max-w-xl sm:h-full sm:rounded-l-xl">
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}
        
        {error && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">Failed to load project details</p>
          </div>
        )}
        
        {!isLoading && !error && displayProject && (
          <>
            <DrawerHeader className="px-6">
              <div className="flex items-start gap-4">
                {displayProject.avatarUrl && (
                  <Image
                    src={displayProject.avatarUrl}
                    alt={displayProject.owner}
                    width={48}
                    height={48}
                    className="rounded-lg"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <DrawerTitle className="text-xl">{displayProject.name}</DrawerTitle>
                  <DrawerDescription className="mt-1">
                    by <Link href={`/search?q=${displayProject.owner}`} className="hover:underline">{displayProject.owner}</Link>
                  </DrawerDescription>
                </div>
              </div>
            </DrawerHeader>

            <div className="px-6 pb-4 space-y-4">
              {/* Stats & Language */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {displayProject.language && (
                  <span className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: languageColor }} />
                    {displayProject.language}
                  </span>
                )}
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Star className="h-4 w-4" />
                  {formatNumber(displayProject.stars)}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <GitFork className="h-4 w-4" />
                  {formatNumber(displayProject.forks)}
                </span>
                {displayProject.license && (
                  <span className="text-muted-foreground">{displayProject.license}</span>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground">
                {displayProject.description || 'No description available'}
              </p>

              {/* Topics */}
              {displayProject.topics && displayProject.topics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {displayProject.topics.slice(0, 6).map((topic: string) => (
                    <Link
                      key={topic}
                      href={`/search?q=${topic}`}
                      className="px-2.5 py-1 text-xs bg-muted rounded-full hover:bg-muted/80 transition-colors"
                    >
                      {topic}
                    </Link>
                  ))}
                  {displayProject.topics.length > 6 && (
                    <span className="px-2.5 py-1 text-xs text-muted-foreground">
                      +{displayProject.topics.length - 6}
                    </span>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={() => handleDownload('zip')}>
                  <Download className="h-4 w-4 mr-1.5" />
                  Download
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <a href={displayProject.url} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4 mr-1.5" />
                    View
                  </a>
                </Button>
                <Button size="sm" variant="outline" onClick={handleCopyUrl}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>

              {/* README Preview */}
              {readme?.content && (
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="h-4 w-4" />
                    <span className="font-medium text-sm">README</span>
                  </div>
                  <div className="max-h-[60vh] sm:max-h-[70vh] overflow-auto">
                    <ReadmeViewer content={readme.content} />
                  </div>
                </div>
              )}

              {/* Contributors Preview */}
              {contributors && contributors.length > 0 && (
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-4 w-4" />
                    <span className="font-medium text-sm">Top Contributors</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {contributors.slice(0, 8).map((contributor: { login: string; avatar_url: string }) => (
                      <Link
                        key={contributor.login}
                        href={`/search?q=${contributor.login}`}
                        className="flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-muted transition-colors"
                      >
                        <Image
                          src={contributor.avatar_url}
                          alt={contributor.login}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="text-xs">{contributor.login}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground mb-1">Last Updated</div>
                  <div>{formatDate(displayProject.lastUpdated)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Default Branch</div>
                  <div className="font-mono">{displayProject.defaultBranch}</div>
                </div>
              </div>
            </div>

            <DrawerFooter className="px-6">
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/project/${displayProject.owner}/${displayProject.name}`}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Full Project Page
                </Link>
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
