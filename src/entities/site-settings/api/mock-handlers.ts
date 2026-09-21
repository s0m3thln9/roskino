import 'server-only';
import { defineMockHandler } from '@/shared/api/server';
import { pickLocale } from '@/shared/lib';
import { getSiteSettingsContract } from './contracts';
import { siteSettingsMock } from './mock-data';

export const siteSettingsMockHandlers = [
  defineMockHandler(getSiteSettingsContract, ({ lang }) => pickLocale(siteSettingsMock, lang)),
];
