import { getImageProps } from 'next/image';
import { MEDIA_QUERIES } from '@/shared/config';
import { cn } from '@/shared/lib';

const IMAGE = {
  alt: '',
  fill: true,
  sizes: '100vw',
  loading: 'eager',
  fetchPriority: 'high',
} as const;

export function KeyVisual({ className }: { className?: string }) {
  const desktop = getImageProps({ ...IMAGE, src: '/images/kv-banner.jpg' }).props;
  const mobile = getImageProps({ ...IMAGE, src: '/images/kv-banner-mobile.jpg' }).props;

  return (
    <picture>
      <source media={MEDIA_QUERIES.md} srcSet={desktop.srcSet} sizes={desktop.sizes} />
      <img {...mobile} alt="" className={cn('object-cover', className)} />
    </picture>
  );
}
