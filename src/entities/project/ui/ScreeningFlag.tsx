'use client';

import { useFormatter } from 'next-intl';
import { cn } from '@/shared/lib';
import type { Screening } from '../model/schema';

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
  const day = format.dateTime(date, { day: 'numeric', month: 'long', timeZone: 'Europe/Moscow' });

  return (
    <div
      className={cn(
        'flex gap-3 typo-text-1 leading-5',
        variant === 'flag' ? 'bg-violet px-4 py-2 text-white' : 'border-l-5 border-violet pl-3',
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
