import 'server-only';
import { cache } from 'react';
import { callSnippet } from '@/shared/api/server';
import type { AppLocale } from '@/shared/lib';
import { getBannersContract } from './contracts';

export const getBanners = cache((lang: AppLocale) => callSnippet(getBannersContract, { lang }));
