'use client';

import {
  ParticipantCard,
  ParticipantDetails,
  useGetParticipantQuery,
  useGetParticipantsQuery,
} from '@/entities/participant';
import { ProjectPosterCard, useGetFiltersQuery, type CatalogFilters } from '@/entities/project';
import { ParticipantsFilter } from '@/features/filter-participants';
import { useSearchParams } from 'next/navigation';
import { ROUTES } from '@/shared/config';
import { useRouter } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import { useUrlFilters } from '@/shared/model';
import { Modal, Pagination } from '@/shared/ui';

export type CatalogLabels = {
  origin: string;
  contentType: string;
  genre: string;
  reset: string;
  clear: string;
  loading: string;
  empty: string;
  error: string;
  close: string;
  contentTypes: string;
  achievements: string;
  projects: string;
  country: string;
  territory: string;
  paginationNav: string;
  previous: string;
  next: string;
  page: string;
};

const FILTER_KEYS = ['origin', 'contentType', 'genre'] as const;

function toLabelMap(options: CatalogFilters['contentTypes']) {
  return Object.fromEntries(options.map((option) => [option.value, option.label]));
}

export function ParticipantsCatalog({
  labels,
  selectedId,
  className,
}: {
  labels: CatalogLabels;
  selectedId?: string;
  className?: string;
}) {
  const url = useUrlFilters(FILTER_KEYS);
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const withQuery = (path: string) => (query ? `${path}?${query}` : path);
  const filtersQuery = useGetFiltersQuery();

  const listQuery = useGetParticipantsQuery({
    origin: url.values('origin') as never,
    contentType: url.values('contentType') as never,
    genre: url.values('genre') as never,
    page: url.page,
  });

  const detailsQuery = useGetParticipantQuery(selectedId ?? '', { skip: !selectedId });
  const contentTypeLabels = toLabelMap(filtersQuery.data?.contentTypes ?? []);
  const genreLabels = toLabelMap(filtersQuery.data?.genres ?? []);

  return (
    <div className={cn('flex flex-col gap-10 lg:flex-row lg:gap-10', className)}>
      {filtersQuery.data && (
        <ParticipantsFilter
          filters={filtersQuery.data}
          labels={labels}
          className="lg:w-[162px] lg:shrink-0"
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-10">
        {listQuery.isError && <p className="typo-text-3">{labels.error}</p>}
        {listQuery.isLoading && <p className="typo-text-3">{labels.loading}</p>}
        {listQuery.data?.items.length === 0 && <p className="typo-text-3">{labels.empty}</p>}

        <ul
          className={cn(
            'sm:grid-cols-2 grid gap-5 lg:grid-cols-3',
            url.isPending && 'opacity-60 transition-opacity',
          )}
        >
          {listQuery.data?.items.map((participant) => (
            <li key={participant.id} className="contents">
              <ParticipantCard
                participant={participant}
                href={withQuery(ROUTES.participant(participant.id))}
              />
            </li>
          ))}
        </ul>

        {listQuery.data && (
          <Pagination
            page={listQuery.data.page}
            totalPages={listQuery.data.totalPages}
            buildHref={url.buildPageHref}
            labels={{
              nav: labels.paginationNav,
              previous: labels.previous,
              next: labels.next,
              page: (value) => `${labels.page} ${value}`,
            }}
            className="self-center"
          />
        )}
      </div>

      <Modal
        open={Boolean(selectedId)}
        onClose={() => router.push(withQuery(ROUTES.participants))}
        closeLabel={labels.close}
      >
        {detailsQuery.isLoading && <p className="typo-text-3">{labels.loading}</p>}
        {detailsQuery.data && (
          <ParticipantDetails
            participant={detailsQuery.data}
            labels={labels}
            contentTypeLabels={contentTypeLabels}
            projectsSlot={
              detailsQuery.data.projects.length > 0 ? (
                <ul className="flex [scrollbar-width:none] gap-5 overflow-x-auto pb-2">
                  {detailsQuery.data.projects.map((project) => (
                    <li key={project.id} className="contents">
                      <ProjectPosterCard
                        project={project}
                        contentTypeLabel={contentTypeLabels[project.contentType] ?? ''}
                        genreLabels={project.genres.map((genre) => genreLabels[genre] ?? genre)}
                      />
                    </li>
                  ))}
                </ul>
              ) : null
            }
          />
        )}
      </Modal>
    </div>
  );
}
