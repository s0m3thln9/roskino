import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { LocaleSwitch } from '@/features/switch-locale';
import { ROUTES } from '@/shared/config';
import { featureFlags } from '@/shared/config/server';
import { Link } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import { Logo } from '@/shared/ui';
import { NAV_ITEMS } from '../model/nav';
import { MainNav } from './MainNav';

type HeaderProps = {
  tone?: 'light' | 'dark';
};

export async function Header({ tone = 'light' }: HeaderProps) {
  const t = await getTranslations('Navigation');
  const items = NAV_ITEMS.filter((item) => item.key !== 'archive' || featureFlags.archive);
  const labels = Object.fromEntries(items.map((item) => [item.key, t(item.key)]));

  return (
    <header
      className={cn(
        'absolute inset-x-0 top-0 z-40 flex items-center justify-between gap-4 page-gutter py-5 md:py-10',
        tone === 'light' ? 'text-white' : 'text-black',
      )}
    >
      <div className="flex items-center gap-4">
        <Link href={ROUTES.about} aria-label={t('home')}>
          <Logo variant="ricm" className="h-6 w-[86px] md:h-8 md:w-[115px]" />
        </Link>
        <MainNav items={items} labels={labels} menuLabel={t('menu')} />
      </div>
      <Suspense fallback={<span className="size-10" />}>
        <LocaleSwitch label={t('switchLocale')} />
      </Suspense>
    </header>
  );
}
