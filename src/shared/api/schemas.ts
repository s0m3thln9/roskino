import { z } from 'zod';

export const localeSchema = z.enum(['ru', 'en']);

export const langParamsSchema = z.object({ lang: localeSchema });

export const emptyParamsSchema = z.object({}).default({});

export const imageSchema = z.object({
  url: z.string().min(1),
  alt: z.string().default(''),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});

export type ImageAsset = z.infer<typeof imageSchema>;

export const videoSchema = z.object({
  url: z.string().min(1),
  poster: imageSchema.nullable().default(null),
  title: z.string().optional(),
  duration: z.string().optional(),
});

export type VideoAsset = z.infer<typeof videoSchema>;

export const personSchema = z.object({
  name: z.string(),
  position: z.string().optional(),
  email: z.email().optional(),
  phone: z.string().optional(),
  photo: imageSchema.nullable().default(null),
});

export type Person = z.infer<typeof personSchema>;

export const paginationParamsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(15),
});

export function paginatedSchema<T extends z.ZodType>(item: T) {
  return z.object({
    items: z.array(item),
    page: z.number().int().min(1),
    limit: z.number().int().min(1),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
  });
}

export type Paginated<T> = {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export const okResponseSchema = z.object({ ok: z.literal(true) });
