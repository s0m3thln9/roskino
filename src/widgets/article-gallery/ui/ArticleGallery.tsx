'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ImageAsset, VideoAsset } from '@/shared/api';
import { cn } from '@/shared/lib';
import { Icon, RoundButton } from '@/shared/ui';

type ArticleGalleryProps = {
  photos: ImageAsset[];
  videos: VideoAsset[];
  labels: { photo: string; video: string; previous: string; next: string };
  className?: string;
};

export function ArticleGallery({ photos, videos, labels, className }: ArticleGalleryProps) {
  const [tab, setTab] = useState<'photo' | 'video'>(photos.length > 0 ? 'photo' : 'video');
  const [index, setIndex] = useState(0);

  const total = tab === 'photo' ? photos.length : videos.length;
  if (total === 0) return null;

  const photo = photos[Math.min(index, photos.length - 1)];
  const video = videos[Math.min(index, videos.length - 1)];

  const switchTab = (next: 'photo' | 'video') => {
    setTab(next);
    setIndex(0);
  };

  return (
    <section className={cn('flex flex-col gap-6', className)}>
      <div className="flex items-center gap-5">
        {photos.length > 0 && (
          <button
            type="button"
            onClick={() => switchTab('photo')}
            className={cn('typo-text-2 transition-opacity', tab === 'photo' ? '' : 'opacity-50')}
          >
            {labels.photo}
          </button>
        )}
        {videos.length > 0 && (
          <button
            type="button"
            onClick={() => switchTab('video')}
            className={cn('typo-text-2 transition-opacity', tab === 'video' ? '' : 'opacity-50')}
          >
            {labels.video}
          </button>
        )}
      </div>

      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
        {tab === 'photo' && photo && (
          <Image
            src={photo.url}
            alt={photo.alt}
            fill
            sizes="(max-width: 768px) 100vw, 886px"
            className="object-cover"
          />
        )}
        {tab === 'video' && video && (
          <video src={video.url} poster={video.poster?.url} controls className="size-full" />
        )}

        {total > 1 && (
          <>
            <RoundButton
              label={labels.previous}
              variant="glass"
              onClick={() => setIndex((value) => Math.max(0, value - 1))}
              className="absolute top-1/2 left-4 -translate-y-1/2"
            >
              <Icon name="arrow-back" />
            </RoundButton>
            <RoundButton
              label={labels.next}
              variant="glass"
              onClick={() => setIndex((value) => Math.min(total - 1, value + 1))}
              className="absolute top-1/2 right-4 -translate-y-1/2"
            >
              <Icon name="arrow-forward" />
            </RoundButton>
          </>
        )}
      </div>
    </section>
  );
}
