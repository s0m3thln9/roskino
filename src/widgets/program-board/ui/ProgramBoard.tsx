'use client';

import { useState } from 'react';
import {
  ProgramEventDetails,
  ProgramRow,
  type ProgramCategory,
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
  FilterPanel,
  FiltersSkeleton,
  Skeleton,
  type FilterPanelLabels,
} from '@/shared/ui';

const ROW_SKELETON_COUNT = 6;

function RowsSkeleton() {
  return (
    <div aria-hidden className="flex flex-col gap-10">
      {Array.from({ length: ROW_SKELETON_COUNT }, (_, index) => (
        <Skeleton key={index} className="h-24" />
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

type FilterGroupLabels = { date: string; location: string; room: string };

export type ProgramLabels = FilterGroupLabels & {
  filterPanel: FilterPanelLabels;
  shortLegends: FilterGroupLabels;
  chips: FilterGroupLabels;
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
  categories: Record<ProgramCategory, string>;
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

  if (isLoading) return <Skeleton className="mx-7.5 mb-5 h-40 md:mx-10" />;
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
  const expandedQuery = useGetProgramEventQuery(expandedId ?? '', { skip: !expandedId });
  const expandedEvent = expandedQuery.data?.id === expandedId ? expandedQuery.data : undefined;

  const contentTypeLabels = toLabelMap(filtersQuery.data?.contentTypes ?? []);
  const genreLabels = toLabelMap(filtersQuery.data?.genres ?? []);
  const filters = programQuery.data?.filters;

  const groups: Array<{
    key: (typeof FILTER_KEYS)[number];
    name: string;
    options: { value: string; label: string }[];
  }> = filters
    ? [
        { key: 'location', name: 'location', options: filters.locations },
        { key: 'date', name: 'date', options: filters.dates },
        { key: 'room', name: 'room', options: filters.rooms },
      ]
    : [];

  return (
    <div className={cn(catalogLayout.root, className)}>
      {filters ? (
        <FilterPanel
          chips={groups.map((group) => {
            const selected = group.options.find(
              (option) => option.value === url.values(group.name)[0],
            );
            return {
              key: group.key,
              label: selected?.label ?? labels.chips[group.key],
              active: Boolean(selected),
            };
          })}
          canReset={!url.isEmpty}
          onReset={url.reset}
          labels={labels.filterPanel}
          className={catalogLayout.filters}
        >
          {groups.map((group) => (
            <FilterGroup
              key={group.name}
              legend={labels[group.key]}
              shortLegend={labels.shortLegends[group.key]}
            >
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
        </FilterPanel>
      ) : (
        <FiltersSkeleton />
      )}

      <div className={cn(catalogLayout.content, 'gap-3')}>
        {programQuery.isError && <p className="typo-text-3">{labels.error}</p>}
        {programQuery.isLoading && <RowsSkeleton />}
        {programQuery.data?.events.length === 0 && <p className="typo-text-3">{labels.empty}</p>}

        <ul
          aria-busy={isRefreshing}
          className={cn(
            '-mx-10 flex flex-col gap-10 transition-opacity md:mx-0',
            isRefreshing && 'opacity-50',
          )}
        >
          {programQuery.data?.events.map((event) => (
            <ProgramRow
              key={event.id}
              event={event}
              expanded={expandedId === event.id}
              variant={
                expandedEvent?.id === event.id
                  ? expandedEvent.projects.length > 0
                    ? 'projects'
                    : 'people'
                  : undefined
              }
              categoryLabel={labels.categories[event.category]}
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
