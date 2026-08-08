export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-md bg-[#1a2434] ${className}`} />;
}

export function CardSkeleton() {
  return (
    <div className="panel p-5 space-y-3">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-3 w-full" />
    </div>
  );
}
