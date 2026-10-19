'use client';

import { cn } from '@/shared/lib';
import type { Screening } from '../model/schema';
import { useScreeningDate } from './useScreeningDate';

type ScreeningFlagProps = {
  screening: Screening;
  variant?: 'flag' | 'line' | 'aside';
  duration?: string | null;
  detailed?: boolean;
  className?: string;
};

const FLAG_CLIP =
  '[clip-path:polygon(0_0,100%_1rem,calc(100%-1.75rem)_calc(50%+0.5rem),100%_100%,0_calc(100%-1rem))]';

export function ScreeningFlag({
  screening,
  variant = 'flag',
  duration,
  detailed = false,
  className,
}: ScreeningFlagProps) {
  const { time, day } = useScreeningDate(screening);

  if (variant === 'flag') {
    return (
      <div
        className={cn(
          'relative flex pt-4 pr-12 pb-4 pl-10 typo-text-1 leading-5 text-white max-md:font-normal',
          detailed && 'max-md:pt-3 max-md:leading-6',
          className,
        )}
      >
        <span
          aria-hidden
          className={cn(
            'absolute inset-y-0 left-0 bg-red md:w-full',
            detailed ? 'w-40' : 'w-37.5',
            FLAG_CLIP,
          )}
        />
        <span className="relative flex flex-col whitespace-nowrap md:hidden">
          {duration && <span>{duration}</span>}
          {detailed ? (
            <>
              <span>{time}</span>
              <span>{day}</span>
            </>
          ) : (
            <span>
              {time}, {day}
            </span>
          )}
          <span>
            {screening.section} / {screening.room}
          </span>
        </span>
        <span className="relative flex flex-col max-md:hidden">
          <span>{time}</span>
          <span>{day}</span>
          <span>{screening.room}</span>
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex gap-3 typo-text-7',
        variant === 'line' && 'border-l-5 border-red pl-3 typo-text-1 leading-5',
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
