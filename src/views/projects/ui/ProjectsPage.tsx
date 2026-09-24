import { getTranslations } from 'next-intl/server';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';

type ProjectsPageProps = {
  params: Promise<LocaleParams>;
};

export async function ProjectsPage({ params }: ProjectsPageProps) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'Navigation' });

  return (
    <main className="page-gutter flex-1 pt-25">
      <h1>{t('projects')}</h1>
    </main>
  );
}
