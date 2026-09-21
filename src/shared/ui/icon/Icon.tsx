import type { CSSProperties } from 'react';
import { cn } from '@/shared/lib';
import { ICONS, type IconName } from './icons';

type IconProps = {
  name: IconName;
  className?: string;
  size?: number | readonly [number, number];
  label?: string;
};

function resolveSize(name: IconName, size: IconProps['size']): readonly [number, number] {
  if (typeof size === 'number') return [size, size];
  return size ?? ICONS[name];
}

export function Icon({ name, className, size, label }: IconProps) {
  const [width, height] = resolveSize(name, size);
  const url = `url(/icons/${name}.svg)`;
  const style = {
    '--icon-width': `${width}px`,
    '--icon-height': `${height}px`,
    maskImage: url,
    WebkitMaskImage: url,
    maskSize: '100% 100%',
    WebkitMaskSize: '100% 100%',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
  } as CSSProperties;

  return (
    <span
      className={cn(
        'inline-block h-(--icon-height) w-(--icon-width) shrink-0 bg-current',
        className,
      )}
      style={style}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
