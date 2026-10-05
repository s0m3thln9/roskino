'use client';

import { useId, type InputHTMLAttributes } from 'react';
import { cn } from '@/shared/lib';
import { Icon } from '../icon';
import { fieldVariants } from './fieldVariants';

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> & {
  label: string;
  error?: boolean;
  onClear?: () => void;
  clearLabel?: string;
};

export function TextField({
  label,
  error = false,
  onClear,
  clearLabel,
  className,
  id,
  value,
  ...props
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hasValue = value !== undefined && String(value).length > 0;

  return (
    <div className={cn(fieldVariants({ error }), 'h-17', className)}>
      <input
        id={inputId}
        value={value}
        placeholder=" "
        aria-invalid={error || undefined}
        className="peer h-full min-w-0 flex-1 bg-transparent pt-5.5 pr-5 pl-5 typo-text-3 caret-turquoise outline-none"
        {...props}
      />
      <label
        htmlFor={inputId}
        className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 typo-text-3 text-black/50 transition-all peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-[0.625rem] peer-focus:leading-3 peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[0.625rem] peer-[:not(:placeholder-shown)]:leading-3 peer-[:not(:placeholder-shown)]:uppercase"
      >
        {label}
      </label>
      {onClear && hasValue && (
        <button
          type="button"
          onClick={onClear}
          aria-label={clearLabel}
          className="mr-5 hidden shrink-0 p-1 group-hover:inline-flex peer-focus:hidden"
        >
          <Icon name="clear" />
        </button>
      )}
    </div>
  );
}
