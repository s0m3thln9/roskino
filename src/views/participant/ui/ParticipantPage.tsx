import { getTranslations } from 'next-intl/server';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';

type ParticipantPageProps = {
  params: Promise<LocaleParams & { id: string }>;
};

export async function ParticipantPage({ params }: ParticipantPageProps) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'Navigation' });

  return (
    <main className="flex-1">
      <h1>{t('participants')}</h1>
    </main>
  );
}
