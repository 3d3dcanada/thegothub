'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface NoiseBackgroundProps {
  children?: ReactNode;
  className?: string;
  opacity?: number;
  animated?: boolean;
}

// Static noise texture overlay
export function NoiseBackground({
  children,
  className,
  opacity = 0.03,
  animated = false,
}: NoiseBackgroundProps) {
  return (
    <div className={cn('absolute inset-0 pointer-events-none', className)}>
      {/* Noise texture */}
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          opacity,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          animation: animated ? 'noise 0.5s steps(5) infinite' : undefined,
        }}
      />
      {children}
      
      {animated && (
        <style jsx>{`
          @keyframes noise {
            0%, 100% { transform: translate(0, 0); }
            10% { transform: translate(-5%, -5%); }
            20% { transform: translate(5%, 5%); }
            30% { transform: translate(-5%, 5%); }
            40% { transform: translate(5%, -5%); }
            50% { transform: translate(-5%, 0); }
            60% { transform: translate(5%, 0); }
            70% { transform: translate(0, 5%); }
            80% { transform: translate(0, -5%); }
            90% { transform: translate(5%, 5%); }
          }
        `}</style>
      )}
    </div>
  );
}

// Gradient mesh background with hard stops
interface GradientMeshProps {
  colors: string[];
  className?: string;
  animated?: boolean;
}

export function GradientMesh({
  colors,
  className,
  animated = true,
}: GradientMeshProps) {
  const gradientStops = colors.map((color, i) => {
    const position = (i / (colors.length - 1)) * 100;
    return `${color} ${position}%`;
  }).join(', ');
  
  return (
    <div
      className={cn('absolute inset-0', className)}
      style={{
        background: `linear-gradient(135deg, ${gradientStops})`,
        backgroundSize: animated ? '400% 400%' : undefined,
        animation: animated ? 'gradientShift 15s ease infinite' : undefined,
      }}
    >
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}

// Scanlines effect (subtle CRT feel)
interface ScanlinesProps {
  opacity?: number;
  className?: string;
}

export function Scanlines({ opacity = 0.02, className }: ScanlinesProps) {
  return (
    <div
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{
        opacity,
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, 0.3) 2px,
          rgba(0, 0, 0, 0.3) 4px
        )`,
      }}
    />
  );
}

// Grid pattern background
interface GridPatternProps {
  color?: string;
  size?: number;
  opacity?: number;
  className?: string;
  broken?: boolean;
}

export function GridPattern({
  color = '#000',
  size = 40,
  opacity = 0.05,
  className,
  broken = false,
}: GridPatternProps) {
  return (
    <div
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{
        opacity,
        backgroundImage: broken
          ? `url("data:image/svg+xml,%3Csvg width='${size}' height='${size}' viewBox='0 0 ${size} ${size}' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h${size}v${size}H0z' fill='none' stroke='${encodeURIComponent(color)}' stroke-width='1' stroke-dasharray='4 8'/%3E%3C/svg%3E")`
          : `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}

// Combined brutalist background
interface BrutalistBackgroundProps {
  variant?: 'warm' | 'cool' | 'accent' | 'dark';
  className?: string;
  children?: ReactNode;
}

const backgroundVariants = {
  warm: ['#FFF7ED', '#FFEDD5', '#FED7AA', '#FDBA74'],
  cool: ['#F0F9FF', '#E0F2FE', '#BAE6FD', '#7DD3FC'],
  accent: ['#FEF3C7', '#FDE68A', '#FCD34D', '#FBBF24'],
  dark: ['#18181B', '#27272A', '#3F3F46', '#52525B'],
};

export function BrutalistBackground({
  variant = 'warm',
  className,
  children,
}: BrutalistBackgroundProps) {
  const colors = backgroundVariants[variant];
  
  return (
    <div className={cn('relative', className)}>
      {/* Base gradient */}
      <GradientMesh colors={colors} animated />
      
      {/* Noise overlay */}
      <NoiseBackground opacity={0.04} />
      
      {/* Grid pattern */}
      <GridPattern 
        color={variant === 'dark' ? '#fff' : '#000'} 
        size={60} 
        opacity={0.02} 
        broken 
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Section wrapper with brutalist styling
interface BrutalistSectionProps {
  children: ReactNode;
  className?: string;
  variant?: 'warm' | 'cool' | 'accent' | 'dark';
  border?: boolean;
  borderColor?: string;
}

export function BrutalistSection({
  children,
  className,
  variant = 'warm',
  border = true,
  borderColor = '#000',
}: BrutalistSectionProps) {
  return (
    <section
      className={cn('relative overflow-hidden', className)}
      style={{
        border: border ? `4px solid ${borderColor}` : undefined,
      }}
    >
      <BrutalistBackground variant={variant}>
        {children}
      </BrutalistBackground>
    </section>
  );
}