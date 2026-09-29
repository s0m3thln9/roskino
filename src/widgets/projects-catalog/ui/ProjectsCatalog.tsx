'use client';

import { useSearchParams } from 'next/navigation';
import {
  projectApi,
  ProjectCard,
  ProjectDetails,
  toProjectsParams,
  useGetFiltersQuery,
  useGetProjectQuery,
  useGetProjectsQuery,
  type CatalogFilters,
} from '@/entities/project';
import { AddToFavoritesButton } from '@/features/add-to-favorites';
import { ProjectsFilter } from '@/features/filter-projects';
import { ROUTES } from '@/shared/config';
import { useRouter } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import { useUrlFilters } from '@/shared/model';
import { catalogLayout, FiltersSkeleton, Modal, Pagination, Skeleton } from '@/shared/ui';

export type ProjectsCatalogLabels = {
  contentType: string;
  genre: string;
  reset: string;
  clear: string;
  loading: string;
  empty: string;
  error: string;
  close: string;
  paginationNav: string;
  previous: string;
  next: string;
  page: string;
  play: string;
  description: string;
  stills: string;
  mainTrailer: string;
  otherProjects: string;
  ageRating: string;
  length: string;
  type: string;
  genreLabel: string;
  releaseInRussia: string;
  status: string;
  productionCompanies: string;
  directors: string;
  producers: string;
  writers: string;
  minutes: string;
  addToFavorites: string;
  addedToFavorites: string;
  favoritesError: string;
};

const FILTER_KEYS = ['contentType', 'genre'] as const;
const CONTENT_CLASS = cn(catalogLayout.content, 'lg:max-w-content');
const GRID_CLASS = 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3';
const CARD_SKELETON_CLASS = 'aspect-[320/660]';
const SKELETON_COUNT = 9;

function CardsSkeleton() {
  return (
    <div aria-hidden className={GRID_CLASS}>
      {Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <Skeleton key={index} className={CARD_SKELETON_CLASS} />
      ))}
    </div>
  );
}

export function ProjectsCatalogSkeleton() {
  return (
    <div className={catalogLayout.root}>
      <FiltersSkeleton />
      <div className={CONTENT_CLASS}>
        <CardsSkeleton />
      </div>
    </div>
  );
}

function toLabelMap(options: CatalogFilters['contentTypes']) {
  return Object.fromEntries(options.map((option) => [option.value, option.label]));
}

export function ProjectsCatalog({
  labels,
  selectedId,
  className,
}: {
  labels: ProjectsCatalogLabels;
  selectedId?: string;
  className?: string;
}) {
  const url = useUrlFilters(FILTER_KEYS);
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const withQuery = (path: string) => (query ? `${path}?${query}` : path);

  const filtersQuery = useGetFiltersQuery();
  const prefetchProject = projectApi.usePrefetch('getProject');
  const listQuery = useGetProjectsQuery(
    toProjectsParams({
      contentType: url.values('contentType'),
      genre: url.values('genre'),
      page: url.page,
    }),
  );
  const detailsQuery = useGetProjectQuery(selectedId ?? '', { skip: !selectedId });

  const contentTypeLabels = toLabelMap(filtersQuery.data?.contentTypes ?? []);
  const genreLabels = toLabelMap(filtersQuery.data?.genres ?? []);
  const project = detailsQuery.data;
  const isRefreshing = listQuery.isFetching && !listQuery.isLoading;

  return (
    <div className={cn(catalogLayout.root, className)}>
      {filtersQuery.data ? (
        <ProjectsFilter
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

        {listQuery.isLoading && <CardsSkeleton />}
        <ul
          aria-busy={isRefreshing}
          className={cn(GRID_CLASS, 'transition-opacity', isRefreshing && 'opacity-50')}
        >
          {listQuery.data?.items.map((item) => (
            <li
              key={item.id}
              className="contents"
              onMouseEnter={() => prefetchProject(item.id)}
              onFocus={() => prefetchProject(item.id)}
            >
              <ProjectCard
                project={item}
                href={withQuery(ROUTES.project(item.id))}
                contentTypeLabel={contentTypeLabels[item.contentType] ?? ''}
                genreLabels={item.genres.map((genre) => genreLabels[genre] ?? genre)}
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
        onClose={() => router.push(withQuery(ROUTES.projects))}
        closeLabel={labels.close}
        className="bg-black/90 text-white backdrop-blur-panel"
      >
        {detailsQuery.isLoading && (
          <div aria-hidden className="flex flex-col gap-10 lg:flex-row">
            <Skeleton className="aspect-[3/4] w-full bg-white/10 lg:w-100" />
            <div className="flex flex-1 flex-col gap-4">
              <Skeleton className="h-10 w-3/4 bg-white/10" />
              <Skeleton className="h-5 w-1/2 bg-white/10" />
              <Skeleton className="h-5 w-2/3 bg-white/10" />
            </div>
          </div>
        )}
        {project && (
          <ProjectDetails
            project={project}
            contentTypeLabel={contentTypeLabels[project.contentType] ?? ''}
            genreLabels={project.genres.map((genre) => genreLabels[genre] ?? genre)}
            labels={{ ...labels, genre: labels.genreLabel }}
            favoriteSlot={
              <AddToFavoritesButton
                projectId={project.id}
                isFavorite={project.isFavorite}
                labels={{
                  add: labels.addToFavorites,
                  added: labels.addedToFavorites,
                  error: labels.favoritesError,
                }}
              />
            }
          />
        )}
      </Modal>
    </div>
  );
}
