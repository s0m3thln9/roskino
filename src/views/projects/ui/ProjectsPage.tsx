import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';
import {
  ProjectsCatalog,
  ProjectsCatalogSkeleton,
  type ProjectsCatalogLabels,
} from '@/widgets/projects-catalog';

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
    filterPanel: {
      title: t('filterTitle'),
      open: t('filterOpen'),
      apply: t('apply'),
      reset: t('reset'),
      resetButton: t('resetButton'),
      close: t('close'),
    },
    shortLegends: { contentType: t('legendContentType'), genre: t('legendGenre') },
    chips: { contentType: t('chipContentType'), genre: t('chipGenre') },
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
    productionYear: t('productionYear'),
    releaseInRussia: t('releaseInRussia'),
    status: t('status'),
    productionCompanies: t('productionCompanies'),
    directors: t('directors'),
    producers: t('producers'),
    writers: t('writers'),
    minutes: t('minutes'),
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
    <main className="mx-auto w-full max-w-page flex-1 page-gutter pb-20 max-md:px-10 max-md:pb-25">
      <h1 className="mt-8 mb-17 typo-headline-1 md:mt-5 md:mb-12 lg:mb-25 lg:pl-[14.125rem]">
        {nav('projects')}
      </h1>
      <Suspense fallback={<ProjectsCatalogSkeleton />}>
        <ProjectsCatalog labels={labels} selectedId={id} />
      </Suspense>
    </main>
  );
}
