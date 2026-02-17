import { Card } from '@/components/ui/card';

export function ProjectCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-muted animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
            <div className="h-3 w-1/2 bg-muted rounded animate-pulse" />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-muted rounded animate-pulse" />
          <div className="h-3 w-2/3 bg-muted rounded animate-pulse" />
        </div>

        {/* Topics */}
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-muted rounded-full animate-pulse" />
          <div className="h-5 w-12 bg-muted rounded-full animate-pulse" />
          <div className="h-5 w-14 bg-muted rounded-full animate-pulse" />
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="h-3 w-16 bg-muted rounded animate-pulse" />
          <div className="h-3 w-12 bg-muted rounded animate-pulse" />
          <div className="h-3 w-12 bg-muted rounded animate-pulse" />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 px-5 py-3 bg-muted/30 border-t">
        <div className="h-8 w-20 bg-muted rounded animate-pulse" />
        <div className="h-8 w-8 bg-muted rounded animate-pulse ml-auto" />
      </div>
    </Card>
  );
}
