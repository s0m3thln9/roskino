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
          'mx-auto flex w-full max-w-page flex-col gap-10 page-gutter lg:grid lg:grid-cols-[1fr_minmax(0,55.375rem)_1fr] lg:gap-x-0',
          news.cover ? 'pt-10 md:pt-20' : 'pt-30 md:pt-40',
        )}
      >
        <div className="-mb-5 flex items-start justify-between gap-6 lg:col-start-2">
          <span className="typo-text-3">{dateLabel}</span>
          {allNewsSlot}
        </div>

        {backSlot && (
          <div className="flex lg:col-start-1 lg:row-start-2 lg:mt-5 lg:self-start">{backSlot}</div>
        )}

        <Heading className="typo-headline-1 lg:col-start-2">{news.title}</Heading>

        <div className="flex flex-col gap-10 lg:col-start-2">
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
                  className="bg-linear-to-r from-grey/50 to-transparent perforated-edge px-5 py-7.5 typo-text-5 md:pr-10 md:pl-12.5"
                >
                  {block.text}
                </p>
              );
            }
            return (
              <figure key={index} className="relative flex gap-4 md:gap-5">
                <Icon
                  name="quote"
                  className="h-8 w-12 shrink-0 text-grey md:h-16 md:w-24 lg:absolute lg:top-0 lg:right-[calc(100%+1.25rem)]"
                />
                <div className="flex flex-col gap-5">
                  <blockquote className="typo-text-5 font-medium">{block.text}</blockquote>
                  <figcaption className="flex flex-col">
                    <span className="typo-text-5">{block.author}</span>
                    {block.position && (
                      <span className="typo-text-3 opacity-50">{block.position}</span>
                    )}
                  </figcaption>
                </div>
              </figure>
            );
          })}
        </div>

        {gallerySlot && <div className="lg:col-start-2">{gallerySlot}</div>}
      </div>
    </article>
  );
}
