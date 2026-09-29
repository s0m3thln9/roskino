import { cn } from '@/shared/lib';

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn('animate-pulse bg-grey/50', className)} />;
}

type SkeletonGridProps = {
  count: number;
  className?: string;
  itemClassName?: string;
};

export function SkeletonGrid({ count, className, itemClassName }: SkeletonGridProps) {
  return (
    <div aria-hidden className={className}>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} className={itemClassName} />
      ))}
    </div>
  );
}
