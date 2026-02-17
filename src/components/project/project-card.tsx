'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, GitFork, Download, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatNumber, getPlatformColor, getLanguageColor } from '@/lib/utils';
import { ProjectDrawer } from './project-drawer';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const platformColor = getPlatformColor(project.platform);
  const languageColor = project.language ? getLanguageColor(project.language) : '#6B7280';

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Direct download links from GitHub
    const repoName = project.repo || project.name;
    const downloadUrl = `https://github.com/${project.owner}/${repoName}/archive/refs/heads/${project.defaultBranch || 'main'}.zip`;
    window.open(downloadUrl, '_blank');
  };

  const handleExternalLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(project.url, '_blank');
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't open drawer if clicking on buttons or links
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) {
      return;
    }
    setDrawerOpen(true);
  };

  return (
    <>
      <Card
        className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer h-full flex flex-col"
        onClick={handleCardClick}
      >
        <div className="p-5 flex-1">
          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            {project.avatarUrl ? (
              <Image
                src={project.avatarUrl}
                alt={project.owner}
                width={40}
                height={40}
                className="rounded-lg"
              />
            ) : (
              <div
                className="h-10 w-10 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                style={{ backgroundColor: platformColor }}
              >
                {project.owner.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground hover:text-primary transition-colors truncate block">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {project.owner}
              </p>
            </div>
            <span
              className="px-2 py-1 text-xs font-medium rounded-full"
              style={{
                backgroundColor: `${platformColor}15`,
                color: platformColor,
              }}
            >
              {project.platform}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 min-h-10">
            {project.description || 'No description available'}
          </p>

          {/* Topics */}
          {project.topics && project.topics.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {project.topics.slice(0, 3).map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-0.5 text-xs bg-muted rounded-full"
                >
                  {topic}
                </span>
              ))}
              {project.topics.length > 3 && (
                <span className="px-2 py-0.5 text-xs text-muted-foreground">
                  +{project.topics.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm">
            {project.language && (
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: languageColor }}
                />
                <span className="text-muted-foreground">{project.language}</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-muted-foreground">
              <Star className="h-3.5 w-3.5" />
              <span>{formatNumber(project.stars)}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <GitFork className="h-3.5 w-3.5" />
              <span>{formatNumber(project.forks)}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-2 px-5 py-3 bg-muted/30 border-t">
          <Button size="sm" variant="default" className="flex-1" onClick={handleDownload}>
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Download
          </Button>
          <Button size="sm" variant="outline" onClick={handleExternalLink}>
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </div>
      </Card>

      {/* Project Drawer */}
      <ProjectDrawer
        project={project}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </>
  );
}
