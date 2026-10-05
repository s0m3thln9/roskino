'use client';

import { cn } from '@/shared/lib';
import type { Screening } from '../model/schema';
import { useScreeningDate } from './useScreeningDate';

type ScreeningFlagProps = {
  screening: Screening;
  variant?: 'flag' | 'line' | 'aside';
  className?: string;
};

export function ScreeningFlag({ screening, variant = 'flag', className }: ScreeningFlagProps) {
  const { time, day } = useScreeningDate(screening);

  return (
    <div
      className={cn(
        'flex gap-3',
        variant === 'aside' ? 'typo-text-7' : 'typo-text-1 leading-5',
        variant === 'flag' &&
          'bg-red pt-4 pr-12 pb-4 pl-6 text-white [clip-path:polygon(0_0,100%_1rem,calc(100%-1.75rem)_calc(50%+0.5rem),100%_100%,0_calc(100%-1rem))] md:pl-10',
        variant === 'line' && 'border-l-5 border-red pl-3',
        variant === 'aside' && 'border-r-5 border-red pr-4 text-right',
        className,
      )}
    >
      <span className="flex flex-col">
        <span>{time}</span>
        <span>{day}</span>
        <span>
          {variant === 'aside' && screening.section
            ? `${screening.section} / ${screening.room}`
            : screening.room}
        </span>
      </span>
    </div>
  );
}
