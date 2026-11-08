import type { Metadata } from 'next';
import { getFormatter, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { NEWS_LOCALE, NewsArticle, NewsCard } from '@/entities/news';
import { getNews, getNewsItem } from '@/entities/news/server';
import { NewsSearch } from '@/features/search-news';
import { ROUTES } from '@/shared/config';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';
import { Hyphenated, Pagination } from '@/shared/ui';
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
    getNews(NEWS_LOCALE, page),
    getTranslations('News'),
    getTranslations('Navigation'),
    getFormatter({ locale }),
  ]);

  if (page > list.totalPages) notFound();

  const featured =
    page === 1 && list.items[0] ? await getNewsItem(NEWS_LOCALE, list.items[0].slug) : null;
  const formatDate = (iso: string) => format.dateTime(new Date(iso), 'short');
  const cards = featured ? list.items.slice(1) : list.items;
  const showList = cards.length > 0 || list.totalPages > 1;

  return (
    <>
      <Header tone={featured?.cover ? 'light' : 'dark'} />
      <main className="flex-1">
        {featured ? (
          <NewsArticle
            news={featured}
            dateLabel={formatDate(featured.publishedAt)}
            labels={{ previous: t('previous'), next: t('next') }}
            gallerySlot={
              featured.photos.length > 0 || featured.videos.length > 0 ? (
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
              ) : undefined
            }
            className="pb-25 md:pb-37.5"
          />
        ) : (
          <div className="mx-auto w-full max-w-page page-gutter pt-30">
            <h1 className="typo-headline-1">
              <Hyphenated text={nav('news')} />
            </h1>
          </div>
        )}

        {showList && (
          <section className="bg-black pt-10 pb-25 md:py-25 lg:pb-35">
            <div className="mx-auto flex max-w-page flex-col gap-10 page-gutter max-md:px-10">
              <div className="mx-auto flex w-full max-w-text flex-col gap-10">
                <div className="relative z-10 flex flex-col gap-6 text-white md:flex-row md:items-center md:justify-between md:gap-10">
                  <h2 className="uppercase max-md:typo-headline-1 md:typo-title">
                    {t('listTitle')}
                  </h2>
                  <NewsSearch
                    labels={{
                      label: t('searchLabel'),
                      placeholder: t('searchPlaceholder'),
                      clear: t('searchClear'),
                      empty: t('searchEmpty'),
                    }}
                    className="md:max-w-175 md:flex-1"
                  />
                </div>

                <ul className="-mx-10 grid gap-3 md:mx-0 md:grid-cols-2 md:gap-5">
                  {cards.map((item) => (
                    <li key={item.id} className="contents">
                      <NewsCard news={item} dateLabel={formatDate(item.publishedAt)} />
                    </li>
                  ))}
                </ul>

                <Pagination
                  page={list.page}
                  totalPages={list.totalPages}
                  buildHref={(value) =>
                    value === 1 ? ROUTES.news : `${ROUTES.news}?page=${value}`
                  }
                  labels={{
                    nav: t('paginationNav'),
                    previous: t('previous'),
                    next: t('next'),
                    page: (value) => `${t('page')} ${value}`,
                  }}
                  tone="dark"
                  className="self-center"
                />
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
