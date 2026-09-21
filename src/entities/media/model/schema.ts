import { z } from 'zod';
import { imageSchema, localeSchema, videoSchema } from '@/shared/api';

export const mediaTypeSchema = z.enum(['photo', 'video']);

export const mediaItemSchema = z.discriminatedUnion('type', [
  z.object({
    id: z.string(),
    type: z.literal('photo'),
    year: z.number().int(),
    image: imageSchema,
    caption: z.string().optional(),
  }),
  z.object({
    id: z.string(),
    type: z.literal('video'),
    year: z.number().int(),
    image: imageSchema,
    video: videoSchema,
    caption: z.string().optional(),
  }),
]);

export const getMediaParamsSchema = z.object({
  lang: localeSchema,
  type: mediaTypeSchema.optional(),
  year: z.coerce.number().int().optional(),
});

export const mediaResponseSchema = z.object({
  years: z.array(z.number().int()),
  year: z.number().int(),
  items: z.array(mediaItemSchema),
});

export const archiveEditionSchema = z.object({
  year: z.number().int(),
  title: z.string(),
  dates: z.string(),
  summary: z.string(),
  cover: imageSchema.nullable().default(null),
});

export const archiveResponseSchema = z.object({
  editions: z.array(archiveEditionSchema),
});

export type MediaType = z.infer<typeof mediaTypeSchema>;
export type MediaItem = z.infer<typeof mediaItemSchema>;
export type MediaResponse = z.infer<typeof mediaResponseSchema>;
export type ArchiveEdition = z.infer<typeof archiveEditionSchema>;
