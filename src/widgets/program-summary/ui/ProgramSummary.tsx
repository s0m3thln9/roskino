'use client';

import { useLocale } from 'next-intl';
import { useMemo, useRef, useState } from 'react';
import {
  PROGRAM_CATEGORY_BORDER,
  type ProgramSummary as ProgramSummaryData,
} from '@/entities/program-event';
import { cn } from '@/shared/lib';
import { Icon, RoundButton } from '@/shared/ui';

type ProgramSummaryProps = {
  summary: ProgramSummaryData;
  title: string;
  labels: { previous: string; next: string };
  className?: string;
};

export function ProgramSummary({ summary, title, labels, className }: ProgramSummaryProps) {
  const locale = useLocale();
  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Moscow',
      }),
    [locale],
  );
  const formatTime = (iso: string) => timeFormatter.format(new Date(iso));
  const [activeDay, setActiveDay] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const day = summary.days[activeDay] ?? summary.days[0];
  if (!day) return null;

  const scrollBy = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: direction * 454, behavior: 'smooth' });
  };

  return (
    <section className={cn('flex min-w-0 flex-col gap-10 text-white', className)}>
      <h2 className="typo-headline-2">{title}</h2>

      <div className="flex items-center justify-between gap-6">
        <ul className="flex items-center gap-5 md:gap-8">
          {summary.days.map((item, index) => (
            <li key={item.date}>
              <button
                type="button"
                onClick={() => setActiveDay(index)}
                aria-current={index === activeDay ? 'true' : undefined}
                className={cn(
                  'typo-title uppercase transition-opacity',
                  index === activeDay ? 'opacity-100' : 'opacity-50 hover:opacity-80',
                )}
              >
                {index === activeDay ? item.label : `/ ${index + 1}`}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2.5">
          <RoundButton label={labels.previous} variant="glass" onClick={() => scrollBy(-1)}>
            <Icon name="arrow-back" />
          </RoundButton>
          <RoundButton label={labels.next} variant="glass" onClick={() => scrollBy(1)}>
            <Icon name="arrow-forward" />
          </RoundButton>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto pb-2 md:gap-8"
      >
        {day.rooms.map((room) => (
          <div
            key={room.name}
            className="flex w-[300px] shrink-0 snap-start flex-col gap-6 md:w-[434px]"
          >
            <h3 className="flex h-20 items-center border-t-2 border-white typo-title uppercase">
              {room.name}
            </h3>
            <ul className="flex flex-col gap-6 md:gap-7.5">
              {room.events.map((event) => (
                <li
                  key={event.id}
                  className={cn(
                    'flex flex-col gap-1 border-l-10 py-3 pl-5 md:pl-7.5',
                    PROGRAM_CATEGORY_BORDER[event.category],
                  )}
                >
                  <span className="typo-text-2 text-white/50">
                    {formatTime(event.startsAt)} - {formatTime(event.endsAt)}
                  </span>
                  <span className="typo-text-5">{event.title}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
