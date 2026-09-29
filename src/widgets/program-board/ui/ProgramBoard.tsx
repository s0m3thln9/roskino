'use client';

import { useState } from 'react';
import {
  ProgramEventDetails,
  ProgramRow,
  toProgramParams,
  useGetProgramEventQuery,
  useGetProgramQuery,
} from '@/entities/program-event';
import { useGetFiltersQuery, type CatalogFilters } from '@/entities/project';
import { cn } from '@/shared/lib';
import { useUrlFilters } from '@/shared/model';
import {
  catalogLayout,
  FilterGroup,
  FilterOption,
  FiltersSkeleton,
  Icon,
  RoundButton,
  Skeleton,
} from '@/shared/ui';

const ROW_SKELETON_COUNT = 6;

function RowsSkeleton() {
  return (
    <div aria-hidden className="flex flex-col gap-3">
      {Array.from({ length: ROW_SKELETON_COUNT }, (_, index) => (
        <Skeleton key={index} className="h-15" />
      ))}
    </div>
  );
}

export function ProgramBoardSkeleton() {
  return (
    <div className={catalogLayout.root}>
      <FiltersSkeleton />
      <div className={catalogLayout.content}>
        <RowsSkeleton />
      </div>
    </div>
  );
}

export type ProgramLabels = {
  date: string;
  location: string;
  room: string;
  reset: string;
  clear: string;
  loading: string;
  empty: string;
  error: string;
  expand: string;
  participants: string;
  moderators: string;
  description: string;
  minutes: string;
};

const FILTER_KEYS = ['date', 'location', 'room'] as const;

function toLabelMap(options: CatalogFilters['contentTypes']) {
  return Object.fromEntries(options.map((option) => [option.value, option.label]));
}

function ProgramRowDetails({
  eventId,
  labels,
  contentTypeLabels,
  genreLabels,
}: {
  eventId: string;
  labels: ProgramLabels;
  contentTypeLabels: Record<string, string>;
  genreLabels: Record<string, string>;
}) {
  const { data, isLoading } = useGetProgramEventQuery(eventId);

  if (isLoading) return <p className="pt-6 typo-text-3 text-white/50">{labels.loading}</p>;
  if (!data) return null;

  return (
    <ProgramEventDetails
      event={data}
      labels={labels}
      contentTypeLabels={contentTypeLabels}
      genreLabels={genreLabels}
    />
  );
}

export function ProgramBoard({ labels, className }: { labels: ProgramLabels; className?: string }) {
  const url = useUrlFilters(FILTER_KEYS);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const programQuery = useGetProgramQuery(
    toProgramParams({
      date: url.values('date')[0],
      location: url.values('location')[0],
      room: url.values('room')[0],
    }),
  );
  const isRefreshing = programQuery.isFetching && !programQuery.isLoading;
  const filtersQuery = useGetFiltersQuery();

  const contentTypeLabels = toLabelMap(filtersQuery.data?.contentTypes ?? []);
  const genreLabels = toLabelMap(filtersQuery.data?.genres ?? []);
  const filters = programQuery.data?.filters;

  const groups: Array<{
    key: keyof typeof labels;
    name: string;
    options: { value: string; label: string }[];
  }> = filters
    ? [
        { key: 'date', name: 'date', options: filters.dates },
        { key: 'location', name: 'location', options: filters.locations },
        { key: 'room', name: 'room', options: filters.rooms },
      ]
    : [];

  return (
    <div className={cn(catalogLayout.root, className)}>
      {!filters && <FiltersSkeleton />}
      <div className={cn('flex flex-col gap-8', catalogLayout.filters, !filters && 'hidden')}>
        {groups.map((group) => (
          <FilterGroup key={group.name} legend={labels[group.key]}>
            {group.options.map((option) => (
              <FilterOption
                key={option.value}
                type="radio"
                name={group.name}
                value={option.value}
                label={option.label}
                checked={url.values(group.name)[0] === option.value}
                clearLabel={labels.clear}
                onCheckedChange={(checked) =>
                  url.setSingle(group.name, checked ? option.value : null)
                }
              />
            ))}
          </FilterGroup>
        ))}

        {!url.isEmpty && (
          <RoundButton label={labels.reset} variant="muted" onClick={url.reset}>
            <Icon name="reset" />
          </RoundButton>
        )}
      </div>

      <div className={cn(catalogLayout.content, 'gap-3')}>
        {programQuery.isError && <p className="typo-text-3">{labels.error}</p>}
        {programQuery.isLoading && <RowsSkeleton />}
        {programQuery.data?.events.length === 0 && <p className="typo-text-3">{labels.empty}</p>}

        <ul
          aria-busy={isRefreshing}
          className={cn('flex flex-col gap-3 transition-opacity', isRefreshing && 'opacity-50')}
        >
          {programQuery.data?.events.map((event) => (
            <ProgramRow
              key={event.id}
              event={event}
              expanded={expandedId === event.id}
              expandLabel={labels.expand}
              onToggle={() => setExpandedId((value) => (value === event.id ? null : event.id))}
            >
              <ProgramRowDetails
                eventId={event.id}
                labels={labels}
                contentTypeLabels={contentTypeLabels}
                genreLabels={genreLabels}
              />
            </ProgramRow>
          ))}
        </ul>
      </div>
    </div>
  );
}
