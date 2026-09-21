import 'server-only';
import { defineMockHandler } from '@/shared/api/server';
import { pickLocale } from '@/shared/lib';
import { getEventContract } from './contracts';
import { eventMock } from './mock-data';

export const eventMockHandlers = [
  defineMockHandler(getEventContract, ({ lang }) => pickLocale(eventMock, lang)),
];
