import Image from 'next/image';
import { ROUTES } from '@/shared/config';
import { Link } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui';
import type { NewsPreview } from '../model/schema';

type NewsCardProps = {
  news: NewsPreview;
  dateLabel: string;
  className?: string;
};

export function NewsCard({ news, dateLabel, className }: NewsCardProps) {
  return (
    <article
      className={cn(
        'group relative flex min-h-[420px] flex-col md:min-h-[560px]',
        news.cover ? 'bg-white' : 'bg-grey',
        className,
      )}
    >
      {news.cover && (
        <div className="relative h-[180px] w-full overflow-hidden md:h-[220px]">
          <Image
            src={news.cover.url}
            alt={news.cover.alt}
            fill
            sizes="(max-width: 768px) 100vw, 433px"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4 p-5 md:p-7.5">
        <h3 className="typo-title uppercase">
          <Link href={ROUTES.newsItem(news.slug)} className="before:absolute before:inset-0">
            {news.title}
          </Link>
        </h3>
        <p className="line-clamp-5 flex-1 typo-text-3 text-black">{news.excerpt}</p>
        <div className="flex items-center justify-between gap-4">
          <span className="typo-text-3 text-black/50">{dateLabel}</span>
          <Icon
            name="open"
            className="transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1"
          />
        </div>
      </div>
    </article>
  );
}
