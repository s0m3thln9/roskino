import { useTranslations } from 'next-intl';
import { ROUTES } from '@/shared/config';
import { Link } from '@/shared/i18n';
import { Icon, roundButtonVariants } from '@/shared/ui';

export function NotFoundPage() {
  const t = useTranslations('NotFound');

  return (
    <main className="mx-auto flex w-full max-w-page flex-1 flex-col items-start justify-center gap-8 page-gutter py-40">
      <p className="typo-headline-1">404</p>
      <h1 className="max-w-text typo-title uppercase">{t('title')}</h1>
      <Link href={ROUTES.about} className="flex items-center gap-5">
        <span className={roundButtonVariants({ variant: 'muted' })}>
          <Icon name="arrow" />
        </span>
        <span className="typo-link-1">{t('backHome')}</span>
      </Link>
    </main>
  );
}
