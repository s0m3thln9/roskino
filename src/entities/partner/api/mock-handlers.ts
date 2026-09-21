import 'server-only';
import { defineMockHandler } from '@/shared/api/server';
import { pickLocale } from '@/shared/lib';
import { getPartnersContract } from './contracts';
import { partnersMock } from './mock-data';

export const partnerMockHandlers = [
  defineMockHandler(getPartnersContract, ({ lang }) => pickLocale(partnersMock, lang)),
];
