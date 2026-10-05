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
  items: Record<MediaType, MediaItem[]>;
  years: number[];
  year: number;
  initialType: MediaType;
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
  initialType,
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
  const [type, setType] = useState(initialType);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const typeItems = items[type];
  const active = typeItems[activeIndex] ?? typeItems[0];
  const next = typeItems[activeIndex + 1];
  const selectType = (value: MediaType) => {
    setType(value);
    setActiveIndex(0);
    setPlayingId(null);
    const url = new URL(window.location.href);
    url.searchParams.set('media', value);
    window.history.replaceState(null, '', url);
  };
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
              <button
                type="button"
                onClick={() => selectType(value)}
                aria-pressed={type === value}
                className={cn(
                  'typo-title uppercase transition-opacity',
                  type === value ? 'text-red' : 'opacity-50 hover:opacity-80',
                )}
              >
                {labels[value]}
              </button>
            </li>
          ))}
        </ul>

        {showArchive && years.length > 1 && (
          <div className="flex items-center gap-4 md:gap-8">
            <Link
              href={previousYear ? buildHref({ year: previousYear }) : '#'}
              scroll={false}
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
                scroll={false}
                aria-current={item === year ? 'true' : undefined}
                className={cn('typo-title uppercase', item === year ? 'text-red' : 'opacity-50')}
              >
                {item}
              </Link>
            ))}
            <Link
              href={nextYear ? buildHref({ year: nextYear }) : '#'}
              scroll={false}
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
        <div className="relative left-1/2 mb-13 w-screen -translate-x-1/2">
          <div className="flex gap-2">
            <div className="relative aspect-[1277/682] w-[88.7%] shrink-0 overflow-hidden bg-black">
              {active.type === 'video' ? (
                playingId === active.id ? (
                  <video
                    key={active.id}
                    src={active.video.url}
                    controls
                    autoPlay
                    className="size-full object-cover"
                  />
                ) : (
                  <>
                    {active.video.poster && (
                      <Image
                        src={active.video.poster.url}
                        alt={active.video.poster.alt}
                        fill
                        sizes="90vw"
                        className="object-cover"
                      />
                    )}
                    <span className="absolute inset-0 flex items-center justify-center">
                      <PlayButton label={labels.play} onClick={() => setPlayingId(active.id)} />
                    </span>
                  </>
                )
              ) : (
                <Image
                  src={active.image.url}
                  alt={active.image.alt}
                  fill
                  sizes="90vw"
                  className="object-cover"
                />
              )}
            </div>
            {next && (
              <button
                type="button"
                aria-label={labels.next}
                onClick={() => setActiveIndex(activeIndex + 1)}
                className="relative aspect-[1277/682] w-[88.7%] shrink-0 overflow-hidden bg-black"
              >
                <Image
                  src={next.image.url}
                  alt=""
                  fill
                  sizes="20vw"
                  className="object-cover object-left"
                />
              </button>
            )}
          </div>

          {typeItems.length > 1 && (
            <div className="absolute bottom-0 left-1/2 flex w-fit max-w-full -translate-x-1/2 translate-y-1/2 items-center">
              <RoundButton
                label={labels.previous}
                variant="glass"
                disabled={activeIndex === 0}
                onClick={() => setActiveIndex((index) => Math.max(0, index - 1))}
                className="relative z-10 -mr-5"
              >
                <Icon name="arrow-back" />
              </RoundButton>
              <ul className="flex min-w-0 [scrollbar-width:none] gap-1 overflow-x-auto">
                {typeItems.map((item, index) => (
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
                    </button>
                  </li>
                ))}
              </ul>
              <RoundButton
                label={labels.next}
                variant="glass"
                disabled={activeIndex === typeItems.length - 1}
                onClick={() => setActiveIndex((index) => Math.min(typeItems.length - 1, index + 1))}
                className="relative z-10 -ml-5"
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
