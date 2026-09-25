'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useTransition } from 'react';
import { usePathname, useRouter } from '@/shared/i18n';

export type UrlFilters = {
  values: (key: string) => string[];
  has: (key: string, value: string) => boolean;
  toggle: (key: string, value: string, checked: boolean) => void;
  setSingle: (key: string, value: string | null) => void;
  reset: () => void;
  isEmpty: boolean;
  isPending: boolean;
  page: number;
  buildPageHref: (page: number) => string;
};

export function useUrlFilters(keys: readonly string[]): UrlFilters {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const push = useCallback(
    (params: URLSearchParams) => {
      params.delete('page');
      const query = params.toString();
      startTransition(() => {
        router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
      });
    },
    [pathname, router],
  );

  const values = useCallback(
    (key: string) => searchParams.getAll(key).filter(Boolean),
    [searchParams],
  );

  const toggle = useCallback(
    (key: string, value: string, checked: boolean) => {
      const params = new URLSearchParams(searchParams.toString());
      const next = new Set(params.getAll(key));
      if (checked) next.add(value);
      else next.delete(value);
      params.delete(key);
      next.forEach((item) => params.append(key, item));
      push(params);
    },
    [push, searchParams],
  );

  const setSingle = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(key);
      if (value) params.set(key, value);
      push(params);
    },
    [push, searchParams],
  );

  const reset = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    keys.forEach((key) => params.delete(key));
    push(params);
  }, [keys, push, searchParams]);

  const isEmpty = keys.every((key) => searchParams.getAll(key).length === 0);
  const page = Math.max(1, Number(searchParams.get('page')) || 1);

  const buildPageHref = useCallback(
    (value: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value <= 1) params.delete('page');
      else params.set('page', String(value));
      const query = params.toString();
      return query ? `${pathname}?${query}` : pathname;
    },
    [pathname, searchParams],
  );

  return {
    values,
    has: (key, value) => searchParams.getAll(key).includes(value),
    toggle,
    setSingle,
    reset,
    isEmpty,
    isPending,
    page,
    buildPageHref,
  };
}
