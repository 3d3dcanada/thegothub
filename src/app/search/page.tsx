'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { ProjectCard } from '@/components/project/project-card';
import { ProjectCardSkeleton } from '@/components/project/project-card-skeleton';
import { Search, Filter, X, Loader2, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProjects } from '@/hooks/useProjects';
import { cn } from '@/lib/utils';

const LANGUAGES = [
  { name: 'All Languages', value: 'all' },
  { name: 'JavaScript', value: 'javascript' },
  { name: 'TypeScript', value: 'typescript' },
  { name: 'Python', value: 'python' },
  { name: 'Go', value: 'go' },
  { name: 'Rust', value: 'rust' },
  { name: 'Java', value: 'java' },
  { name: 'C++', value: 'cpp' },
  { name: 'Ruby', value: 'ruby' },
  { name: 'PHP', value: 'php' },
  { name: 'Swift', value: 'swift' },
];

const SORT_OPTIONS = [
  { name: 'Stars', value: 'stars' },
  { name: 'Forks', value: 'forks' },
  { name: 'Recently Updated', value: 'updated' },
];

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [language, setLanguage] = useState(searchParams.get('language') || 'all');
  const [sort, setSort] = useState<'stars' | 'forks' | 'updated'>(searchParams.get('sort') as 'stars' | 'forks' | 'updated' || 'stars');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [showFilters, setShowFilters] = useState(false);

  const { projects, isLoading, error, total, totalPages } = useProjects({
    query,
    language: language === 'all' ? undefined : language,
    sort,
    order: 'desc',
    page,
    perPage: 20,
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (language !== 'all') params.set('language', language);
    if (sort !== 'stars') params.set('sort', sort);
    if (page > 1) params.set('page', String(page));
    
    const newUrl = `/search?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
  }, [query, language, sort, page, router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const clearFilters = () => {
    setQuery('');
    setLanguage('all');
    setSort('stars');
    setPage(1);
  };

  const hasActiveFilters = query || language !== 'all' || sort !== 'stars';

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search repositories..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-12 pl-12 pr-4 text-lg"
              />
            </div>
            <Button type="submit" size="lg">
              Search
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(showFilters && 'bg-muted')}
            >
              <Filter className="h-5 w-5" />
            </Button>
          </form>
        </div>

        {/* Filters */}
        <div className={cn(
          'mb-6 p-4 bg-muted/30 rounded-lg transition-all',
          showFilters ? 'block' : 'hidden'
        )}>
          <div className="flex flex-wrap gap-6">
            {/* Language Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Language</label>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((lang) => (
                  <Button
                    key={lang.value}
                    variant={language === lang.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setLanguage(lang.value);
                      setPage(1);
                    }}
                  >
                    {lang.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Sort By</label>
              <div className="flex gap-2">
                {SORT_OPTIONS.map((option) => (
                  <Button
                    key={option.value}
                    variant={sort === option.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setSort(option.value as typeof sort);
                      setPage(1);
                    }}
                  >
                    {option.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="mt-4"
            >
              <X className="h-4 w-4 mr-1" />
              Clear filters
            </Button>
          )}
        </div>

        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            {query || language !== 'all' ? (
              <p className="text-muted-foreground">
                {total.toLocaleString()} results
                {query && <span> for &quot;{query}&quot;</span>}
                {language !== 'all' && <span> in {language}</span>}
              </p>
            ) : (
              <p className="text-muted-foreground">
                {total.toLocaleString()} repositories
              </p>
            )}
          </div>
        </div>

        {/* Results */}
        {error ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <AlertCircle className="h-16 w-16 text-destructive mb-4" />
            <h3 className="text-xl font-semibold mb-2">Failed to load projects</h3>
            <p className="text-muted-foreground mb-4">{error.message}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        ) : isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : projects.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={page === pageNum ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Search className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground mb-4">
              Try different keywords or filters
            </p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters}>
                Clear all filters
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
