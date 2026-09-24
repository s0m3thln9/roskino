import { getTranslations } from 'next-intl/server';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';

type ProgramPageProps = {
  params: Promise<LocaleParams>;
};

export async function ProgramPage({ params }: ProgramPageProps) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'Navigation' });

  return (
    <main className="flex-1 page-gutter pt-25">
      <h1>{t('program')}</h1>
    </main>
  );
}
