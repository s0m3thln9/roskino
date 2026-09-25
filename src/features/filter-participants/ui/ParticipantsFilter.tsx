'use client';

import type { CatalogFilters } from '@/entities/project';
import { cn } from '@/shared/lib';
import { useUrlFilters } from '@/shared/model';
import { FilterGroup, FilterOption, Icon, RoundButton } from '@/shared/ui';

export const PARTICIPANT_FILTER_KEYS = ['origin', 'contentType', 'genre'] as const;

type ParticipantsFilterProps = {
  filters: CatalogFilters;
  labels: { origin: string; contentType: string; genre: string; reset: string; clear: string };
  className?: string;
};

export function ParticipantsFilter({ filters, labels, className }: ParticipantsFilterProps) {
  const url = useUrlFilters(PARTICIPANT_FILTER_KEYS);
  const origin = url.values('origin')[0] ?? null;
  const contentTypes = url.values('contentType');
  const genres = url.values('genre');

  return (
    <div className={cn('flex flex-col gap-8', className)}>
      <FilterGroup legend={labels.origin}>
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
