'use client';

import { useFormatter } from 'next-intl';
import type { ReactNode } from 'react';
import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui';
import type { ProgramEventPreview } from '../model/schema';
import { PROGRAM_CATEGORY_BORDER } from './programColors';

export type ProgramRowVariant = 'people' | 'projects';

type ProgramRowProps = {
  event: ProgramEventPreview;
  expanded: boolean;
  variant?: ProgramRowVariant;
  categoryLabel: string;
  onToggle: () => void;
  expandLabel: string;
  children?: ReactNode;
};

const HATCHED_BACKGROUND =
  'bg-[repeating-linear-gradient(-45deg,transparent_0_6px,rgba(0,0,0,0.08)_6px_7px)]';

export function ProgramRow({
  event,
  expanded,
  variant,
  categoryLabel,
  onToggle,
  expandLabel,
  children,
}: ProgramRowProps) {
  const format = useFormatter();
  const time = (iso: string) =>
    format.dateTime(new Date(iso), {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Europe/Moscow',
    });

  const isBreak = event.kind === 'break';
  const isPeople = expanded && variant === 'people';

  const content = (
    <span className="flex min-w-0 flex-1 flex-col gap-2 text-left">
      <span className={cn('typo-text-2', isPeople ? 'text-black' : 'text-black/50')}>
        {time(event.startsAt)} - {time(event.endsAt)}
      </span>
      {isBreak ? (
        <span className="flex flex-col typo-text-5">
          <span>{event.title}</span>
          {event.place && <span>{event.place}</span>}
        </span>
      ) : (
        <span className="flex flex-col">
          <span className="typo-text-5">{event.topic ?? event.title}</span>
          <span className="typo-text-3">{categoryLabel}</span>
        </span>
      )}
    </span>
  );

  const headerClassName = cn(
    'flex w-full items-center gap-6 border-l-10 py-5 pr-6 pl-5 text-black md:pr-10 md:pl-7.5',
    isBreak ? cn('border-black', HATCHED_BACKGROUND) : PROGRAM_CATEGORY_BORDER[event.category],
    event.hasDetails && 'transition-colors hover:bg-grey/50',
  );

  return (
    <li className={cn('flex flex-col', isPeople && 'bg-grey/50')}>
      {event.hasDetails ? (
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-label={expandLabel}
          className={headerClassName}
        >
          {content}
          <Icon name={expanded ? 'chevron-up' : 'chevron-down'} className="shrink-0" />
        </button>
      ) : (
        <div className={headerClassName}>{content}</div>
      )}

      {expanded && children}
    </li>
  );
}
