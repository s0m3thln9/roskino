import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';
import { MarketNav } from '@/widgets/market-nav';
import { ProjectsCatalog, type ProjectsCatalogLabels } from '@/widgets/projects-catalog';

type ProjectsPageProps = {
  params: Promise<LocaleParams & { id?: string }>;
};

export async function generateProjectsMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'Navigation' });
  return { title: t('projects') };
}

async function buildLabels(): Promise<ProjectsCatalogLabels> {
  const t = await getTranslations({ locale: 'en', namespace: 'Market' });
  return {
    contentType: t('filterContentType'),
    genre: t('filterGenre'),
    reset: t('reset'),
    clear: t('clear'),
    loading: t('loading'),
    empty: t('empty'),
    error: t('error'),
    close: t('close'),
    paginationNav: t('paginationNav'),
    previous: t('previous'),
    next: t('next'),
    page: t('page'),
    play: t('play'),
    description: t('description'),
    stills: t('stills'),
    mainTrailer: t('mainTrailer'),
    otherProjects: t('otherProjects'),
    ageRating: t('ageRating'),
    length: t('length'),
    type: t('type'),
    genreLabel: t('genreLabel'),
    releaseInRussia: t('releaseInRussia'),
    status: t('status'),
    productionCompanies: t('productionCompanies'),
    directors: t('directors'),
    producers: t('producers'),
    writers: t('writers'),
    minutes: t('minutes'),
    addToFavorites: t('addToFavorites'),
    addedToFavorites: t('addedToFavorites'),
    favoritesError: t('favoritesError'),
  };
}

export async function ProjectsPage({ params }: ProjectsPageProps) {
  await resolveLocale(params);
  const { id } = await params;
  const [nav, labels] = await Promise.all([
    getTranslations({ locale: 'en', namespace: 'Navigation' }),
    buildLabels(),
  ]);

  return (
    <main className="mx-auto w-full max-w-page flex-1 page-gutter pb-20">
      <Suspense>
        <MarketNav
          labels={{
            participants: nav('participants'),
            projects: nav('projects'),
            program: nav('program'),
          }}
        />
      </Suspense>
      <h1 className="mt-6 mb-10 typo-headline-1">{nav('projects')}</h1>
      <Suspense fallback={<p className="typo-text-3">{labels.loading}</p>}>
        <ProjectsCatalog labels={labels} selectedId={id} />
      </Suspense>
    </main>
  );
}
