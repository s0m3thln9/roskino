import 'server-only';
import { ApiError } from '@/shared/api';
import { defineMockHandler } from '@/shared/api/server';
import type { Project, ProjectPreview } from '../model/schema';
import { getFiltersContract, getProjectContract, getProjectsContract } from './contracts';
import { getMockFavorites, participantRefsSeed, projectsSeed } from './mock-data';

type Seed = (typeof projectsSeed)[number];

export const CONTENT_TYPE_LABELS = {
  animation: 'Animation',
  'feature-film': 'Feature Film',
  series: 'Series',
  documentary: 'Documentaries',
} as const;

export const GENRE_LABELS = {
  action: 'Action',
  adventure: 'Adventure',
  comedy: 'Comedy',
  drama: 'Drama',
  fantasy: 'Fantasy',
  musical: 'Musical',
  romance: 'Romance',
  'sci-fi': 'Sci-Fi',
} as const;

function toPreview(seed: Seed, favorites: Set<string>): ProjectPreview {
  return {
    id: seed.id,
    title: seed.title,
    poster: seed.poster,
    contentType: seed.contentType,
    genres: seed.genres,
    ageRating: seed.ageRating,
    country: seed.country,
    year: seed.year,
    screening: seed.screening,
    isFavorite: favorites.has(seed.id),
  };
}

function toProject(seed: Seed, favorites: Set<string>): Project {
  const { participantId, ...rest } = seed;
  return {
    ...rest,
    isFavorite: favorites.has(seed.id),
    participant: {
      id: participantId,
      name: participantRefsSeed[participantId]?.name ?? participantId,
      logo: null,
    },
  };
}

export function findMockProjectPreviews(
  predicate: (seed: Seed) => boolean,
  token: string | null,
): ProjectPreview[] {
  const favorites = getMockFavorites(token);
  return projectsSeed
    .filter(predicate)
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((seed) => toPreview(seed, favorites));
}

export function mockProjectExists(projectId: string): boolean {
  return projectsSeed.some((seed) => seed.id === projectId);
}

export const projectMockHandlers = [
  defineMockHandler(getProjectsContract, ({ contentType, genre, page, limit }, { token }) => {
    const all = findMockProjectPreviews(
      (seed) =>
        (contentType.length === 0 || contentType.includes(seed.contentType)) &&
        (genre.length === 0 || seed.genres.some((item) => genre.includes(item))),
      token,
    );
    const start = (page - 1) * limit;
    return {
      items: all.slice(start, start + limit),
      page,
      limit,
      total: all.length,
      totalPages: Math.max(1, Math.ceil(all.length / limit)),
    };
  }),
  defineMockHandler(getProjectContract, ({ id }, { token }) => {
    const seed = projectsSeed.find((item) => item.id === id);
    if (!seed) throw new ApiError(404, `Project "${id}" not found`);
    return toProject(seed, getMockFavorites(token));
  }),
  defineMockHandler(getFiltersContract, () => ({
    origins: [
      { value: 'russian', label: 'Russian' },
      { value: 'international', label: 'International' },
    ],
    contentTypes: Object.entries(CONTENT_TYPE_LABELS).map(([value, label]) => ({ value, label })),
    genres: Object.entries(GENRE_LABELS).map(([value, label]) => ({ value, label })),
  })),
];

export function findMockProjectScreenings(ids: readonly string[], token: string | null) {
  const favorites = getMockFavorites(token);
  return ids
    .map((id) => projectsSeed.find((seed) => seed.id === id))
    .filter((seed): seed is Seed => seed !== undefined)
    .map((seed) => ({
      ...toPreview(seed, favorites),
      lengthMinutes: seed.lengthMinutes,
      description: seed.description,
    }));
}
