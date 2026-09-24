'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { MediaItem, MediaType } from '@/entities/media';
import { useSearchParams } from 'next/navigation';
import { Link, usePathname } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import { Icon, PlayButton, RoundButton } from '@/shared/ui';

type MediaGalleryProps = {
  title: string;
  items: MediaItem[];
  years: number[];
  year: number;
  type: MediaType;
  labels: {
    photo: string;
    video: string;
    previous: string;
    next: string;
    play: string;
    empty: string;
  };
  showArchive: boolean;
  className?: string;
};

export function MediaGallery({
  title,
  items,
  years,
  year,
  type,
  labels,
  showArchive,
  className,
}: MediaGalleryProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const buildHref = ({ type: nextType, year: nextYear }: { type?: MediaType; year?: number }) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextType) params.set('media', nextType);
    if (nextYear) params.set('year', String(nextYear));
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex] ?? items[0];
  const yearIndex = years.indexOf(year);
  const previousYear = years[yearIndex + 1];
  const nextYear = years[yearIndex - 1];

  return (
    <section className={cn('flex flex-col gap-10 text-white', className)}>
      <h2 className="typo-headline-2">{title}</h2>

      <div className="flex flex-wrap items-center justify-between gap-6">
        <ul className="flex items-center gap-8">
          {(['photo', 'video'] as const).map((value) => (
            <li key={value}>
              <Link
                href={buildHref({ type: value })}
                aria-current={type === value ? 'true' : undefined}
                className={cn(
                  'typo-title uppercase transition-opacity',
                  type === value ? 'opacity-100' : 'opacity-50 hover:opacity-80',
                )}
              >
                {labels[value]}
              </Link>
            </li>
          ))}
        </ul>

        {showArchive && years.length > 1 && (
          <div className="flex items-center gap-4 md:gap-8">
            <Link
              href={previousYear ? buildHref({ year: previousYear }) : '#'}
              aria-disabled={!previousYear}
              aria-label={labels.previous}
              className={cn('p-0.5', !previousYear && 'pointer-events-none opacity-30')}
            >
              <Icon name="triangle-left" />
            </Link>
            {years.map((item) => (
              <Link
                key={item}
                href={buildHref({ year: item })}
                aria-current={item === year ? 'true' : undefined}
                className={cn('typo-title uppercase', item === year ? 'opacity-100' : 'opacity-50')}
              >
                {item}
              </Link>
            ))}
            <Link
              href={nextYear ? buildHref({ year: nextYear }) : '#'}
              aria-disabled={!nextYear}
              aria-label={labels.next}
              className={cn('p-0.5', !nextYear && 'pointer-events-none opacity-30')}
            >
              <Icon name="triangle-right" />
            </Link>
          </div>
        )}
      </div>

      {!active ? (
        <p className="typo-text-3 text-white/50">{labels.empty}</p>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
            {active.type === 'video' ? (
              <video
                key={active.id}
                src={active.video.url}
                poster={active.video.poster?.url}
                controls
                className="size-full object-cover"
              />
            ) : (
              <Image
                src={active.image.url}
                alt={active.image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 1280px"
                className="object-cover"
              />
            )}
          </div>

          {items.length > 1 && (
            <div className="flex items-center gap-4">
              <RoundButton
                label={labels.previous}
                variant="glass"
                onClick={() => setActiveIndex((index) => Math.max(0, index - 1))}
              >
                <Icon name="arrow-back" />
              </RoundButton>
              <ul className="flex flex-1 [scrollbar-width:none] gap-1 overflow-x-auto">
                {items.map((item, index) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-current={index === activeIndex ? 'true' : undefined}
                      className={cn(
                        'relative block size-25 overflow-hidden rounded-md border-2',
                        index === activeIndex ? 'border-white' : 'border-transparent',
                      )}
                    >
                      <Image
                        src={item.image.url}
                        alt={item.image.alt}
                        fill
                        sizes="100px"
                        className="object-cover"
                      />
                      {item.type === 'video' && (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <PlayButton label={labels.play} className="size-10" />
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
              <RoundButton
                label={labels.next}
                variant="glass"
                onClick={() => setActiveIndex((index) => Math.min(items.length - 1, index + 1))}
              >
                <Icon name="arrow-forward" />
              </RoundButton>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
