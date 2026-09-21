import { getTranslations } from 'next-intl/server';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';

type AboutPageProps = {
  params: Promise<LocaleParams>;
};

export async function AboutPage({ params }: AboutPageProps) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'Navigation' });

  return (
    <main className="flex-1">
      <h1>{t('about')}</h1>
    </main>
  );
}
