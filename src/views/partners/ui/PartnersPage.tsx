import { getTranslations } from 'next-intl/server';
import { Header } from '@/widgets/header';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';

type PartnersPageProps = {
  params: Promise<LocaleParams>;
};

export async function PartnersPage({ params }: PartnersPageProps) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'Navigation' });

  return (
    <>
      <Header tone="dark" />
      <main className="flex-1 page-gutter pt-25">
        <h1>{t('partners')}</h1>
      </main>
    </>
  );
}
