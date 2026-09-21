import 'server-only';
import { defineMockHandler } from '@/shared/api/server';
import { pickLocale } from '@/shared/lib';
import { getArchiveContract, getMediaContract } from './contracts';
import { archiveMock, mediaMock } from './mock-data';

export const mediaMockHandlers = [
  defineMockHandler(getMediaContract, ({ type, year }) => {
    const years = [...new Set(mediaMock.map((item) => item.year))].sort((a, b) => b - a);
    const currentYear = year ?? years[0] ?? new Date().getFullYear();
    const items = mediaMock.filter(
      (item) => item.year === currentYear && (!type || item.type === type),
    );
    return { years, year: currentYear, items };
  }),
  defineMockHandler(getArchiveContract, ({ lang }) => ({
    editions: pickLocale(archiveMock, lang),
  })),
];
