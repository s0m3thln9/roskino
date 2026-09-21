import 'server-only';
import { cache } from 'react';
import { callSnippet } from '@/shared/api/server';
import type { AppLocale } from '@/shared/lib';
import { getSiteSettingsContract } from './contracts';

export const getSiteSettings = cache((lang: AppLocale) =>
  callSnippet(getSiteSettingsContract, { lang }),
);
