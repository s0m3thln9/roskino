import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';
import { Hyphenated } from '@/shared/ui';
import { ProgramBoard, ProgramBoardSkeleton, type ProgramLabels } from '@/widgets/program-board';

type ProgramPageProps = {
  params: Promise<LocaleParams>;
};

export async function generateProgramMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'Navigation' });
  return { title: t('program') };
}

async function buildLabels(): Promise<ProgramLabels> {
  const t = await getTranslations({ locale: 'en', namespace: 'Market' });
  return {
    date: t('filterDate'),
    location: t('filterLocation'),
    room: t('filterRoom'),
    filterPanel: {
      title: t('filterTitle'),
      open: t('filterOpen'),
      apply: t('apply'),
      reset: t('reset'),
      resetButton: t('resetButton'),
      close: t('close'),
    },
    shortLegends: {
      date: t('legendDate'),
      location: t('legendLocation'),
      room: t('legendRoom'),
    },
    chips: { date: t('chipDate'), location: t('chipLocation'), room: t('chipRoom') },
    reset: t('reset'),
    clear: t('clear'),
    loading: t('loading'),
    empty: t('empty'),
    error: t('error'),
    expand: t('expandEvent'),
    participants: t('participants'),
    moderators: t('moderators'),
    description: t('description'),
    minutes: t('minutes'),
    categories: {
      plenary: t('programCategories.plenary'),
      presentation: t('programCategories.presentation'),
      screening: t('programCategories.screening'),
      pitching: t('programCategories.pitching'),
      business: t('programCategories.business'),
      'public-talk': t('programCategories.public-talk'),
      break: t('programCategories.break'),
    },
  };
}

export async function ProgramPage({ params }: ProgramPageProps) {
  await resolveLocale(params);
  const [nav, labels] = await Promise.all([
    getTranslations({ locale: 'en', namespace: 'Navigation' }),
    buildLabels(),
  ]);

  return (
    <main className="mx-auto w-full max-w-page flex-1 page-gutter pb-24 max-md:px-10 md:pb-[146px]">
      <h1 className="mt-8 mb-17 typo-headline-1 md:mt-5 md:mb-12 lg:mb-25 lg:pl-[14.125rem]">
        <Hyphenated text={nav('program')} />
      </h1>
      <Suspense fallback={<ProgramBoardSkeleton />}>
        <ProgramBoard labels={labels} />
      </Suspense>
    </main>
  );
}
