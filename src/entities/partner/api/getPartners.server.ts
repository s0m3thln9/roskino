import 'server-only';
import { cache } from 'react';
import { callSnippet } from '@/shared/api/server';
import type { AppLocale } from '@/shared/lib';
import { getPartnersContract } from './contracts';

export const getPartners = cache((lang: AppLocale) => callSnippet(getPartnersContract, { lang }));
