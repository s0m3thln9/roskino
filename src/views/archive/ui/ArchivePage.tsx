import { getTranslations } from 'next-intl/server';
import { Header } from '@/widgets/header';
import { notFound } from 'next/navigation';
import { featureFlags } from '@/shared/config/server';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';

type ArchivePageProps = {
  params: Promise<LocaleParams>;
};

export async function ArchivePage({ params }: ArchivePageProps) {
  if (!featureFlags.archive) notFound();
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'Navigation' });

  return (
    <>
      <Header tone="dark" />
      <main className="page-gutter flex-1 pt-25">
        <h1>{t('archive')}</h1>
      </main>
    </>
  );
}
