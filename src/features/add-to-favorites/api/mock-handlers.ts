import 'server-only';
import { addMockFavorite, mockProjectExists } from '@/entities/project/server';
import { ApiError } from '@/shared/api';
import { defineMockHandler } from '@/shared/api/server';
import { addToFavoritesContract } from './contracts';

export const favoritesMockHandlers = [
  defineMockHandler(addToFavoritesContract, ({ projectId }, { token }) => {
    if (!mockProjectExists(projectId)) throw new ApiError(404, `Project "${projectId}" not found`);
    addMockFavorite(token, projectId);
    return { projectId, isFavorite: true as const };
  }),
];
