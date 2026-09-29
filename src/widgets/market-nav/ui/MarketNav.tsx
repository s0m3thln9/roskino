'use client';

import { participantApi, toParticipantsParams } from '@/entities/participant';
import { programApi, toProgramParams } from '@/entities/program-event';
import { projectApi, toProjectsParams } from '@/entities/project';
import { MARKET_NAV_ITEMS } from '@/shared/config';
import { Link, usePathname } from '@/shared/i18n';
import { cn } from '@/shared/lib';

type MarketNavProps = {
  labels: Record<string, string>;
  className?: string;
};

type MarketNavKey = (typeof MARKET_NAV_ITEMS)[number]['key'];

function usePrefetchSection(): (key: MarketNavKey) => void {
  const prefetchParticipants = participantApi.usePrefetch('getParticipants');
  const prefetchProjects = projectApi.usePrefetch('getProjects');
  const prefetchFilters = projectApi.usePrefetch('getFilters');
  const prefetchProgram = programApi.usePrefetch('getProgram');

  return (key) => {
    prefetchFilters();
    if (key === 'participants') prefetchParticipants(toParticipantsParams({}));
    if (key === 'projects') prefetchProjects(toProjectsParams({}));
    if (key === 'program') prefetchProgram(toProgramParams({}));
  };
}

export function MarketNav({ labels, className }: MarketNavProps) {
  const pathname = usePathname();
  const prefetch = usePrefetchSection();

  return (
    <nav className={cn('flex flex-wrap items-center gap-6 md:gap-10', className)}>
      {MARKET_NAV_ITEMS.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.key}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            onMouseEnter={() => prefetch(item.key)}
            onFocus={() => prefetch(item.key)}
            onTouchStart={() => prefetch(item.key)}
            className={cn(
              'typo-text-3 transition-colors',
              active
                ? 'text-black underline decoration-from-font'
                : 'text-black/50 hover:text-black',
            )}
          >
            {labels[item.key]}
          </Link>
        );
      })}
    </nav>
  );
}
