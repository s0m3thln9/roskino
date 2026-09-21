import type { ReactNode } from 'react';
import { cn } from '@/shared/lib';

type FilterGroupProps = {
  legend: string;
  children: ReactNode;
  className?: string;
};

export function FilterGroup({ legend, children, className }: FilterGroupProps) {
  return (
    <fieldset className={cn('min-w-0', className)}>
      <legend className="mb-5 typo-text-7 text-black">{legend}</legend>
      <div className="flex flex-col gap-3">{children}</div>
    </fieldset>
  );
}
