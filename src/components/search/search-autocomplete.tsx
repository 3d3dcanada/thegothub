'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Clock, TrendingUp, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

interface SearchAutocompleteProps {
  className?: string;
}

const TRENDING_SEARCHES = [
  'react',
  'vue',
  'typescript',
  'machine learning',
  'docker',
  'kubernetes',
  'neural network',
  'cli tools',
];

export function SearchAutocomplete({ className }: SearchAutocompleteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Project[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Save search to recent
  const saveSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    const updated = [
      searchQuery,
      ...recentSearches.filter(s => s !== searchQuery)
    ].slice(0, 5);
    
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  }, [recentSearches]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/github/search?q=${encodeURIComponent(query)}&per_page=5`
        );
        const data = await response.json();
        setResults(data.projects || []);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      saveSearch(query.trim());
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  const handleResultClick = (project: Project) => {
    saveSearch(project.name);
    router.push(`/project/${project.platform}/${project.owner}/${project.name}`);
    setIsOpen(false);
    setQuery('');
  };

  const handleRecentClick = (search: string) => {
    setQuery(search);
    router.push(`/search?q=${encodeURIComponent(search)}`);
    setIsOpen(false);
  };

  const handleTrendingClick = (search: string) => {
    setQuery(search);
    router.push(`/search?q=${encodeURIComponent(search)}`);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalItems = results.length + (query ? 0 : recentSearches.length + TRENDING_SEARCHES.length);
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, totalItems - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0) {
        e.preventDefault();
        if (selectedIndex < results.length) {
          handleResultClick(results[selectedIndex]);
        } else {
          const recentAndTrending = [...recentSearches, ...TRENDING_SEARCHES];
          handleRecentClick(recentAndTrending[selectedIndex - results.length]);
        }
      } else {
        handleSubmit(e);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const showDropdown = isOpen && (query || recentSearches.length > 0 || TRENDING_SEARCHES.length > 0);

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search open source projects..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setSelectedIndex(-1);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            className="h-12 pl-12 pr-4 text-base bg-muted/50 border-0 focus-visible:ring-2"
          />
          {isLoading && (
            <Loader2 className="absolute right-4 top h-5 w-5 -translate-1/2-y-1/2 animate-spin text-muted-foreground" />
          )}
        </div>
      </form>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-xl shadow-xl z-[9999] max-h-96 overflow-y-auto">
          {/* Search Results */}
          {results.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground px-3 py-1.5">
                Repositories
              </div>
              {results.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => handleResultClick(project)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors',
                    selectedIndex === index ? 'bg-muted' : 'hover:bg-muted/50'
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{project.name}</div>
                    <div className="text-sm text-muted-foreground truncate">
                      {project.owner}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground shrink-0">
                    ⭐ {project.stars.toLocaleString()}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {!query && recentSearches.length > 0 && (
            <div className="p-2 border-t">
              <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                <Clock className="h-3 w-3" />
                Recent Searches
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={search}
                  onClick={() => handleRecentClick(search)}
                  className={cn(
                    'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors',
                    selectedIndex === results.length + index ? 'bg-muted' : 'hover:bg-muted/50'
                  )}
                >
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  {search}
                </button>
              ))}
            </div>
          )}

          {/* Trending Searches */}
          {!query && (
            <div className="p-2 border-t">
              <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                Trending Searches
              </div>
              <div className="flex flex-wrap gap-2 px-3 pb-2">
                {TRENDING_SEARCHES.map((search, index) => (
                  <button
                    key={search}
                    onClick={() => handleTrendingClick(search)}
                    className={cn(
                      'px-3 py-1.5 text-sm rounded-full transition-colors',
                      selectedIndex === results.length + recentSearches.length + index
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    )}
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
