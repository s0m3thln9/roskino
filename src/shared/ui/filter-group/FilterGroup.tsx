import type { ReactNode } from 'react';
import { cn } from '@/shared/lib';

type FilterGroupProps = {
  legend: string;
  shortLegend?: string;
  children: ReactNode;
  className?: string;
};

export function FilterGroup({ legend, shortLegend, children, className }: FilterGroupProps) {
  return (
    <fieldset className={cn('min-w-0', className)}>
      <legend className="mb-5 text-base leading-6 text-black lg:text-sm">
        {shortLegend ? (
          <>
            <span className="lg:hidden">{shortLegend}</span>
            <span className="max-lg:hidden">{legend}</span>
          </>
        ) : (
          legend
        )}
      </legend>
      <div className="flex flex-col gap-3">{children}</div>
    </fieldset>
  );
}
