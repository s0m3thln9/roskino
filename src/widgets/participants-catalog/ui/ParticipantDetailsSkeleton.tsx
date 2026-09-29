import { Skeleton } from '@/shared/ui';

export function ParticipantDetailsSkeleton() {
  return (
    <div aria-hidden className="flex flex-col gap-10">
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-15">
        <div className="flex flex-col gap-10 lg:w-88 lg:shrink-0">
          <Skeleton className="size-35 rounded-full" />
          <div className="flex flex-col gap-3">
            <Skeleton className="h-7 w-56" />
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-64" />
            <Skeleton className="h-5 w-48" />
          </div>
        </div>
        <div className="flex gap-8 lg:pt-45">
          <Skeleton className="size-20 shrink-0 rounded-full" />
          <div className="flex flex-col gap-3">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-5 w-72" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-2/3" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-10 w-28 rounded-pill" />
        <Skeleton className="h-10 w-28 rounded-pill" />
      </div>
    </div>
  );
}
