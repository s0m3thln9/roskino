import type { CSSProperties } from 'react';
import { cn } from '@/shared/lib';
import { RicmEnLogo } from './RicmEnLogo';
import { RicmLogo } from './RicmLogo';

const LOGOS = {
  ricm: {
    file: 'ricm',
    width: 142,
    height: 30,
    label: 'РМК — Российский международный кинорынок',
  },
  'ricm-en': {
    file: 'ricm-en',
    width: 145,
    height: 30,
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
  const sizeStyle = {
    '--logo-width': `${logo.width}px`,
    '--logo-height': `${logo.height}px`,
  } as CSSProperties;
  const sizeClassName = 'inline-block h-(--logo-height) w-(--logo-width) shrink-0';

  if (variant === 'ricm' || variant === 'ricm-en') {
    const InlineLogo = variant === 'ricm' ? RicmLogo : RicmEnLogo;
    return (
      <InlineLogo
        role="img"
        aria-label={logo.label}
        style={sizeStyle}
        className={cn(sizeClassName, className)}
      />
    );
  }

  const url = `url(/logos/${logo.file}.svg)`;
  const style = {
    ...sizeStyle,
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
      className={cn(sizeClassName, 'bg-current', className)}
    />
  );
}
