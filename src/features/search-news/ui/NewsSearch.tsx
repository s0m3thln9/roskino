'use client';

import { useFormatter } from 'next-intl';
import { useEffect, useId, useRef, useState } from 'react';
import { NEWS_LOCALE, useSearchNewsQuery } from '@/entities/news';
import { ROUTES } from '@/shared/config';
import { Link } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import { Icon, SearchField } from '@/shared/ui';

export type NewsSearchLabels = {
  label: string;
  placeholder: string;
  clear: string;
  empty: string;
};

const DEBOUNCE_MS = 300;

export function NewsSearch({
  labels,
  className,
}: {
  labels: NewsSearchLabels;
  className?: string;
}) {
  const [value, setValue] = useState('');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const format = useFormatter();

  useEffect(() => {
    const timer = setTimeout(() => setQuery(value.trim()), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [value]);

  const { data } = useSearchNewsQuery({ lang: NEWS_LOCALE, query }, { skip: !query });
  const items = query && value.trim() ? data?.items : undefined;
  const expanded = open && items !== undefined;

  useEffect(() => {
    if (!expanded) return;
    const handlePointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('pointerdown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [expanded]);

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <SearchField
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onClear={() => {
          setValue('');
          setQuery('');
        }}
        clearLabel={labels.clear}
        placeholder={labels.placeholder}
        aria-label={labels.label}
        aria-expanded={expanded}
        aria-controls={listId}
        autoComplete="off"
      />
      {expanded && (
        <div
          id={listId}
          className="absolute inset-x-0 top-full z-10 mt-2 overflow-hidden rounded-[1.25rem] bg-dark-grey/75 backdrop-blur-glass md:mt-0 md:rounded-t-none md:rounded-b-xl"
        >
          {items.length > 0 ? (
            <ul>
              {items.map((item) => (
                <li
                  key={item.id}
                  className="border-t border-dashed border-white/40 first:border-t-0 max-md:nth-[n+6]:hidden"
                >
                  <Link
                    href={ROUTES.newsItem(item.slug)}
                    onClick={() => setOpen(false)}
                    className="flex h-13 items-center gap-5 pr-4 pl-5 typo-text-7 text-white/50 transition-colors outline-none hover:text-white focus-visible:text-white md:gap-10"
                  >
                    <span className="min-w-0 flex-1 truncate">{item.title}</span>
                    <time dateTime={item.publishedAt} className="max-md:hidden">
                      {format.dateTime(new Date(item.publishedAt), 'short')}
                    </time>
                    <Icon name="open" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="flex h-13 items-center px-5 typo-text-7 text-white/50">{labels.empty}</p>
          )}
        </div>
      )}
    </div>
  );
}
