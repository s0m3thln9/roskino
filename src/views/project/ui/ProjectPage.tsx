import { getTranslations } from 'next-intl/server';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';

type ProjectPageProps = {
  params: Promise<LocaleParams & { id: string }>;
};

export async function ProjectPage({ params }: ProjectPageProps) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'Navigation' });

  return (
    <main className="page-gutter flex-1 pt-25">
      <h1>{t('projects')}</h1>
    </main>
  );
}
