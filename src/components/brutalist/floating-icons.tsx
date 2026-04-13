'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingIconProps {
  icon: LucideIcon;
  className?: string;
  color?: string;
  size?: number;
  delay?: number;
  x?: string;
  y?: string;
  interactive?: boolean;
}

// Single floating icon with parallax effect
export function FloatingIcon({
  icon: Icon,
  className,
  color = 'currentColor',
  size = 32,
  delay = 0,
  x = '0%',
  y = '0%',
  interactive = true,
}: FloatingIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  
  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const xSpring = useSpring(mouseX, springConfig);
  const ySpring = useSpring(mouseY, springConfig);
  
  // Transform based on mouse position
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-10, 10]);
  const translateX = useTransform(xSpring, [-0.5, 0.5], [-20, 20]);
  const translateY = useTransform(ySpring, [-0.5, 0.5], [-20, 20]);
  
  useEffect(() => {
    if (!interactive) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Normalized position relative to viewport center
      const normalizedX = (e.clientX - centerX) / window.innerWidth;
      const normalizedY = (e.clientY - centerY) / window.innerHeight;
      
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive, mouseX, mouseY]);
  
  return (
    <motion.div
      ref={ref}
      className={cn('absolute pointer-events-none', className)}
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 0.2, scale: 1 } : undefined}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.34, 1.56, 0.64, 1],
      }}
    >
      <motion.div
        style={{
          rotateX: interactive ? rotateX : 0,
          rotateY: interactive ? rotateY : 0,
          x: interactive ? translateX : 0,
          y: interactive ? translateY : 0,
        }}
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4 + delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Icon 
          size={size} 
          style={{ color }}
          strokeWidth={1.5}
        />
      </motion.div>
    </motion.div>
  );
}

// Container with multiple floating icons
interface FloatingIconsContainerProps {
  children: ReactNode;
  className?: string;
}

export function FloatingIconsContainer({ 
  children, 
  className 
}: FloatingIconsContainerProps) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {children}
    </div>
  );
}

// Preset icon configurations for sections
export const sectionIconPresets = {
  community: [
    { icon: 'Heart' as const, color: '#FF6B6B', x: '5%', y: '20%', size: 40, delay: 0 },
    { icon: 'Coffee' as const, color: '#FFD93D', x: '15%', y: '60%', size: 36, delay: 0.1 },
    { icon: 'Code2' as const, color: '#6BCB77', x: '85%', y: '25%', size: 44, delay: 0.2 },
    { icon: 'Sparkles' as const, color: '#4D96FF', x: '92%', y: '70%', size: 38, delay: 0.3 },
    { icon: 'Users' as const, color: '#9B59B6', x: '50%', y: '15%', size: 42, delay: 0.4 },
    { icon: 'Star' as const, color: '#F39C12', x: '75%', y: '85%', size: 34, delay: 0.5 },
  ],
  trending: [
    { icon: 'Zap' as const, color: '#FF6B6B', x: '8%', y: '30%', size: 44, delay: 0 },
    { icon: 'Flame' as const, color: '#FF8C42', x: '20%', y: '75%', size: 40, delay: 0.15 },
    { icon: 'Activity' as const, color: '#4ECDC4', x: '88%', y: '20%', size: 38, delay: 0.25 },
    { icon: 'Gauge' as const, color: '#95E1D3', x: '80%', y: '65%', size: 42, delay: 0.35 },
    { icon: 'Target' as const, color: '#F38181', x: '45%', y: '80%', size: 36, delay: 0.45 },
  ],
  topProjects: [
    { icon: 'Trophy' as const, color: '#FFD700', x: '10%', y: '25%', size: 46, delay: 0 },
    { icon: 'Crown' as const, color: '#FFA500', x: '25%', y: '70%', size: 40, delay: 0.1 },
    { icon: 'Medal' as const, color: '#CD7F32', x: '90%', y: '30%', size: 38, delay: 0.2 },
    { icon: 'Award' as const, color: '#FFD700', x: '75%', y: '75%', size: 44, delay: 0.3 },
  ],
  freeToUse: [
    { icon: 'Gift' as const, color: '#2ECC71', x: '12%', y: '35%', size: 42, delay: 0 },
    { icon: 'Unlock' as const, color: '#3498DB', x: '88%', y: '40%', size: 38, delay: 0.15 },
    { icon: 'CheckCircle' as const, color: '#27AE60', x: '50%', y: '75%', size: 40, delay: 0.3 },
  ],
};

// Animated icon that reacts to scroll
interface ScrollReactiveIconProps extends Omit<FloatingIconProps, 'children'> {
  scrollProgress?: number;
}

export function ScrollReactiveIcon({
  icon: Icon,
  scrollProgress = 0,
  ...props
}: ScrollReactiveIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  
  const scale = 1 + Math.sin(scrollProgress * Math.PI * 2) * 0.2;
  const rotation = Math.sin(scrollProgress * Math.PI * 4) * 15;
  
  return (
    <motion.div
      ref={ref}
      className="absolute pointer-events-none"
      style={{ left: props.x, top: props.y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 0.2, scale: 1 } : undefined}
      transition={{
        duration: 0.8,
        delay: props.delay || 0,
        ease: [0.34, 1.56, 0.64, 1],
      }}
    >
      <motion.div
        style={{ scale, rotate: rotation }}
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 4 + (props.delay || 0),
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Icon 
          size={props.size || 32} 
          style={{ color: props.color || 'currentColor' }}
          strokeWidth={1.5}
        />
      </motion.div>
    </motion.div>
  );
}
