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
        'flex h-10 w-full items-center gap-3 border-b border-white/30 text-white',
        className,
      )}
    >
      <Icon name="search" className="shrink-0" />
      <input
        type="search"
        value={value}
        className="h-full min-w-0 flex-1 bg-transparent text-sm caret-pink outline-none placeholder:text-white/50 [&::-webkit-search-cancel-button]:hidden"
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
