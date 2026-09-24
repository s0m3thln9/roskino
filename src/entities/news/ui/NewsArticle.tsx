import Image from 'next/image';
import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui';
import type { NewsItem } from '../model/schema';

type NewsArticleProps = {
  news: NewsItem;
  dateLabel: string;
  headingLevel?: 'h1' | 'h2';
  backSlot?: React.ReactNode;
  allNewsSlot?: React.ReactNode;
  gallerySlot?: React.ReactNode;
  className?: string;
};

export function NewsArticle({
  news,
  dateLabel,
  headingLevel: Heading = 'h1',
  backSlot,
  allNewsSlot,
  gallerySlot,
  className,
}: NewsArticleProps) {
  return (
    <article className={cn('flex flex-col', className)}>
      {news.cover && (
        <div className="relative h-[280px] w-full overflow-hidden md:h-[520px] lg:h-[800px]">
          <Image
            src={news.cover.url}
            alt={news.cover.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      <div
        className={cn(
          'mx-auto flex w-full max-w-page flex-col gap-10 page-gutter',
          news.cover ? 'pt-10 md:pt-20' : 'pt-30 md:pt-40',
        )}
      >
        <div className="flex items-start justify-between gap-6">
          <span className="typo-text-3 text-black/50">{dateLabel}</span>
          {allNewsSlot}
        </div>

        <div className="flex gap-6">
          {backSlot}
          <Heading className="max-w-text typo-headline-1">{news.title}</Heading>
        </div>

        <div className="flex max-w-text flex-col gap-10">
          {news.blocks.map((block, index) => {
            if (block.type === 'paragraph') {
              return (
                <p key={index} className="typo-text-5">
                  {block.text}
                </p>
              );
            }
            if (block.type === 'highlight') {
              return (
                <p
                  key={index}
                  className="bg-linear-to-r from-grey/50 to-transparent px-5 py-5 typo-text-5 md:px-10"
                >
                  {block.text}
                </p>
              );
            }
            return (
              <figure key={index} className="relative flex flex-col gap-5">
                <Icon name="quote" className="h-8 w-12 text-grey md:h-16 md:w-24" />
                <blockquote className="typo-text-5 font-medium">{block.text}</blockquote>
                <figcaption className="flex flex-col">
                  <span className="typo-text-5">{block.author}</span>
                  {block.position && (
                    <span className="typo-text-3 opacity-50">{block.position}</span>
                  )}
                </figcaption>
              </figure>
            );
          })}
        </div>

        {gallerySlot}

        {news.credits.length > 0 && (
          <p className="typo-text-3 text-black/50">{news.credits.join(' · ')}</p>
        )}
      </div>
    </article>
  );
}
