'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, GitFork, Download, ExternalLink, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatNumber, getLanguageColor } from '@/lib/utils';
import { ProjectDrawer } from './project-drawer';
import { BrutalistBadge, LanguageAccentBar } from '@/components/brutalist';
import type { Project } from '@/types';

interface ProjectCardV2Props {
  project: Project;
  index?: number;
  variant?: 'default' | 'featured' | 'compact';
}

// Torn paper edge SVG generator
function TornEdgeSVG({ seed, position }: { seed: number; position: 'bottom' | 'right' }) {
  const random = (min: number, max: number, s: number) => {
    const x = Math.sin(s) * 10000;
    return min + (x - Math.floor(x)) * (max - min);
  };
  
  if (position === 'bottom') {
    const points: string[] = [];
    for (let i = 0; i <= 10; i++) {
      const x = i * 10;
      const y = random(2, 8, seed + i);
      points.push(`${x},${y}`);
    }
    return (
      <svg 
        className="absolute bottom-0 left-0 right-0 h-2 overflow-visible"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
      >
        <polygon 
          points={`0,10 ${points.join(' ')} 100,10`}
          fill="currentColor"
          className="text-card"
        />
      </svg>
    );
  }
  
  return null;
}

export function ProjectCardV2({ project, index = 0, variant = 'default' }: ProjectCardV2Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const languageColor = project.language ? getLanguageColor(project.language) : '#6B7280';
  
  // Random rotation for scattered effect (-2 to +2 degrees)
  const rotation = useMemo(() => (Math.sin(index * 1000) * 2), [index]);
  
  // Random torn edge seed
  const tornSeed = useMemo(() => index * 1000 + 42, [index]);
  
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const repoName = project.repo || project.name;
    const downloadUrl = `https://github.com/${project.owner}/${repoName}/archive/refs/heads/${project.defaultBranch || 'main'}.zip`;
    window.open(downloadUrl, '_blank');
  };
  
  const handleExternalLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(project.url, '_blank');
  };
  
  if (variant === 'compact') {
    return (
      <CompactProjectCard 
        project={project} 
        index={index}
        onClick={() => setDrawerOpen(true)} 
      />
    );
  }
  
  if (variant === 'featured') {
    return (
      <FeaturedProjectCard 
        project={project} 
        index={index}
        onClick={() => setDrawerOpen(true)} 
      />
    );
  }
  
  return (
    <>
      <motion.div
        className="relative bg-card cursor-pointer overflow-hidden"
        onClick={() => setDrawerOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 20, rotate: rotation }}
        animate={{ opacity: 1, y: 0, rotate: rotation }}
        whileHover={{ 
          y: -8, 
          rotate: rotation + 1,
          transition: { type: 'spring', stiffness: 400, damping: 25 }
        }}
        style={{
          // Thick brutalist border
          border: '4px solid #000',
          // Hard shadow that grows on hover
          boxShadow: isHovered 
            ? '8px 8px 0 #000'
            : '4px 4px 0 #000',
        }}
      >
        {/* Language accent bar - prominent left bar */}
        <LanguageAccentBar color={languageColor} position="left" />
        
        {/* Main content */}
        <div className="p-5 pl-6">
          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            {project.avatarUrl ? (
              <div className="relative w-12 h-12 rounded-lg overflow-hidden border-2 border-black">
                <Image
                  src={project.avatarUrl}
                  alt={project.owner}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-lg font-bold border-2 border-black"
                style={{ backgroundColor: languageColor }}
              >
                {project.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-foreground truncate leading-tight">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground truncate font-medium">
                by {project.owner}
              </p>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 min-h-10">
            {project.description || 'No description available'}
          </p>
          
          {/* Topics as brutalist badges */}
          {project.topics && project.topics.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {project.topics.slice(0, 3).map((topic) => (
                <BrutalistBadge 
                  key={topic} 
                  bgColor="#F4F4F5"
                  color="#000"
                  className="text-[10px]"
                >
                  {topic}
                </BrutalistBadge>
              ))}
              {project.topics.length > 3 && (
                <span className="text-xs text-muted-foreground font-medium">
                  +{project.topics.length - 3}
                </span>
              )}
            </div>
          )}
          
          {/* Stats row */}
          <div className="flex items-center gap-4 text-sm mb-4">
            {project.language && (
              <div className="flex items-center gap-1.5">
                <span 
                  className="w-3 h-3 rounded-full border border-black"
                  style={{ backgroundColor: languageColor }}
                />
                <span className="font-medium">{project.language}</span>
              </div>
            )}
            <div className="flex items-center gap-1 font-medium">
              <Star className="h-4 w-4" />
              {formatNumber(project.stars)}
            </div>
            <div className="flex items-center gap-1 font-medium">
              <GitFork className="h-4 w-4" />
              {formatNumber(project.forks)}
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-black text-white font-bold text-sm uppercase tracking-wide border-2 border-black"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="h-4 w-4" />
              Download
            </motion.button>
            <motion.button
              onClick={handleExternalLink}
              className="w-12 h-10 flex items-center justify-center bg-white border-2 border-black"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
        
        {/* Torn paper effect on bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-3 overflow-hidden">
          <svg 
            viewBox="0 0 100 10" 
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full"
          >
            <path
              d={`M0,10 ${Array.from({ length: 11 }, (_, i) => {
                const x = i * 10;
                const y = 5 + Math.sin(tornSeed + i) * 3;
                return `L${x},${y}`;
              }).join(' ')} L100,10 Z`}
              fill="#000"
            />
          </svg>
        </div>
        
        {/* Noise texture overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>
      
      {/* Project Drawer */}
      <ProjectDrawer
        project={project}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </>
  );
}

// Compact variant for lists
function CompactProjectCard({ 
  project, 
  index,
  onClick 
}: { 
  project: Project; 
  index: number;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const languageColor = project.language ? getLanguageColor(project.language) : '#6B7280';
  const rotation = useMemo(() => (Math.sin(index * 1000) * 1.5), [index]);
  
  return (
    <motion.div
      className="relative bg-card cursor-pointer p-4 flex items-center gap-4"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ x: 4 }}
      style={{
        border: '3px solid #000',
        boxShadow: isHovered ? '4px 4px 0 #000' : '2px 2px 0 #000',
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <LanguageAccentBar color={languageColor} position="left" />
      
      <div className="flex-1 min-w-0 pl-2">
        <h4 className="font-bold truncate">{project.name}</h4>
        <p className="text-sm text-muted-foreground truncate">{project.description}</p>
      </div>
      
      <div className="flex items-center gap-3 text-sm">
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5" />
          {formatNumber(project.stars)}
        </span>
        {project.language && (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: languageColor }} />
            {project.language}
          </span>
        )}
      </div>
    </motion.div>
  );
}

// Featured variant for hero sections
function FeaturedProjectCard({ 
  project, 
  index,
  onClick 
}: { 
  project: Project; 
  index: number;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const languageColor = project.language ? getLanguageColor(project.language) : '#6B7280';
  
  return (
    <motion.div
      className="relative bg-card cursor-pointer overflow-hidden"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      style={{
        border: '5px solid #000',
        boxShadow: isHovered ? '12px 12px 0 #000' : '8px 8px 0 #000',
      }}
    >
      {/* Featured badge */}
      <div className="absolute top-4 right-4 z-10">
        <BrutalistBadge bgColor="#FFD700" color="#000">
          <TrendingUp className="h-3 w-3 mr-1" />
          Hot
        </BrutalistBadge>
      </div>
      
      {/* Language bar at top */}
      <div 
        className="h-2"
        style={{ backgroundColor: languageColor }}
      />
      
      <div className="p-6">
        {project.avatarUrl && (
          <div className="relative w-16 h-16 rounded-xl overflow-hidden border-3 border-black mb-4">
            <Image
              src={project.avatarUrl}
              alt={project.owner}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <h3 className="font-black text-2xl mb-2">{project.name}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex items-center gap-4 text-lg font-bold">
          <span className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            {formatNumber(project.stars)}
          </span>
          <span className="flex items-center gap-2">
            <GitFork className="h-5 w-5" />
            {formatNumber(project.forks)}
          </span>
        </div>
      </div>
      
      {/* Noise overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </motion.div>
  );
}

export default ProjectCardV2;