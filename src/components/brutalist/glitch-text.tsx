'use client';

import { useEffect, useState, useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p';
  glitchOnHover?: boolean;
  glitchOnView?: boolean;
  intensity?: 'subtle' | 'medium' | 'aggressive';
}

// Glitch effect with RGB split and displacement
export function GlitchText({
  children,
  className,
  as: Component = 'span',
  glitchOnHover = false,
  glitchOnView = true,
  intensity = 'medium',
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  
  const intensitySettings = {
    subtle: { duration: 0.1, skew: 2, translate: 2 },
    medium: { duration: 0.15, skew: 4, translate: 4 },
    aggressive: { duration: 0.2, skew: 8, translate: 8 },
  };
  
  const settings = intensitySettings[intensity];
  
  useEffect(() => {
    if (glitchOnView && isInView) {
      setIsGlitching(true);
      const timeout = setTimeout(() => setIsGlitching(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [isInView, glitchOnView]);
  
  // Random glitch intervals
  useEffect(() => {
    if (!glitchOnHover) {
      const interval = setInterval(() => {
        if (Math.random() > 0.95) {
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 100);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [glitchOnHover]);
  
  const glitchStyle = isGlitching
    ? {
        animation: `glitch ${settings.duration}s infinite`,
        textShadow: `
          ${settings.translate}px 0 #ff0000,
          -${settings.translate}px 0 #00ffff
        `,
        transform: `skewX(${(Math.random() - 0.5) * settings.skew}deg)`,
      }
    : {};
  
  return (
    <>
      <div
        ref={ref}
        className="relative inline-block"
      >
        <Component
          className={cn('relative', className)}
          style={glitchStyle}
          onMouseEnter={() => glitchOnHover && setIsGlitching(true)}
          onMouseLeave={() => glitchOnHover && setIsGlitching(false)}
        >
          {children}
          
          {/* Glitch layers */}
          {isGlitching && (
            <>
              <span
                className="absolute inset-0 text-red-500 opacity-70"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
                  transform: `translateX(-${settings.translate}px)`,
                }}
                aria-hidden
              >
                {children}
              </span>
              <span
                className="absolute inset-0 text-cyan-500 opacity-70"
                style={{
                  clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
                  transform: `translateX(${settings.translate}px)`,
                }}
                aria-hidden
              >
                {children}
              </span>
            </>
          )}
        </Component>
      </div>
      
      <style jsx>{`
        @keyframes glitch {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-1px); }
          80% { transform: translateX(1px); }
        }
      `}</style>
    </>
  );
}

// Brutalist text with heavy shadow
interface BrutalistTextProps {
  children: ReactNode;
  className?: string;
  shadowColor?: string;
  shadowOffset?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p';
  animated?: boolean;
}

export function BrutalistText({
  children,
  className,
  shadowColor = '#000',
  shadowOffset = 4,
  as: Component = 'span',
  animated = false,
}: BrutalistTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.span
      ref={ref}
      className={cn('relative inline-block', className)}
      initial={animated ? { opacity: 0, y: 20 } : undefined}
      animate={animated && isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        textShadow: `
          ${shadowOffset}px ${shadowOffset}px 0 ${shadowColor},
          ${shadowOffset * 2}px ${shadowOffset * 2}px 0 ${shadowColor}
        `,
      }}
    >
      <Component>{children}</Component>
    </motion.span>
  );
}

// Split text animation (reveals on scroll)
interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export function SplitText({ children, className, delay = 0 }: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const words = children.split(' ');
  
  return (
    <span ref={ref} className={cn('inline', className)}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              initial={{ y: '100%' }}
              animate={isInView ? { y: 0 } : undefined}
              transition={{
                duration: 0.5,
                delay: delay + wordIndex * 0.1 + charIndex * 0.03,
                ease: [0.33, 1, 0.68, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  );
}

// Stamped text effect (looks like a rubber stamp)
interface StampedTextProps {
  children: string;
  className?: string;
  color?: string;
  rotation?: number;
}

export function StampedText({
  children,
  className,
  color = '#FF0000',
  rotation = -3,
}: StampedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.span
      ref={ref}
      className={cn(
        'inline-block px-3 py-1 font-black uppercase tracking-wider',
        'border-4 border-current',
        className
      )}
      style={{
        color,
        borderColor: color,
        transform: `rotate(${rotation}deg)`,
      }}
      initial={{ scale: 1.5, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : undefined}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
      
      {/* Texture overlay for "stamped" look */}
      <span
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 2px,
            ${color} 2px,
            ${color} 4px
          )`,
        }}
      />
    </motion.span>
  );
}