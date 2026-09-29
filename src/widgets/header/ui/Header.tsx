import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { LocaleSwitch } from '@/features/switch-locale';
import { ROUTES } from '@/shared/config';
import { Link } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import { Logo } from '@/shared/ui';

type HeaderProps = {
  tone?: 'light' | 'dark';
};

export async function Header({ tone = 'light' }: HeaderProps) {
  const t = await getTranslations('Navigation');

  return (
    <header
      className={cn(
        'absolute inset-x-0 top-0 z-40 flex items-center justify-between gap-4 page-gutter py-5 md:py-10',
        tone === 'light' ? 'text-white' : 'text-black',
      )}
    >
      <Link href={ROUTES.about} aria-label={t('home')}>
        <Logo variant="ricm" className="h-6 w-[86px] md:h-8 md:w-[115px]" />
      </Link>
      <Suspense fallback={<span className="size-10" />}>
        <LocaleSwitch label={t('switchLocale')} />
      </Suspense>
    </header>
  );
}
