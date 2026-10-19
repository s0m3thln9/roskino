'use client';

import type { CatalogFilters } from '@/entities/project';
import { useUrlFilters } from '@/shared/model';
import { FilterGroup, FilterOption, FilterPanel, type FilterPanelLabels } from '@/shared/ui';

export const PROJECT_FILTER_KEYS = ['contentType', 'genre'] as const;

type GroupLabels = { contentType: string; genre: string };

type ProjectsFilterProps = {
  filters: CatalogFilters;
  labels: GroupLabels & {
    clear: string;
    filterPanel: FilterPanelLabels;
    shortLegends: GroupLabels;
    chips: GroupLabels;
  };
  className?: string;
};

export function ProjectsFilter({ filters, labels, className }: ProjectsFilterProps) {
  const url = useUrlFilters(PROJECT_FILTER_KEYS);
  const contentTypes = url.values('contentType');
  const genres = url.values('genre');

  return (
    <FilterPanel
      chips={[
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
