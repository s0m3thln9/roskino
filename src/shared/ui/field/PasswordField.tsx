'use client';

import { useState, type InputHTMLAttributes } from 'react';
import { cn } from '@/shared/lib';
import { Icon } from '../icon';
import { fieldVariants } from './fieldVariants';

type PasswordFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  error?: boolean;
  defaultVisible?: boolean;
  labels: { show: string; hide: string };
};

export function PasswordField({
  error = false,
  defaultVisible = false,
  labels,
  className,
  ...props
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(defaultVisible);

  return (
    <div className={cn(fieldVariants({ error }), 'h-15', className)}>
      <input
        type={visible ? 'text' : 'password'}
        aria-invalid={error || undefined}
        className="h-full min-w-0 flex-1 bg-transparent pl-5 typo-text-3 caret-pink outline-none placeholder:text-black/50"
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((value) => !value)}
        aria-label={visible ? labels.hide : labels.show}
        aria-pressed={visible}
        className="mr-3 flex size-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-apricot active:bg-apricot"
      >
        <Icon name={visible ? 'show' : 'hide'} className="size-6" />
      </button>
    </div>
  );
}
