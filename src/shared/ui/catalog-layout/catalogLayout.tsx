import { cn } from '@/shared/lib';
import { Skeleton } from '../skeleton';

export const catalogLayout = {
  root: 'flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16',
  filters: 'lg:w-[162px] lg:shrink-0',
  content: 'flex min-w-0 flex-1 flex-col gap-10',
} as const;

const FILTER_GROUPS = [2, 4, 8];

export function FiltersSkeleton({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('flex flex-col gap-8', catalogLayout.filters, className)}>
      {FILTER_GROUPS.map((count, group) => (
        <div key={group} className="flex flex-col gap-3">
          <Skeleton className="mb-2 h-4 w-32" />
          {Array.from({ length: count }, (_, index) => (
            <Skeleton key={index} className="h-4 w-24" />
          ))}
        </div>
      ))}
    </div>
  );
}
