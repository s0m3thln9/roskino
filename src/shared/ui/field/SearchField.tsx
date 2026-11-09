'use client';

import type { InputHTMLAttributes } from 'react';
import { cn } from '@/shared/lib';
import { Icon } from '../icon';

type SearchFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  onClear?: () => void;
  clearLabel?: string;
};

export function SearchField({ onClear, clearLabel, className, value, ...props }: SearchFieldProps) {
  const hasValue = value !== undefined && String(value).length > 0;

  return (
    <div
      className={cn(
        'flex h-10 w-full items-center gap-4 rounded-full bg-dark-grey/75 pr-3 pl-4 text-white backdrop-blur-glass md:h-auto md:gap-5 md:rounded-none md:border-b md:border-white/50 md:bg-transparent md:pr-3 md:pb-3 md:pl-0 md:backdrop-blur-none',
        className,
      )}
    >
      <Icon name="search" className="shrink-0" />
      <input
        type="search"
        value={value}
        className="h-full min-w-0 flex-1 appearance-none bg-transparent py-2.5 text-base leading-5 font-medium caret-turquoise outline-none placeholder:text-white/50 md:h-5 md:py-0 [&::-webkit-search-cancel-button]:hidden"
        {...props}
      />
      {onClear && hasValue && (
        <button type="button" onClick={onClear} aria-label={clearLabel} className="p-1">
          <Icon name="clear" />
        </button>
      )}
    </div>
  );
}
