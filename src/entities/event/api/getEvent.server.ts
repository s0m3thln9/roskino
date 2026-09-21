import 'server-only';
import { cache } from 'react';
import { callSnippet } from '@/shared/api/server';
import type { AppLocale } from '@/shared/lib';
import { getEventContract } from './contracts';

export const getEvent = cache((lang: AppLocale) => callSnippet(getEventContract, { lang }));
