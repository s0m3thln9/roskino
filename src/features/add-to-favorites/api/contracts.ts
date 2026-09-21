import { z } from 'zod';
import { defineSnippet } from '@/shared/api';

export const addToFavoritesContract = defineSnippet({
  name: 'addToFavorites',
  params: z.object({ projectId: z.string().min(1) }),
  response: z.object({ projectId: z.string(), isFavorite: z.literal(true) }),
  auth: true,
});
