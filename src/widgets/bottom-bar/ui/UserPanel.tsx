'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
import type { User } from '@/entities/session';
import { LogoutButton, type LogoutLabels } from '@/features/logout';
import { MARKET_NAV_ITEMS } from '@/shared/config';
import { Link, usePathname } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui';

type UserPanelProps = {
  user: User;
  labels: {
    welcome: string;
    market: string;
    participants: string;
    projects: string;
    program: string;
  };
  logoutLabels: LogoutLabels;
};

const canHover = () => window.matchMedia('(hover: hover)').matches;

export function UserPanel({ user, labels, logoutLabels }: UserPanelProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => canHover() && setOpen(true)}
      onMouseLeave={() => canHover() && setOpen(false)}
    >
      <div
        id={menuId}
        hidden={!open}
        className="absolute bottom-full left-0 w-72.5 max-w-full pb-2 max-md:pb-1"
      >
        <nav aria-label={labels.market} className="rounded-md bg-dark-grey py-1">
          <ul>
            {MARKET_NAV_ITEMS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex h-15 items-center gap-6 pr-6 pl-7 text-white transition-opacity hover:opacity-100',
                      active ? 'opacity-100' : 'opacity-50',
                    )}
                  >
                    <span className="typo-subtitle leading-6 whitespace-nowrap">
                      {labels[item.key]}
                    </span>
                    {active && <Icon name="check-checked" className="ml-auto size-3" />}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-1 border-t border-dashed border-white/40 pt-1">
            <LogoutButton
              labels={logoutLabels}
              className="flex h-14 w-full items-center pr-6 pl-7 typo-text-3 text-white opacity-50 transition-opacity hover:opacity-100"
            />
          </div>
        </nav>
      </div>

      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="flex h-20 w-[min(25.125rem,calc(100vw-7.75rem))] min-w-0 overflow-hidden rounded-md bg-dark-grey/75 text-left text-white backdrop-blur-glass transition-colors hover:bg-dark-grey aria-expanded:bg-dark-grey md:w-[min(25.125rem,calc(100vw-9.125rem))]"
      >
        <span className="relative flex size-20 shrink-0 items-center justify-center bg-white/10 max-md:hidden">
          {user.avatar ? (
            <Image src={user.avatar.url} alt="" fill sizes="80px" className="object-cover" />
          ) : (
            <Icon name="avatar-default" className="size-10" />
          )}
        </span>
        <span className="flex min-w-0 flex-1 flex-col justify-center gap-1 px-5">
          <span className="truncate typo-text-7 text-white/50">{labels.welcome}</span>
          <span className="truncate typo-text-5">{user.name}</span>
        </span>
      </button>
    </div>
  );
}
