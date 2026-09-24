'use client';

import { useEffect, useRef, useState } from 'react';
import { Link, usePathname } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import { Icon, roundButtonVariants } from '@/shared/ui';
import type { NavItem } from '../model/nav';

type MainNavProps = {
  items: NavItem[];
  labels: Record<string, string>;
  menuLabel: string;
  className?: string;
};

export function MainNav({ items, labels, menuLabel, className }: MainNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

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

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={menuLabel}
        className={cn(
          roundButtonVariants({ variant: 'ghost', active: open }),
          'backdrop-blur-soft',
        )}
      >
        <Icon name="menu" className="size-6" />
      </button>

      <nav
        hidden={!open}
        aria-label={menuLabel}
        className="absolute top-12 left-0 z-50 w-72 rounded-md bg-[rgba(48,51,70,0.25)] py-1 backdrop-blur-glass"
      >
        <ul>
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex h-15 items-center gap-5 px-7 text-white transition-opacity hover:opacity-100',
                    active ? 'opacity-100' : 'opacity-50',
                    item.highlighted && 'text-violet opacity-100',
                  )}
                >
                  <Icon name={item.icon} className="size-6" />
                  <span className="typo-subtitle leading-6">{labels[item.key]}</span>
                  {active && <Icon name="check-checked" className="ml-auto size-3" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
