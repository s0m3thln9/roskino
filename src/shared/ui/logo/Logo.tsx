import type { CSSProperties } from 'react';
import { cn } from '@/shared/lib';

const LOGOS = {
  ricm: {
    file: 'ricm',
    width: 115,
    height: 32,
    label: 'RICM — Russian International Content Market',
  },
  roskino: { file: 'roskino', width: 129, height: 28, label: 'ROSKINO' },
} as const;

type LogoProps = {
  variant: keyof typeof LOGOS;
  className?: string;
};

export function Logo({ variant, className }: LogoProps) {
  const logo = LOGOS[variant];
  const url = `url(/logos/${logo.file}.svg)`;
  const style = {
    '--logo-width': `${logo.width}px`,
    '--logo-height': `${logo.height}px`,
    maskImage: url,
    WebkitMaskImage: url,
    maskSize: '100% 100%',
    WebkitMaskSize: '100% 100%',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
  } as CSSProperties;

  return (
    <span
      role="img"
      aria-label={logo.label}
      style={style}
      className={cn(
        'inline-block h-(--logo-height) w-(--logo-width) shrink-0 bg-current',
        className,
      )}
    />
  );
}
