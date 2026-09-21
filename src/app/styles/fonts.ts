import { Inter, Unbounded } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

export const unbounded = Unbounded({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  variable: '--font-unbounded',
  display: 'swap',
});

export const fontVariables = `${inter.variable} ${unbounded.variable}`;
