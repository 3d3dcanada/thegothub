import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number | undefined | null): string {
  if (num === undefined || num === null) {
    return '0';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

export function getPlatformColor(platform: string): string {
  switch (platform) {
    case 'github':
      return '#181717';
    case 'gitlab':
      return '#FC6D26';
    case 'sourceforge':
      return '#FF6600';
    case 'bitbucket':
      return '#0052CC';
    default:
      return '#6B7280';
  }
}

export function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    JavaScript: '#F7DF1E',
    TypeScript: '#3178C6',
    Python: '#3776AB',
    Java: '#B07219',
    Go: '#00ADD8',
    Rust: '#DEA584',
    Ruby: '#CC342D',
    PHP: '#777BB4',
    'C++': '#F34B7D',
    C: '#555555',
    Swift: '#FA7343',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    Scala: '#DC322F',
    Elixir: '#6E4A7E',
  };
  return colors[language] || '#6B7280';
}
