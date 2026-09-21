import 'server-only';
import { cache } from 'react';
import { callSnippet } from '@/shared/api/server';
import type { AppLocale } from '@/shared/lib';
import type { MediaType } from '../model/schema';
import { getArchiveContract, getMediaContract } from './contracts';

export const getMedia = cache((lang: AppLocale, type?: MediaType, year?: number) =>
  callSnippet(getMediaContract, { lang, type, year }),
);

export const getArchive = cache((lang: AppLocale) => callSnippet(getArchiveContract, { lang }));
