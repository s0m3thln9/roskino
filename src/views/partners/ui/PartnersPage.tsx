import { getTranslations } from 'next-intl/server';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';

type PartnersPageProps = {
  params: Promise<LocaleParams>;
};

export async function PartnersPage({ params }: PartnersPageProps) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'Navigation' });

  return (
    <main className="flex-1">
      <h1>{t('partners')}</h1>
    </main>
  );
}
