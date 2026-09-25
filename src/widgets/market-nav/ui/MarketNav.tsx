'use client';

import { MARKET_NAV_ITEMS } from '@/shared/config';
import { Link, usePathname } from '@/shared/i18n';
import { cn } from '@/shared/lib';

type MarketNavProps = {
  labels: Record<string, string>;
  className?: string;
};

export function MarketNav({ labels, className }: MarketNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex flex-wrap items-center gap-6 md:gap-10', className)}>
      {MARKET_NAV_ITEMS.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.key}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'typo-title transition-opacity',
              active ? '' : 'opacity-50 hover:opacity-80',
            )}
          >
            {labels[item.key]}
          </Link>
        );
      })}
    </nav>
  );
}
