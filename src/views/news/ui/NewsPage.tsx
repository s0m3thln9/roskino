import type { Metadata } from 'next';
import { getFormatter, getTranslations } from 'next-intl/server';
import { NewsArticle, NewsCard } from '@/entities/news';
import { getNews, getNewsItem } from '@/entities/news/server';
import { ROUTES } from '@/shared/config';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';
import { Icon, Pagination } from '@/shared/ui';
import { ArticleGallery } from '@/widgets/article-gallery';
import { Header } from '@/widgets/header';

type NewsPageProps = {
  params: Promise<LocaleParams>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateNewsMetadata({
  params,
}: Pick<NewsPageProps, 'params'>): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'Navigation' });
  return { title: t('news') };
}

export async function NewsPage({ params, searchParams }: NewsPageProps) {
  const locale = await resolveLocale(params);
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  const [list, t, nav, format] = await Promise.all([
    getNews(locale, page),
    getTranslations('News'),
    getTranslations('Navigation'),
    getFormatter({ locale }),
  ]);

  const featured =
    page === 1 && list.items[0] ? await getNewsItem(locale, list.items[0].slug) : null;
  const cards = featured ? list.items.slice(1) : list.items;
  const formatDate = (iso: string) => format.dateTime(new Date(iso), 'short');

  return (
    <>
      <Header tone={featured?.cover ? 'light' : 'dark'} />
      <main className="flex-1">
        {featured ? (
          <NewsArticle
            news={featured}
            dateLabel={formatDate(featured.publishedAt)}
            gallerySlot={
              <ArticleGallery
                photos={featured.photos}
                videos={featured.videos}
                labels={{
                  photo: t('photo'),
                  video: t('video'),
                  previous: t('previous'),
                  next: t('next'),
                }}
              />
            }
            className="pb-20"
          />
        ) : (
          <div className="mx-auto w-full max-w-page page-gutter pt-30">
            <h1 className="typo-headline-1">{nav('news')}</h1>
          </div>
        )}

        <section className="bg-black py-15 md:py-25">
          <div className="mx-auto flex max-w-page flex-col gap-10 page-gutter">
            <div className="flex items-center justify-between gap-4 text-white">
              <h2 className="typo-title uppercase">{t('listTitle')}</h2>
              <Icon name="search" aria-hidden />
            </div>

            <ul className="grid gap-5 md:grid-cols-2">
              {cards.map((item) => (
                <li key={item.id} className="contents">
                  <NewsCard news={item} dateLabel={formatDate(item.publishedAt)} />
                </li>
              ))}
            </ul>

            <Pagination
              page={list.page}
              totalPages={list.totalPages}
              buildHref={(value) => (value === 1 ? ROUTES.news : `${ROUTES.news}?page=${value}`)}
              labels={{
                nav: t('paginationNav'),
                previous: t('previous'),
                next: t('next'),
                page: (value) => `${t('page')} ${value}`,
              }}
              className="self-center text-white [&_a]:text-white/50 [&_a[aria-current]]:text-white"
            />
          </div>
        </section>
      </main>
    </>
  );
}
