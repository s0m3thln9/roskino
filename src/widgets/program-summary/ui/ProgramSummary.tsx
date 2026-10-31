'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  PROGRAM_CATEGORY_BORDER,
  type ProgramSummary as ProgramSummaryData,
} from '@/entities/program-event';
import { cn } from '@/shared/lib';
import { buttonVariants, Hyphenated, Icon, RoundButton } from '@/shared/ui';

type ProgramSummaryProps = {
  summary: ProgramSummaryData;
  title: string;
  labels: { previous: string; next: string; register: string };
  className?: string;
};

export function ProgramSummary({ summary, title, labels, className }: ProgramSummaryProps) {
  const locale = useLocale();
  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Europe/Moscow',
      }),
    [locale],
  );
  const formatTime = (iso: string) => timeFormatter.format(new Date(iso));
  const [activeDay, setActiveDay] = useState(0);
  const roomsRef = useRef<HTMLDivElement>(null);
  const [scrollEdges, setScrollEdges] = useState({ start: true, end: true });

  const updateScrollEdges = useCallback(() => {
    const element = roomsRef.current;
    if (!element) return;
    setScrollEdges({
      start: element.scrollLeft <= 1,
      end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 1,
    });
  }, []);

  useEffect(() => {
    const element = roomsRef.current;
    if (!element) return;
    element.scrollTo({ left: 0 });
    updateScrollEdges();
    const observer = new ResizeObserver(updateScrollEdges);
    observer.observe(element);
    return () => observer.disconnect();
  }, [activeDay, updateScrollEdges]);

  const scrollRooms = (direction: 1 | -1) => {
    const element = roomsRef.current;
    const [first, second] = Array.from(
      element?.querySelectorAll<HTMLElement>('[data-room-header]') ?? [],
    );
    if (!element || !first) return;
    const step = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
    element.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const day = summary.days[activeDay] ?? summary.days[0];
  if (!day) return null;

  const slotCounts = new Map<string, number>();
  day.rooms.forEach((room) => {
    const seen = new Map<string, number>();
    room.events.forEach((event) => {
      const count = (seen.get(event.startsAt) ?? 0) + 1;
      seen.set(event.startsAt, count);
      slotCounts.set(event.startsAt, Math.max(slotCounts.get(event.startsAt) ?? 0, count));
    });
  });
  const slotRows = new Map<string, number>();
  [...slotCounts.keys()].sort().forEach((startsAt) => {
    for (let index = 0; index < (slotCounts.get(startsAt) ?? 0); index += 1) {
      slotRows.set(`${startsAt}#${index}`, slotRows.size + 2);
    }
  });

  return (
    <section
      className={cn('relative flex min-w-0 flex-col gap-7.5 text-white md:gap-10', className)}
    >
      <Image
        src="/images/program-stripes.svg"
        alt=""
        aria-hidden
        width={370}
        height={398}
        className="pointer-events-none absolute top-[93px] right-[calc((100%-100vw)/2)] hidden lg:block"
      />

      <h2 className="relative mb-7.5 typo-headline-2 md:mb-5">
        <Hyphenated text={title} />
      </h2>

      <div className="relative flex items-center justify-between gap-6">
        <ul className="flex items-center gap-8">
          {summary.days.map((item, index) => (
            <li key={item.date}>
              <button
                type="button"
                onClick={() => setActiveDay(index)}
                aria-current={index === activeDay ? 'true' : undefined}
                className={cn(
                  'typo-title whitespace-nowrap uppercase transition-opacity',
                  index === activeDay ? 'opacity-100' : 'opacity-50 hover:opacity-80',
                )}
              >
                {index === activeDay ? item.label : `/ ${index + 1}`}
              </button>
            </li>
          ))}
        </ul>
        <div className="z-10 flex items-center gap-2.5 max-md:hidden lg:absolute lg:top-[calc(100%+60px)] lg:right-0">
          <RoundButton
            label={labels.previous}
            variant="glass"
            disabled={scrollEdges.start}
            onClick={() => scrollRooms(-1)}
          >
            <Icon name="arrow-back" />
          </RoundButton>
          <RoundButton
            label={labels.next}
            variant="glass"
            disabled={scrollEdges.end}
            onClick={() => scrollRooms(1)}
          >
            <Icon name="arrow-forward" />
          </RoundButton>
        </div>
      </div>

      <div
        ref={roomsRef}
        onScroll={updateScrollEdges}
        className="relative flex snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto pb-2 md:grid md:auto-cols-[354px] md:gap-x-25 md:gap-y-7.5"
      >
        {day.rooms.map((room, roomIndex) => {
          const seen = new Map<string, number>();
          return (
            <div
              key={room.name}
              className="flex w-full shrink-0 snap-start flex-col gap-4 md:contents"
            >
              <div
                data-room-header
                style={{ gridColumn: roomIndex + 1, gridRow: 1 }}
                className="flex flex-col md:-mb-1.5 md:snap-start"
              >
                <div aria-hidden className="flex gap-2 md:hidden">
                  {day.rooms.map((item, index) => (
                    <span
                      key={item.name}
                      className={cn(
                        'h-0.5 flex-1',
                        index === roomIndex ? 'bg-white' : 'bg-white/40',
                      )}
                    />
                  ))}
                </div>
                <h3 className="flex h-20 items-center typo-title uppercase md:border-t-2 md:border-white">
                  {room.name}
                </h3>
              </div>
              <ul className="flex flex-col gap-7.5 md:contents">
                {room.events.map((event) => {
                  const occurrence = seen.get(event.startsAt) ?? 0;
                  seen.set(event.startsAt, occurrence + 1);
                  return (
                    <li
                      key={event.id}
                      style={{
                        gridColumn: roomIndex + 1,
                        gridRow: slotRows.get(`${event.startsAt}#${occurrence}`),
                      }}
                      className="flex flex-col gap-6 md:gap-7.5"
                    >
                      <div
                        className={cn(
                          'flex flex-col gap-1 border-l-10 py-3 pl-7.5',
                          PROGRAM_CATEGORY_BORDER[event.category],
                        )}
                      >
                        <span className="typo-text-2 text-white/50">
                          {formatTime(event.startsAt)} - {formatTime(event.endsAt)}
                        </span>
                        <span className="typo-text-5">{event.title}</span>
                      </div>
                      {event.registrationUrl && (
                        <a
                          href={event.registrationUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={cn(
                            buttonVariants({ variant: 'secondary', width: 'full' }),
                            'typo-text-1',
                          )}
                        >
                          {labels.register}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
