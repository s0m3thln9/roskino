import type { HTMLAttributes } from 'react';
import { cn } from '@/shared/lib';

export function Tag({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-pill bg-white px-6 pt-2.25 pb-2.75 typo-filter text-black',
        className,
      )}
      {...props}
    />
  );
}
