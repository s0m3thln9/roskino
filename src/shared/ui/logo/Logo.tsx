import Image from 'next/image';
import { cn } from '@/shared/lib';
import ricmLogo from '../../assets/logos/ricm.svg';
import roskinoLogo from '../../assets/logos/roskino.svg';

const LOGOS = {
  ricm: {
    src: ricmLogo,
    width: 115,
    height: 32,
    alt: 'RICM — Russian International Content Market',
  },
  roskino: { src: roskinoLogo, width: 129, height: 28, alt: 'ROSKINO' },
} as const;

type LogoProps = {
  variant: keyof typeof LOGOS;
  className?: string;
  priority?: boolean;
};

export function Logo({ variant, className, priority }: LogoProps) {
  const logo = LOGOS[variant];
  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      priority={priority}
      className={cn('h-auto', className)}
    />
  );
}
