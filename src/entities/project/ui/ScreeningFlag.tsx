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

const FLAG_BACKGROUND =
  'bg-[url(/images/screening-flag-card.svg)] bg-size-[100%_100%] bg-no-repeat';

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
          'pointer-events-none relative flex pt-4 pr-12 pb-4 pl-10 typo-text-1 leading-5 text-white max-md:font-normal md:h-22.5 md:pt-3 md:pb-0',
          detailed && 'max-md:pt-3 max-md:leading-6',
          className,
        )}
      >
        <span
          aria-hidden
          className={cn('absolute inset-y-0 left-0', detailed ? 'w-40' : 'w-37.5', FLAG_BACKGROUND)}
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
