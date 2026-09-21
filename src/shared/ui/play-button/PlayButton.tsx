import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib';
import { Icon } from '../icon';

type PlayButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { label: string };

export function PlayButton({ label, className, type = 'button', ...props }: PlayButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn('group relative inline-flex size-20 text-white', className)}
      {...props}
    >
      <Icon name="play" className="group-hover:hidden group-active:hidden" />
      <Icon
        name="play-hover"
        className="hidden group-hover:inline-block group-active:inline-block"
      />
    </button>
  );
}
