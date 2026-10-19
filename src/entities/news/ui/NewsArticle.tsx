import Image from 'next/image';
import { cn } from '@/shared/lib';
import type { NewsItem } from '../model/schema';
import { QuoteSlider } from './QuoteSlider';

type NewsArticleProps = {
  news: NewsItem;
  dateLabel: string;
  labels: { previous: string; next: string };
  headingLevel?: 'h1' | 'h2';
  backSlot?: React.ReactNode;
  allNewsSlot?: React.ReactNode;
  gallerySlot?: React.ReactNode;
  className?: string;
};

export function NewsArticle({
  news,
  dateLabel,
  labels,
  headingLevel: Heading = 'h1',
  backSlot,
  allNewsSlot,
  gallerySlot,
  className,
}: NewsArticleProps) {
  const SubHeading = Heading === 'h1' ? 'h2' : 'h3';

  return (
    <article className={cn('flex flex-col overflow-x-clip', className)}>
      {news.cover && (
        <div className="relative h-120 w-full overflow-hidden md:h-[520px] lg:h-[800px]">
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
          'mx-auto flex w-full max-w-page flex-col gap-10 page-gutter max-md:px-10 lg:grid lg:grid-cols-[1fr_minmax(0,55.375rem)_1fr] lg:gap-x-0',
          news.cover ? 'pt-12.5 md:pt-20' : 'pt-30 md:pt-40',
        )}
      >
        {(backSlot || allNewsSlot) && (
          <div className="mb-7.5 flex items-center justify-between gap-6 md:hidden">
            {backSlot ?? <span />}
            {allNewsSlot}
          </div>
        )}

        <div className="-mb-4 flex items-start justify-between gap-6 md:-mb-5 lg:col-start-2">
          <span className="typo-text-3">{dateLabel}</span>
          {allNewsSlot && <div className="max-md:hidden">{allNewsSlot}</div>}
        </div>

        {backSlot && (
          <div className="flex max-md:hidden lg:col-start-1 lg:row-start-2 lg:mt-5 lg:self-start">
            {backSlot}
          </div>
        )}

        <Heading className="typo-headline-1 lg:col-start-2">{news.title}</Heading>

        <div className="flex flex-col gap-15 md:mt-5 lg:col-start-2">
          {news.blocks.map((block, index) => {
            if (block.type === 'paragraph') {
              return (
                <p
                  key={index}
                  className={cn(
                    'typo-text-5',
                    news.blocks[index - 1]?.type === 'paragraph' && '-mt-7',
                  )}
                >
                  {block.text}
                </p>
              );
            }
            if (block.type === 'highlight') {
              return (
                <section key={index} className="flex flex-col gap-6">
                  {block.title && <SubHeading className="typo-text-5">{block.title}</SubHeading>}
                  <p className="-mx-10 bg-gradient-news px-10 pt-5 pb-6 typo-text-5 md:mx-0 md:perforated-edge">
                    {block.text}
                  </p>
                </section>
              );
            }
            return (
              <QuoteSlider
                key={index}
                quotes={block.quotes}
                labels={{ previous: labels.previous, next: labels.next }}
              />
            );
          })}
        </div>

        {gallerySlot && <div className="mt-5 md:mt-10 lg:col-start-2">{gallerySlot}</div>}
      </div>
    </article>
  );
}
