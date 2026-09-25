'use client';

import { useSearchParams } from 'next/navigation';
import {
  ProjectCard,
  ProjectDetails,
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
import { Modal, Pagination } from '@/shared/ui';

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
  const listQuery = useGetProjectsQuery({
    contentType: url.values('contentType') as never,
    genre: url.values('genre') as never,
    page: url.page,
  });
  const detailsQuery = useGetProjectQuery(selectedId ?? '', { skip: !selectedId });

  const contentTypeLabels = toLabelMap(filtersQuery.data?.contentTypes ?? []);
  const genreLabels = toLabelMap(filtersQuery.data?.genres ?? []);
  const project = detailsQuery.data;

  return (
    <div className={cn('flex flex-col gap-10 lg:flex-row', className)}>
      {filtersQuery.data && (
        <ProjectsFilter
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
          {listQuery.data?.items.map((item) => (
            <li key={item.id} className="contents">
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
        {detailsQuery.isLoading && <p className="typo-text-3 text-white">{labels.loading}</p>}
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
