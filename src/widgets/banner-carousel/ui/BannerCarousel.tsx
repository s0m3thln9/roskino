'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Banner } from '@/entities/banner';
import { Link } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import { SlideIndicator } from '@/shared/ui';

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

  const content = (
    <>
      <Image
        src={banner.image.url}
        alt={banner.image.alt || banner.title}
        fill
        sizes="100vw"
        priority={active === 0}
        className="object-cover"
      />
      <span className="absolute right-0 bottom-10 left-0 page-gutter typo-title text-white uppercase drop-shadow-lg md:bottom-15">
        {banner.title}
      </span>
    </>
  );

  return (
    <section
      className={cn(
        'relative h-[360px] w-full overflow-hidden md:h-[520px] lg:h-[700px]',
        className,
      )}
    >
      {isExternal ? (
        <a href={banner.href} target="_blank" rel="noreferrer" className="absolute inset-0 block">
          {content}
        </a>
      ) : (
        <Link href={banner.href} className="absolute inset-0 block">
          {content}
        </Link>
      )}
      <SlideIndicator
        count={banners.length}
        activeIndex={active}
        onSelect={setActive}
        getLabel={(index) => `${slideLabelPrefix} ${index + 1}`}
        className="absolute top-10 right-4 bottom-10 md:right-10 lg:right-[163px]"
      />
    </section>
  );
}
