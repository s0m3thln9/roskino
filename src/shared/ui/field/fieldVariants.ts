import { cva, type VariantProps } from 'class-variance-authority';

export const fieldVariants = cva(
  'group relative flex w-full items-center overflow-hidden rounded-full border-2 border-transparent text-black transition-colors focus-within:border-solid focus-within:border-turquoise hover:border-dashed hover:border-black focus-within:hover:border-solid focus-within:hover:border-turquoise',
  {
    variants: {
      error: {
        true: 'bg-error',
        false: 'bg-white',
      },
    },
    defaultVariants: { error: false },
  },
);

export type FieldVariants = VariantProps<typeof fieldVariants>;
