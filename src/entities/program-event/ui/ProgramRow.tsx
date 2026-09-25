'use client';

import { useFormatter } from 'next-intl';
import type { ReactNode } from 'react';
import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui';
import type { ProgramEventPreview } from '../model/schema';
import { PROGRAM_CATEGORY_BORDER } from './programColors';

type ProgramRowProps = {
  event: ProgramEventPreview;
  expanded: boolean;
  onToggle: () => void;
  expandLabel: string;
  children?: ReactNode;
};

export function ProgramRow({ event, expanded, onToggle, expandLabel, children }: ProgramRowProps) {
  const format = useFormatter();
  const time = (iso: string) =>
    format.dateTime(new Date(iso), {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Europe/Moscow',
    });

  const place =
    event.kind === 'break' ? event.place : [event.location, event.room].filter(Boolean).join(' / ');

  const content = (
    <>
      <span className="w-[140px] shrink-0 typo-text-2 text-white/50">
        {time(event.startsAt)} - {time(event.endsAt)}
      </span>
      <span className="flex-1 text-left typo-text-5">{event.title}</span>
      {place && <span className="text-right typo-text-2 text-white/50 md:w-[280px]">{place}</span>}
    </>
  );

  return (
    <li
      className={cn(
        'flex flex-col border-l-10 bg-black py-3 pr-4 pl-5 text-white md:pl-7.5',
        PROGRAM_CATEGORY_BORDER[event.category],
      )}
    >
      {event.hasDetails ? (
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-label={expandLabel}
          className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-8"
        >
          {content}
          <Icon name={expanded ? 'chevron-up' : 'chevron-down'} className="shrink-0" />
        </button>
      ) : (
        <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-8">
          {content}
        </div>
      )}

      {expanded && children}
    </li>
  );
}
