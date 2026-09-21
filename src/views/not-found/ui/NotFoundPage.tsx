import { useTranslations } from 'next-intl';
import { ROUTES } from '@/shared/config';
import { Link } from '@/shared/i18n';

export function NotFoundPage() {
  const t = useTranslations('NotFound');

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1>{t('title')}</h1>
      <Link href={ROUTES.about}>{t('backHome')}</Link>
    </main>
  );
}
