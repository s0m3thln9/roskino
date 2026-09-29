'use client';

import { useFormatter } from 'next-intl';
import { cn } from '@/shared/lib';
import type { Screening } from '../model/schema';

const ordinalRules = new Intl.PluralRules('en', { type: 'ordinal' });

const ORDINAL_SUFFIXES: Partial<Record<Intl.LDMLPluralRule, string>> = {
  one: 'st',
  two: 'nd',
  few: 'rd',
  other: 'th',
};

type ScreeningFlagProps = {
  screening: Screening;
  variant?: 'flag' | 'line';
  className?: string;
};

export function ScreeningFlag({ screening, variant = 'flag', className }: ScreeningFlagProps) {
  const format = useFormatter();
  const date = new Date(screening.startsAt);
  const time = format.dateTime(date, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/Moscow',
  });
  const dayNumber = Number(format.dateTime(date, { day: 'numeric', timeZone: 'Europe/Moscow' }));
  const month = format.dateTime(date, { month: 'long', timeZone: 'Europe/Moscow' });
  const day = `${dayNumber}${ORDINAL_SUFFIXES[ordinalRules.select(dayNumber)] ?? 'th'} ${month}`;

  return (
    <div
      className={cn(
        'flex gap-3 typo-text-1 leading-5',
        variant === 'flag'
          ? 'bg-violet pt-4 pr-12 pb-4 pl-6 text-white [clip-path:polygon(0_0,100%_1rem,calc(100%-1.75rem)_calc(50%+0.5rem),100%_100%,0_calc(100%-1rem))] md:pl-10'
          : 'border-l-5 border-violet pl-3',
        className,
      )}
    >
      <span className="flex flex-col">
        <span>{time}</span>
        <span>{day}</span>
        <span>{screening.room}</span>
      </span>
    </div>
  );
}
