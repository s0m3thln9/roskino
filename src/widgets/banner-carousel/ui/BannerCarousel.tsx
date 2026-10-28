'use client';

import { useState } from 'react';
import type { Banner } from '@/entities/banner';
import { Link } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import { AdaptiveImage, SlideIndicator } from '@/shared/ui';

type BannerCarouselProps = {
  banners: Banner[];
  slideLabelPrefix: string;
  className?: string;
};

export function BannerCarousel({ banners, slideLabelPrefix, className }: BannerCarouselProps) {
  const [active, setActive] = useState(0);
  if (banners.length === 0) return null;

  const banner = banners[active] ?? banners[0]!;
  const isExternal = banner.href.startsWith('http');
  const getLabel = (index: number) => `${slideLabelPrefix} ${index + 1}`;

  const content = (
    <AdaptiveImage
      key={banner.id}
      image={banner.image}
      alt={banner.image.alt || banner.title}
      fill
      sizes="100vw"
      loading={active === 0 ? 'eager' : undefined}
      fetchPriority={active === 0 ? 'high' : undefined}
      className="object-cover"
    />
  );

  return (
    <section
      className={cn('relative h-175 w-full overflow-hidden md:h-[520px] lg:h-[700px]', className)}
    >
      {isExternal ? (
        <a
          href={banner.href}
          target="_blank"
          rel="noreferrer"
          aria-label={banner.title}
          className="absolute inset-0 block"
        >
          {content}
        </a>
      ) : (
        <Link href={banner.href} aria-label={banner.title} className="absolute inset-0 block">
          {content}
        </Link>
      )}
      <SlideIndicator
        count={banners.length}
        activeIndex={active}
        onSelect={setActive}
        getLabel={getLabel}
        className="absolute right-10 bottom-10 max-md:hidden lg:right-[163px]"
      />
      <SlideIndicator
        count={banners.length}
        activeIndex={active}
        onSelect={setActive}
        getLabel={getLabel}
        orientation="horizontal"
        className="absolute inset-x-4 bottom-2 justify-center md:hidden"
      />
    </section>
  );
}
