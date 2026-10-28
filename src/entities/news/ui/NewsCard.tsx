import Image from 'next/image';
import { ROUTES } from '@/shared/config';
import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui';
import type { NewsPreview } from '../model/schema';
import { NewsCardText } from './NewsCardText';

type NewsCardProps = {
  news: NewsPreview;
  dateLabel: string;
  className?: string;
};

export function NewsCard({ news, dateLabel, className }: NewsCardProps) {
  return (
    <article
      className={cn(
        'group relative flex min-h-[560px] flex-col',
        news.cover ? 'bg-white' : 'bg-apricot',
        className,
      )}
    >
      {news.cover && (
        <div className="relative h-50 w-full overflow-hidden md:h-[220px]">
          <Image
            src={news.cover.url}
            alt={news.cover.alt}
            fill
            sizes="(max-width: 768px) 100vw, 433px"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4 px-10 py-6 md:p-7.5">
        <NewsCardText
          href={ROUTES.newsItem(news.slug)}
          title={news.title}
          excerpt={news.excerpt}
          totalLines={news.cover ? 8 : 13}
        />
        <div className="mt-auto flex items-center justify-between gap-4">
          <span className="typo-text-3 text-black/50">{dateLabel}</span>
          <Icon
            name="open"
            className="transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1 max-md:-mr-5"
          />
        </div>
      </div>
    </article>
  );
}
