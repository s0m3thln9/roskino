import 'server-only';
import { defineMockHandler } from '@/shared/api/server';
import { pickLocale } from '@/shared/lib';
import { MAX_BANNERS } from '../model/schema';
import { getBannersContract } from './contracts';
import { bannersMock } from './mock-data';

export const bannerMockHandlers = [
  defineMockHandler(getBannersContract, ({ lang }) =>
    pickLocale(bannersMock, lang).slice(0, MAX_BANNERS),
  ),
];
