import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';
import {
  ParticipantsCatalog,
  ParticipantsCatalogSkeleton,
  type CatalogLabels,
} from '@/widgets/participants-catalog';

type ParticipantsPageProps = {
  params: Promise<LocaleParams & { id?: string }>;
};

export async function generateParticipantsMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'Navigation' });
  return { title: t('participants') };
}

export async function buildCatalogLabels(): Promise<CatalogLabels> {
  const t = await getTranslations({ locale: 'en', namespace: 'Market' });
  return {
    origin: t('filterOrigin'),
    contentType: t('filterContentType'),
    genre: t('filterGenre'),
    reset: t('reset'),
    clear: t('clear'),
    loading: t('loading'),
    empty: t('empty'),
    error: t('error'),
    close: t('close'),
    contentTypes: t('contentTypes'),
    achievements: t('achievements'),
    projects: t('projects'),
    country: t('country'),
    territory: t('territory'),
    paginationNav: t('paginationNav'),
    previous: t('previous'),
    next: t('next'),
    page: t('page'),
  };
}

export async function ParticipantsPage({ params }: ParticipantsPageProps) {
  await resolveLocale(params);
  const { id } = await params;
  const [nav, labels] = await Promise.all([
    getTranslations({ locale: 'en', namespace: 'Navigation' }),
    buildCatalogLabels(),
  ]);

  return (
    <main className="mx-auto w-full max-w-page flex-1 page-gutter pb-20">
      <h1 className="mt-5 mb-12 typo-headline-1 lg:mb-25 lg:pl-[14.125rem]">
        {nav('participants')}
      </h1>
      <Suspense fallback={<ParticipantsCatalogSkeleton />}>
        <ParticipantsCatalog labels={labels} selectedId={id} />
      </Suspense>
    </main>
  );
}
