import { getTranslations } from 'next-intl/server';
import { ROUTES } from '@/shared/config';
import { Link } from '@/shared/i18n';
import { Logo } from '@/shared/ui';

export async function MarketHeader() {
  const t = await getTranslations('Navigation');

  return (
    <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-between gap-4 page-gutter py-5 text-black md:py-10">
      <Link href={ROUTES.about} aria-label={t('home')}>
        <Logo variant="ricm" className="h-5 w-[95px] md:h-7.5 md:w-[142px]" />
      </Link>
    </header>
  );
}
