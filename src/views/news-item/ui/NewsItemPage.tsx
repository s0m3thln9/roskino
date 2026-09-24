import type { Metadata } from 'next';
import { getFormatter, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { NewsArticle } from '@/entities/news';
import { getNewsItem } from '@/entities/news/server';
import { ROUTES } from '@/shared/config';
import { Link } from '@/shared/i18n';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';
import { Icon, roundButtonVariants } from '@/shared/ui';
import { ArticleGallery } from '@/widgets/article-gallery';
import { Header } from '@/widgets/header';

type NewsItemPageProps = {
  params: Promise<LocaleParams & { slug: string }>;
};

export async function generateNewsItemMetadata({ params }: NewsItemPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const news = await getNewsItem(locale, slug);
  if (!news) return {};
  return {
    title: news.title,
    description: news.excerpt,
    openGraph: {
      title: news.title,
      description: news.excerpt,
      type: 'article',
      publishedTime: news.publishedAt,
      images: news.cover ? [{ url: news.cover.url }] : undefined,
    },
  };
}

export async function NewsItemPage({ params }: NewsItemPageProps) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const news = await getNewsItem(locale, slug);
  if (!news) notFound();

  const [t, format] = await Promise.all([getTranslations('News'), getFormatter({ locale })]);

  return (
    <>
      <Header tone={news.cover ? 'light' : 'dark'} />
      <main className="flex-1 pb-20">
        <NewsArticle
          news={news}
          dateLabel={format.dateTime(new Date(news.publishedAt), 'short')}
          backSlot={
            <Link
              href={ROUTES.news}
              aria-label={t('allNews')}
              className={roundButtonVariants({ variant: 'muted' })}
            >
              <Icon name="arrow" />
            </Link>
          }
          allNewsSlot={
            <Link href={ROUTES.news} className="typo-link-1 hover:opacity-70">
              {t('allNews')}
            </Link>
          }
          gallerySlot={
            <ArticleGallery
              photos={news.photos}
              videos={news.videos}
              labels={{
                photo: t('photo'),
                video: t('video'),
                previous: t('previous'),
                next: t('next'),
              }}
            />
          }
        />
      </main>
    </>
  );
}
