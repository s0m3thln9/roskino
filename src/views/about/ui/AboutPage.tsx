import { getTranslations } from 'next-intl/server';
import { Header } from '@/widgets/header';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';

type AboutPageProps = {
  params: Promise<LocaleParams>;
};

export async function AboutPage({ params }: AboutPageProps) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'Navigation' });

  return (
    <>
      <Header tone="light" />
      <main className="page-gutter flex-1 pt-25">
        <h1>{t('about')}</h1>
      </main>
    </>
  );
}
