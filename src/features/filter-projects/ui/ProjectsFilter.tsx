'use client';

import type { CatalogFilters } from '@/entities/project';
import { cn } from '@/shared/lib';
import { useUrlFilters } from '@/shared/model';
import { FilterGroup, FilterOption, Icon, RoundButton } from '@/shared/ui';

export const PROJECT_FILTER_KEYS = ['contentType', 'genre'] as const;

type ProjectsFilterProps = {
  filters: CatalogFilters;
  labels: { contentType: string; genre: string; reset: string; clear: string };
  className?: string;
};

export function ProjectsFilter({ filters, labels, className }: ProjectsFilterProps) {
  const url = useUrlFilters(PROJECT_FILTER_KEYS);
  const contentTypes = url.values('contentType');
  const genres = url.values('genre');

  return (
    <div className={cn('flex flex-col gap-8', className)}>
      <FilterGroup legend={labels.contentType}>
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

      <FilterGroup legend={labels.genre}>
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

      {!url.isEmpty && (
        <RoundButton label={labels.reset} variant="muted" onClick={url.reset}>
          <Icon name="reset" />
        </RoundButton>
      )}
    </div>
  );
}
