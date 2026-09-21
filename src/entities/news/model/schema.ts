import { z } from 'zod';
import {
  imageSchema,
  localeSchema,
  paginatedSchema,
  paginationParamsSchema,
  videoSchema,
} from '@/shared/api';

export const NEWS_PAGE_SIZE = 6;

export const newsPreviewSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  publishedAt: z.iso.date(),
  cover: imageSchema.nullable().default(null),
});

export const newsBlockSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('paragraph'), text: z.string() }),
  z.object({
    type: z.literal('quote'),
    text: z.string(),
    author: z.string(),
    position: z.string().optional(),
  }),
  z.object({ type: z.literal('highlight'), text: z.string() }),
]);

export const newsItemSchema = newsPreviewSchema.extend({
  blocks: z.array(newsBlockSchema),
  photos: z.array(imageSchema).default([]),
  videos: z.array(videoSchema).default([]),
  credits: z.array(z.string()).default([]),
});

export const getNewsParamsSchema = paginationParamsSchema.extend({
  lang: localeSchema,
  limit: z.coerce.number().int().min(1).max(50).default(NEWS_PAGE_SIZE),
});

export const getNewsItemParamsSchema = z.object({
  slug: z.string().min(1),
  lang: localeSchema,
});

export const newsListSchema = paginatedSchema(newsPreviewSchema);

export type NewsPreview = z.infer<typeof newsPreviewSchema>;
export type NewsBlock = z.infer<typeof newsBlockSchema>;
export type NewsItem = z.infer<typeof newsItemSchema>;
export type NewsList = z.infer<typeof newsListSchema>;
