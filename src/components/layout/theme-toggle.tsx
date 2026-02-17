'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative">
        <div className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <Sun
        className={`h-5 w-5 transition-all duration-300 ${
          theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ${
          theme === 'light' ? '-rotate-90 scale-0' : 'rotate-0 scale-100'
        }`}
      />
    </Button>
  );
}
