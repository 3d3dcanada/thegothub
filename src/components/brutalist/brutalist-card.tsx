'use client';

import { ReactNode, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Torn paper edge generator - creates unique SVG clip paths
function generateTornEdge(seed: number, side: 'top' | 'bottom' | 'left' | 'right'): string {
  const random = (min: number, max: number) => {
    const x = Math.sin(seed++) * 10000;
    return min + (x - Math.floor(x)) * (max - min);
  };
  
  const points: string[] = [];
  
  if (side === 'top' || side === 'bottom') {
    const segments = 12;
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * 100;
      const y = side === 'top' 
        ? random(0, 8) 
        : 100 - random(0, 8);
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
  } else {
    const segments = 12;
    for (let i = 0; i <= segments; i++) {
      const y = (i / segments) * 100;
      const x = side === 'left' 
        ? random(0, 8) 
        : 100 - random(0, 8);
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
  }
  
  return points.join(' ');
}

interface BrutalistCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverRotate?: number;
  borderColor?: string;
  shadowColor?: string;
  tornEdges?: ('top' | 'bottom' | 'left' | 'right')[];
  index?: number;
}

export function BrutalistCard({
  children,
  className,
  onClick,
  hoverRotate = 2,
  borderColor = '#000',
  shadowColor = '#000',
  tornEdges = ['bottom', 'right'],
  index = 0,
}: BrutalistCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Generate unique torn edges based on index
  const clipPathId = useMemo(() => `torn-${index}-${Date.now()}`, [index]);
  const seed = useMemo(() => index * 1000 + 42, [index]);
  
  // Generate SVG clip path
  const svgPaths = useMemo(() => {
    const paths: ReactNode[] = [];
    let currentSeed = seed;
    
    if (tornEdges.includes('top')) {
      const points = generateTornEdge(currentSeed++, 'top');
      paths.push(
        <polygon key="top" points={`0,0 ${points} 100,0 100,8 0,8`} fill="white" />
      );
    }
    if (tornEdges.includes('bottom')) {
      const points = generateTornEdge(currentSeed++, 'bottom');
      paths.push(
        <polygon key="bottom" points={`0,92 ${points} 100,92 100,100 0,100`} fill="white" />
      );
    }
    if (tornEdges.includes('left')) {
      const points = generateTornEdge(currentSeed++, 'left');
      paths.push(
        <polygon key="left" points={`0,0 8,0 ${points} 8,100 0,100`} fill="white" />
      );
    }
    if (tornEdges.includes('right')) {
      const points = generateTornEdge(currentSeed++, 'right');
      paths.push(
        <polygon key="right" points={`92,0 100,0 100,100 92,100 ${points}`} fill="white" />
      );
    }
    
    return paths;
  }, [tornEdges, seed]);
  
  // Random slight rotation for "scattered" effect
  const baseRotation = useMemo(() => (Math.sin(seed) * hoverRotate * 0.3), [seed, hoverRotate]);
  
  return (
    <>
      {/* SVG Definitions for clip path */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
            <rect x="0" y="0" width="1" height="1" />
          </clipPath>
        </defs>
      </svg>
      
      <motion.div
        className={cn(
          'relative bg-card cursor-pointer',
          className
        )}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ rotate: baseRotation }}
        animate={{
          rotate: isHovered ? baseRotation + hoverRotate : baseRotation,
          y: isHovered ? -4 : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        style={{
          // Thick brutalist border
          border: `4px solid ${borderColor}`,
          // Hard shadow (not blurred)
          boxShadow: isHovered 
            ? `8px 8px 0 ${shadowColor}`
            : `4px 4px 0 ${shadowColor}`,
          // Clip path for torn edges effect
          clipPath: tornEdges.length > 0 
            ? `url(#${clipPathId})` 
            : undefined,
        }}
      >
        {/* Torn edge overlay */}
        {tornEdges.length > 0 && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              {svgPaths}
            </svg>
          </div>
        )}
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Noise texture overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>
    </>
  );
}

// Simplified version for lists (less animation overhead)
export function BrutalistCardStatic({
  children,
  className,
  onClick,
  borderColor = '#000',
  shadowColor = '#000',
  rotation = 0,
}: Omit<BrutalistCardProps, 'hoverRotate' | 'tornEdges' | 'index'> & { rotation?: number }) {
  return (
    <div
      className={cn(
        'relative bg-card cursor-pointer transition-all duration-200',
        'hover:-translate-y-1 hover:shadow-[8px_8px_0]',
        className
      )}
      onClick={onClick}
      style={{
        border: `4px solid ${borderColor}`,
        boxShadow: `4px 4px 0 ${shadowColor}`,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {children}
      
      {/* Noise texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

// Badge component for stats/tags
export function BrutalistBadge({
  children,
  className,
  color = '#000',
  bgColor = '#FFD700',
}: {
  children: ReactNode;
  className?: string;
  color?: string;
  bgColor?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-xs font-bold uppercase tracking-wide',
        className
      )}
      style={{
        color,
        backgroundColor: bgColor,
        border: `2px solid ${color}`,
        boxShadow: `2px 2px 0 ${color}`,
      }}
    >
      {children}
    </span>
  );
}

// Accent bar for language colors
export function LanguageAccentBar({ 
  color, 
  position = 'left' 
}: { 
  color: string; 
  position?: 'left' | 'top' | 'right' | 'bottom';
}) {
  const positionStyles = {
    left: 'left-0 top-0 bottom-0 w-1',
    top: 'top-0 left-0 right-0 h-1',
    right: 'right-0 top-0 bottom-0 w-1',
    bottom: 'bottom-0 left-0 right-0 h-1',
  };
  
  return (
    <div 
      className={cn('absolute', positionStyles[position])}
      style={{ backgroundColor: color }}
    />
  );
}