export function RootSkeleton() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      {/* Navbar Skeleton */}
      <div className="h-16 border-b border-border bg-bg-surface w-full flex items-center px-4 md:px-8 justify-between animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-muted rounded-none" />
          <div className="w-32 h-6 bg-muted rounded-none" />
        </div>
        <div className="hidden md:flex gap-6">
          <div className="w-16 h-4 bg-muted rounded-none" />
          <div className="w-16 h-4 bg-muted rounded-none" />
        </div>
        <div className="w-24 h-10 bg-muted rounded-none" />
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 animate-pulse">
        {/* Hero title skeleton */}
        <div className="w-3/4 h-16 sm:h-24 bg-muted rounded-none mb-6" />
        <div className="w-1/2 h-16 sm:h-24 bg-muted rounded-none mb-10" />
        
        {/* Hero description skeleton */}
        <div className="w-2/3 h-4 bg-muted rounded-none mb-2" />
        <div className="w-1/2 h-4 bg-muted rounded-none mb-10" />

        {/* Hero price box skeleton */}
        <div className="w-full sm:w-96 h-24 bg-muted/50 rounded-xl mb-10 border border-border" />
        
        {/* Hero button skeleton */}
        <div className="w-48 h-14 bg-muted rounded-none" />
      </div>
    </div>
  );
}
