'use client';

import type { CatalogFilters } from '@/entities/project';
import { useUrlFilters } from '@/shared/model';
import { FilterGroup, FilterOption, FilterPanel, type FilterPanelLabels } from '@/shared/ui';

export const PARTICIPANT_FILTER_KEYS = ['origin', 'contentType', 'genre'] as const;

type GroupLabels = { origin: string; contentType: string; genre: string };

type ParticipantsFilterProps = {
  filters: CatalogFilters;
  labels: GroupLabels & {
    clear: string;
    filterPanel: FilterPanelLabels;
    shortLegends: GroupLabels;
    chips: GroupLabels;
  };
  className?: string;
};

export function ParticipantsFilter({ filters, labels, className }: ParticipantsFilterProps) {
  const url = useUrlFilters(PARTICIPANT_FILTER_KEYS);
  const origin = url.values('origin')[0] ?? null;
  const contentTypes = url.values('contentType');
  const genres = url.values('genre');
  const originLabel = filters.origins.find((option) => option.value === origin)?.label;

  return (
    <FilterPanel
      chips={[
        { key: 'origin', label: originLabel ?? labels.chips.origin, active: Boolean(originLabel) },
        {
          key: 'contentType',
          label: labels.chips.contentType,
          count: contentTypes.length,
          active: contentTypes.length > 0,
        },
        {
          key: 'genre',
          label: labels.chips.genre,
          count: genres.length,
          active: genres.length > 0,
        },
      ]}
      canReset={!url.isEmpty}
      onReset={url.reset}
      labels={labels.filterPanel}
      className={className}
    >
      <FilterGroup legend={labels.origin} shortLegend={labels.shortLegends.origin}>
        {filters.origins.map((option) => (
          <FilterOption
            key={option.value}
            type="radio"
            name="origin"
            value={option.value}
            label={option.label}
            checked={origin === option.value}
            clearLabel={labels.clear}
            onCheckedChange={(checked) => url.setSingle('origin', checked ? option.value : null)}
          />
        ))}
      </FilterGroup>

      <FilterGroup legend={labels.contentType} shortLegend={labels.shortLegends.contentType}>
        {filters.contentTypes.map((option) => (
          <FilterOption
            key={option.value}
            type="checkbox"
            name="contentType"
            value={option.value}
            label={option.label}
            checked={contentTypes.includes(option.value)}
            dimmed={contentTypes.length > 0}
            clearLabel={labels.clear}
            onCheckedChange={(checked) => url.toggle('contentType', option.value, checked)}
          />
        ))}
      </FilterGroup>

      <FilterGroup legend={labels.genre} shortLegend={labels.shortLegends.genre}>
        {filters.genres.map((option) => (
          <FilterOption
            key={option.value}
            type="checkbox"
            name="genre"
            value={option.value}
            label={option.label}
            checked={genres.includes(option.value)}
            dimmed={genres.length > 0}
            clearLabel={labels.clear}
            onCheckedChange={(checked) => url.toggle('genre', option.value, checked)}
          />
        ))}
      </FilterGroup>
    </FilterPanel>
  );
}
