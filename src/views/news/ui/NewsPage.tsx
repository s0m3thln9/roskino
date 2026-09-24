import { getTranslations } from 'next-intl/server';
import { Header } from '@/widgets/header';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';

type NewsPageProps = {
  params: Promise<LocaleParams>;
};

export async function NewsPage({ params }: NewsPageProps) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'Navigation' });

  return (
    <>
      <Header tone="light" />
      <main className="page-gutter flex-1 pt-25">
        <h1>{t('news')}</h1>
      </main>
    </>
  );
}
