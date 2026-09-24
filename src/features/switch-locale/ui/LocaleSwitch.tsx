'use client';

import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { routing, usePathname, useRouter } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import { roundButtonVariants } from '@/shared/ui';

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
        roundButtonVariants({ variant: 'ghost' }),
        'typo-filter uppercase backdrop-blur-soft',
        className,
      )}
    >
      {nextLocale}
    </button>
  );
}
