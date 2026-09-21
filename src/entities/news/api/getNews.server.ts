import 'server-only';
import { cache } from 'react';
import { isApiError } from '@/shared/api';
import { callSnippet } from '@/shared/api/server';
import type { AppLocale } from '@/shared/lib';
import { getNewsContract, getNewsItemContract } from './contracts';

export const getNews = cache((lang: AppLocale, page = 1, limit?: number) =>
  callSnippet(getNewsContract, { lang, page, limit }),
);

export const getNewsItem = cache(async (lang: AppLocale, slug: string) => {
  try {
    return await callSnippet(getNewsItemContract, { lang, slug });
  } catch (error) {
    if (isApiError(error) && error.status === 404) return null;
    throw error;
  }
});
