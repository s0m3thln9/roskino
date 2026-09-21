import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib';

export const roundButtonVariants = cva(
  'inline-flex size-10 shrink-0 items-center justify-center rounded-pill transition-colors disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        muted: 'bg-grey/50 text-black hover:bg-grey active:bg-grey',
        glass: 'bg-white/75 text-black backdrop-blur-glass hover:bg-white active:bg-white',
        ghost: 'bg-transparent text-black hover:bg-grey/50 active:bg-grey/50',
        solid: 'bg-white text-black hover:bg-grey active:bg-grey',
      },
      active: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [{ variant: 'ghost', active: true, className: 'bg-grey/50' }],
    defaultVariants: { variant: 'muted', active: false },
  },
);

export type RoundButtonVariants = VariantProps<typeof roundButtonVariants>;

type RoundButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  RoundButtonVariants & { label: string };

export function RoundButton({
  variant,
  active,
  label,
  className,
  type = 'button',
  children,
  ...props
}: RoundButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(roundButtonVariants({ variant, active }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
