import { z } from 'zod';
import {
  imageSchema,
  paginatedSchema,
  paginationParamsSchema,
  personSchema,
  videoSchema,
} from '@/shared/api';

export const PROJECTS_PAGE_SIZE = 15;

export const CONTENT_TYPES = ['animation', 'feature-film', 'series', 'documentary'] as const;
export const contentTypeSchema = z.enum(CONTENT_TYPES);

export const GENRES = [
  'action',
  'adventure',
  'comedy',
  'drama',
  'fantasy',
  'musical',
  'romance',
  'sci-fi',
] as const;
export const genreSchema = z.enum(GENRES);

export const filterOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const screeningSchema = z.object({
  startsAt: z.iso.datetime({ offset: true }),
  location: z.string(),
  room: z.string(),
  section: z.string(),
});

export const participantRefSchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: imageSchema.nullable().default(null),
});

export const projectPreviewSchema = z.object({
  id: z.string(),
  title: z.string(),
  poster: imageSchema.nullable().default(null),
  contentType: contentTypeSchema,
  genres: z.array(genreSchema),
  ageRating: z.string(),
  country: z.string(),
  year: z.number().int(),
  screening: screeningSchema.nullable().default(null),
  isFavorite: z.boolean().default(false),
});

export const projectSchema = projectPreviewSchema.extend({
  description: z.string(),
  lengthMinutes: z.number().int().positive().nullable().default(null),
  releaseInRussia: z.string().nullable().default(null),
  status: z.string(),
  productionCompanies: z.array(z.string()),
  directors: z.array(z.string()),
  producers: z.array(z.string()),
  writers: z.array(z.string()),
  trailer: videoSchema.nullable().default(null),
  stills: z.array(imageSchema).default([]),
  participant: participantRefSchema,
  representative: personSchema,
});

export const getProjectsParamsSchema = paginationParamsSchema.extend({
  contentType: z.array(contentTypeSchema).default([]),
  genre: z.array(genreSchema).default([]),
  limit: z.coerce.number().int().min(1).max(100).default(PROJECTS_PAGE_SIZE),
});

export const getProjectParamsSchema = z.object({ id: z.string().min(1) });

export const projectListSchema = paginatedSchema(projectPreviewSchema);

export const catalogFiltersSchema = z.object({
  origins: z.array(filterOptionSchema),
  contentTypes: z.array(filterOptionSchema),
  genres: z.array(filterOptionSchema),
});

export type ContentType = z.infer<typeof contentTypeSchema>;
export type Genre = z.infer<typeof genreSchema>;
export type FilterOptionItem = z.infer<typeof filterOptionSchema>;
export type Screening = z.infer<typeof screeningSchema>;
export type ParticipantRef = z.infer<typeof participantRefSchema>;
export type ProjectPreview = z.infer<typeof projectPreviewSchema>;
export type Project = z.infer<typeof projectSchema>;
export type ProjectList = z.infer<typeof projectListSchema>;
export type GetProjectsParams = z.input<typeof getProjectsParamsSchema>;
export type CatalogFilters = z.infer<typeof catalogFiltersSchema>;
