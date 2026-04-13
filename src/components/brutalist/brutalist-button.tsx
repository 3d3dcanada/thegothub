'use client';

import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BrutalistButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  asChild?: boolean;
}

const variantStyles = {
  primary: {
    bg: '#6366F1',
    border: '#000',
    shadow: '#000',
    text: '#fff',
    hoverBg: '#4F46E5',
  },
  secondary: {
    bg: '#F4F4F5',
    border: '#000',
    shadow: '#000',
    text: '#000',
    hoverBg: '#E4E4E7',
  },
  accent: {
    bg: '#FFD700',
    border: '#000',
    shadow: '#000',
    text: '#000',
    hoverBg: '#FFC700',
  },
  outline: {
    bg: 'transparent',
    border: '#000',
    shadow: '#000',
    text: '#000',
    hoverBg: '#F4F4F5',
  },
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function BrutalistButton({
  children,
  onClick,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
}: BrutalistButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const styles = variantStyles[variant];
  
  return (
    <motion.button
      className={cn(
        'relative font-bold uppercase tracking-wide',
        'border-4 transition-colors',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeStyles[size],
        className
      )}
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      animate={{
        x: isPressed ? 4 : 0,
        y: isPressed ? 4 : 0,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      style={{
        backgroundColor: styles.bg,
        borderColor: styles.border,
        color: styles.text,
        boxShadow: isPressed 
          ? 'none' 
          : `4px 4px 0 ${styles.shadow}`,
      }}
    >
      {children}
      
      {/* Noise texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </motion.button>
  );
}

// Icon button variant
export function BrutalistIconButton({
  children,
  onClick,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
}: BrutalistButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const styles = variantStyles[variant];
  
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };
  
  return (
    <motion.button
      className={cn(
        'relative flex items-center justify-center',
        'border-4 transition-colors',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeMap[size],
        className
      )}
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      animate={{
        x: isPressed ? 2 : 0,
        y: isPressed ? 2 : 0,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      style={{
        backgroundColor: styles.bg,
        borderColor: styles.border,
        color: styles.text,
        boxShadow: isPressed 
          ? 'none' 
          : `3px 3px 0 ${styles.shadow}`,
      }}
    >
      {children}
    </motion.button>
  );
}

// Link-style button
export function BrutalistLink({
  children,
  href,
  className,
  external = false,
}: {
  children: ReactNode;
  href: string;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'relative inline-flex items-center gap-1',
        'font-bold uppercase tracking-wide',
        'border-b-4 border-current',
        'hover:bg-black hover:text-white',
        'px-1 py-0.5 transition-colors',
        className
      )}
    >
      {children}
    </a>
  );
}