'use client';

import { useFormatter } from 'next-intl';
import type { Screening } from '../model/schema';

const TIME_ZONE = 'Europe/Moscow';

const ordinalRules = new Intl.PluralRules('en', { type: 'ordinal' });

const ORDINAL_SUFFIXES: Partial<Record<Intl.LDMLPluralRule, string>> = {
  one: 'st',
  two: 'nd',
  few: 'rd',
  other: 'th',
};

export function useScreeningDate(screening: Pick<Screening, 'startsAt'>) {
  const format = useFormatter();
  const date = new Date(screening.startsAt);
  const time = format.dateTime(date, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: TIME_ZONE,
  });
  const dayNumber = Number(format.dateTime(date, { day: 'numeric', timeZone: TIME_ZONE }));
  const month = format.dateTime(date, { month: 'long', timeZone: TIME_ZONE });
  const suffix = ORDINAL_SUFFIXES[ordinalRules.select(dayNumber)] ?? 'th';

  return { time, day: `${dayNumber}${suffix} ${month}` };
}
