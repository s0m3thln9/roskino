'use client';

import {
  participantApi,
  ParticipantCard,
  ParticipantDetails,
  toParticipantsParams,
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
import { catalogLayout, FiltersSkeleton, Modal, Pagination, Skeleton } from '@/shared/ui';
import { ParticipantDetailsSkeleton } from './ParticipantDetailsSkeleton';
import { ProjectsCarousel } from './ProjectsCarousel';

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
const CONTENT_CLASS = cn(catalogLayout.content, 'lg:max-w-content');
const GRID_CLASS = 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3';
const SKELETON_COUNT = 9;

function toLabelMap(options: CatalogFilters['contentTypes']) {
  return Object.fromEntries(options.map((option) => [option.value, option.label]));
}

export function ParticipantsCatalogSkeleton() {
  return (
    <div className={catalogLayout.root}>
      <FiltersSkeleton />
      <div className={CONTENT_CLASS}>
        <div className={GRID_CLASS}>
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <Skeleton key={index} className="aspect-square" />
          ))}
        </div>
      </div>
    </div>
  );
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
  const prefetchParticipant = participantApi.usePrefetch('getParticipant');

  const listQuery = useGetParticipantsQuery(
    toParticipantsParams({
      origin: url.values('origin'),
      contentType: url.values('contentType'),
      genre: url.values('genre'),
      page: url.page,
    }),
  );

  const detailsQuery = useGetParticipantQuery(selectedId ?? '', { skip: !selectedId });
  const contentTypeLabels = toLabelMap(filtersQuery.data?.contentTypes ?? []);
  const genreLabels = toLabelMap(filtersQuery.data?.genres ?? []);
  const isRefreshing = listQuery.isFetching && !listQuery.isLoading;

  return (
    <div className={cn(catalogLayout.root, className)}>
      {filtersQuery.data ? (
        <ParticipantsFilter
          filters={filtersQuery.data}
          labels={labels}
          className={catalogLayout.filters}
        />
      ) : (
        <FiltersSkeleton />
      )}

      <div className={CONTENT_CLASS}>
        {listQuery.isError && <p className="typo-text-3">{labels.error}</p>}
        {listQuery.data?.items.length === 0 && <p className="typo-text-3">{labels.empty}</p>}

        {listQuery.isLoading ? (
          <div className={GRID_CLASS}>
            {Array.from({ length: SKELETON_COUNT }, (_, index) => (
              <Skeleton key={index} className="aspect-square" />
            ))}
          </div>
        ) : (
          <ul
            aria-busy={isRefreshing}
            className={cn(GRID_CLASS, 'transition-opacity', isRefreshing && 'opacity-50')}
          >
            {listQuery.data?.items.map((participant) => (
              <li
                key={participant.id}
                className="contents"
                onMouseEnter={() => prefetchParticipant(participant.id)}
                onFocus={() => prefetchParticipant(participant.id)}
              >
                <ParticipantCard
                  participant={participant}
                  href={withQuery(ROUTES.participant(participant.id))}
                />
              </li>
            ))}
          </ul>
        )}

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
        {detailsQuery.isLoading && <ParticipantDetailsSkeleton />}
        {detailsQuery.data && (
          <ParticipantDetails
            participant={detailsQuery.data}
            labels={labels}
            contentTypeLabels={contentTypeLabels}
            projectsSlot={
              detailsQuery.data.projects.length > 0 ? (
                <ProjectsCarousel labels={{ previous: labels.previous, next: labels.next }}>
                  {detailsQuery.data.projects.map((project) => (
                    <li key={project.id} className="snap-start">
                      <ProjectPosterCard
                        project={project}
                        contentTypeLabel={contentTypeLabels[project.contentType] ?? ''}
                        genreLabels={project.genres.map((genre) => genreLabels[genre] ?? genre)}
                      />
                    </li>
                  ))}
                </ProjectsCarousel>
              ) : null
            }
          />
        )}
      </Modal>
    </div>
  );
}
