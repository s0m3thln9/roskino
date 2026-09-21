import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib';

export const buttonVariants = cva(
  'inline-flex h-15 min-w-0 items-center justify-center px-5 py-3 typo-button transition-colors disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        primary: 'bg-white text-black hover:bg-grey active:bg-grey',
        secondary:
          'border-2 border-white text-white hover:border-grey hover:text-grey active:border-grey active:text-grey',
      },
      width: {
        auto: '',
        fixed: 'w-full md:w-62.5',
        full: 'w-full',
      },
    },
    defaultVariants: { variant: 'primary', width: 'fixed' },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants;

export function Button({ variant, width, className, type = 'button', ...props }: ButtonProps) {
  return (
    <button type={type} className={cn(buttonVariants({ variant, width }), className)} {...props} />
  );
}
