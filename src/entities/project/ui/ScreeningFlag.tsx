'use client';

import { cn } from '@/shared/lib';
import type { Screening } from '../model/schema';
import { useScreeningDate } from './useScreeningDate';

type ScreeningFlagProps = {
  screening: Screening;
  variant?: 'flag' | 'line';
  className?: string;
};

export function ScreeningFlag({ screening, variant = 'flag', className }: ScreeningFlagProps) {
  const { time, day } = useScreeningDate(screening);

  return (
    <div
      className={cn(
        'flex gap-3 typo-text-1 leading-5',
        variant === 'flag'
          ? 'bg-pink pt-4 pr-12 pb-4 pl-6 text-white [clip-path:polygon(0_0,100%_1rem,calc(100%-1.75rem)_calc(50%+0.5rem),100%_100%,0_calc(100%-1rem))] md:pl-10'
          : 'border-l-5 border-pink pl-3',
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
