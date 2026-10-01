'use client';

import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { routing, usePathname, useRouter } from '@/shared/i18n';
import { cn } from '@/shared/lib';

type LocaleSwitchProps = {
  label: string;
  className?: string;
};

export function LocaleSwitch({ label, className }: LocaleSwitchProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const nextLocale = routing.locales.find((item) => item !== locale) ?? routing.defaultLocale;
  const query = Object.fromEntries(searchParams.entries());

  const handleClick = () => {
    startTransition(() => {
      router.replace({ pathname, query }, { locale: nextLocale });
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-label={label}
      lang={nextLocale}
      className={cn(
        'inline-flex size-10 shrink-0 items-center justify-center rounded-full typo-filter text-current uppercase opacity-50 transition-colors hover:bg-[#e5e8e7] hover:text-black hover:opacity-100 disabled:pointer-events-none disabled:opacity-30',
        className,
      )}
    >
      {nextLocale}
    </button>
  );
}
