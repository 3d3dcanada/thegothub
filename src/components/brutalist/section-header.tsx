'use client';

import { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GlitchText, BrutalistText, SplitText, StampedText } from './glitch-text';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: ReactNode;
  variant?: 'default' | 'glitch' | 'stamped' | 'split';
  align?: 'left' | 'center' | 'right';
  className?: string;
  textColor?: string;
  shadowColor?: string;
}

// Elevated brutalist section header
export function SectionHeader({
  title,
  subtitle,
  badge,
  icon,
  variant = 'default',
  align = 'center',
  className,
  textColor = '#fff',
  shadowColor = 'rgba(0,0,0,0.3)',
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };
  
  const TitleComponent = {
    default: () => (
      <BrutalistText
        as="h2"
        className="text-4xl md:text-5xl font-black tracking-wider uppercase"
        shadowColor={shadowColor}
        animated
      >
        {title}
      </BrutalistText>
    ),
    glitch: () => (
      <GlitchText
        as="h2"
        className="text-4xl md:text-5xl font-black tracking-wider uppercase"
        intensity="medium"
        glitchOnView
      >
        {title}
      </GlitchText>
    ),
    stamped: () => (
      <StampedText
        className="text-3xl md:text-4xl"
        color="#FF0000"
        rotation={-2}
      >
        {title}
      </StampedText>
    ),
    split: () => (
      <h2 className="text-4xl md:text-5xl font-black tracking-wider uppercase">
        <SplitText delay={0.2}>
          {title}
        </SplitText>
      </h2>
    ),
  };
  
  return (
    <motion.div
      ref={ref}
      className={cn('relative flex flex-col gap-4 py-6', alignClasses[align], className)}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ color: textColor }}
    >
      {/* Badge */}
      {badge && (
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : undefined}
          transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/50 text-white text-sm font-bold border-2 border-white/70 shadow-[4px_4px_0_rgba(255,255,255,0.3)]">
            {icon}
            {badge}
          </span>
        </motion.div>
      )}
      
      {/* Title */}
      <div style={{ textShadow: `3px 3px 0 ${shadowColor}, -1px -1px 0 rgba(255,255,255,0.1)` }}>
        {TitleComponent[variant]()}
      </div>
      
      {/* Subtitle */}
      {subtitle && (
        <motion.p
          className="text-lg text-white/80 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : undefined}
          transition={{ delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

// Decorative arrows/chevrons for headers
export function HeaderDecoration({ 
  direction = 'both',
  className 
}: { 
  direction?: 'left' | 'right' | 'both';
  className?: string;
}) {
  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      {direction !== 'right' && (
        <motion.span
          className="text-white/80 font-bold"
          animate={{ x: [-2, 2, -2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ➤
        </motion.span>
      )}
      {direction !== 'right' && (
        <motion.span
          className="text-white/60 font-bold"
          animate={{ x: [-1, 1, -1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
        >
          ➤
        </motion.span>
      )}
      {direction !== 'left' && (
        <motion.span
          className="text-white/60 font-bold"
          animate={{ x: [1, -1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
        >
          ➤
        </motion.span>
      )}
      {direction !== 'left' && (
        <motion.span
          className="text-white/80 font-bold"
          animate={{ x: [2, -2, 2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ➤
        </motion.span>
      )}
    </div>
  );
}

// Feature bullets for headers
export function HeaderBullets({ 
  items,
  className 
}: { 
  items: string[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <div ref={ref} className={cn('flex flex-wrap justify-center gap-2', className)}>
      {items.map((item, i) => (
        <motion.span
          key={item}
          className="px-3 py-1 bg-black/40 text-white text-sm font-semibold border border-white/50"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.2 + i * 0.1 }}
        >
          {item}
        </motion.span>
      ))}
    </div>
  );
}

// Complete section header with all decorations
interface FullSectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  bullets?: string[];
  icon?: ReactNode;
  variant?: 'default' | 'glitch' | 'stamped' | 'split';
  showDecoration?: boolean;
  className?: string;
}

export function FullSectionHeader({
  title,
  subtitle,
  badge,
  bullets,
  icon,
  variant = 'default',
  showDecoration = true,
  className,
}: FullSectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  return (
    <div ref={ref} className={cn('relative z-10 py-6 text-center', className)}>
      {/* Badge */}
      {badge && (
        <motion.div
          className="mb-4"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : undefined}
          transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/50 text-white text-base font-bold border-2 border-white/70 shadow-[4px_4px_0_rgba(255,255,255,0.3)]">
            {icon}
            {badge}
          </span>
        </motion.div>
      )}
      
      {/* Main title with brutalist styling */}
      <h2 
        className="text-4xl md:text-5xl font-black text-white mb-4 tracking-wider uppercase"
        style={{
          textShadow: '3px 3px 0 rgba(0,0,0,0.3), -1px -1px 0 rgba(255,255,255,0.1)',
          WebkitTextStroke: '1px rgba(255,255,255,0.3)',
        }}
      >
        {showDecoration && <span className="mr-2">▸</span>}
        {title}
        {showDecoration && <span className="ml-2">◂</span>}
      </h2>
      
      {/* Subtitle */}
      {subtitle && (
        <motion.p
          className="text-lg text-white/80 max-w-2xl mx-auto mb-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : undefined}
          transition={{ delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
      
      {/* Feature bullets */}
      {bullets && bullets.length > 0 && (
        <HeaderBullets items={bullets} className="mb-4" />
      )}
    </div>
  );
}

export default SectionHeader;