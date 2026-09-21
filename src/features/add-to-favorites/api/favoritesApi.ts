import { baseApi, bffRequest, type SnippetResponse } from '@/shared/api';
import { addToFavoritesContract } from './contracts';

export const favoritesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addToFavorites: build.mutation<SnippetResponse<typeof addToFavoritesContract>, string>({
      query: (projectId) => bffRequest(addToFavoritesContract, { projectId }),
      extraOptions: { schema: addToFavoritesContract.response },
      invalidatesTags: (_result, error, projectId) =>
        error ? [] : [{ type: 'Project', id: projectId }, 'Favorites'],
    }),
  }),
});

export const { useAddToFavoritesMutation } = favoritesApi;
