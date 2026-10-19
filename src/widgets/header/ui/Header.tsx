import { getLocale, getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { getSiteSettings } from '@/entities/site-settings/server';
import { LocaleSwitch } from '@/features/switch-locale';
import { ROUTES } from '@/shared/config';
import { Link } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import { Logo } from '@/shared/ui';

type HeaderProps = {
  tone?: 'light' | 'dark';
  showLogo?: boolean;
};

export async function Header({ tone = 'light', showLogo = true }: HeaderProps) {
  const locale = await getLocale();
  const [{ accreditation }, t] = await Promise.all([
    getSiteSettings(locale),
    getTranslations('Navigation'),
  ]);

  return (
    <header
      className={cn(
        'absolute inset-x-0 top-0 z-40 flex items-center justify-between gap-4 page-gutter py-5 md:py-10',
        tone === 'light' ? 'text-white' : 'text-black',
      )}
    >
      {showLogo ? (
        <Link href={ROUTES.about} aria-label={t('home')}>
          <Logo variant="ricm" className="h-5 w-[95px] md:h-7.5 md:w-[142px]" />
        </Link>
      ) : (
        <span />
      )}
      <div className="flex items-center gap-2.5">
        {accreditation && (
          <a
            href={accreditation.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center rounded-pill bg-[rgba(48,51,70,0.25)] px-5 typo-text-7 whitespace-nowrap text-white backdrop-blur-glass transition-colors hover:bg-dark-grey active:bg-dark-grey"
          >
            {accreditation.label}
          </a>
        )}
        <Suspense fallback={<span className="size-10" />}>
          <LocaleSwitch label={t('switchLocale')} />
        </Suspense>
      </div>
    </header>
  );
}
