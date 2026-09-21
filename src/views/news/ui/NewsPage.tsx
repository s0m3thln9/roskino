import { getTranslations } from 'next-intl/server';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';

type NewsPageProps = {
  params: Promise<LocaleParams>;
};

export async function NewsPage({ params }: NewsPageProps) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'Navigation' });

  return (
    <main className="flex-1">
      <h1>{t('news')}</h1>
    </main>
  );
}
