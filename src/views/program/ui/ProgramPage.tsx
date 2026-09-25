import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';
import { MarketNav } from '@/widgets/market-nav';
import { ProgramBoard, type ProgramLabels } from '@/widgets/program-board';

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
  };
}

export async function ProgramPage({ params }: ProgramPageProps) {
  await resolveLocale(params);
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
      <h1 className="mt-6 mb-10 typo-headline-1">{nav('program')}</h1>
      <Suspense fallback={<p className="typo-text-3">{labels.loading}</p>}>
        <ProgramBoard labels={labels} />
      </Suspense>
    </main>
  );
}
