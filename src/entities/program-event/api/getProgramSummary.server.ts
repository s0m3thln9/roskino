import 'server-only';
import { cache } from 'react';
import { callSnippet } from '@/shared/api/server';
import type { AppLocale } from '@/shared/lib';
import { getProgramSummaryContract } from './contracts';

export const getProgramSummary = cache((lang: AppLocale) =>
  callSnippet(getProgramSummaryContract, { lang }),
);
