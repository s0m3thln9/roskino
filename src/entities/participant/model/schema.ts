import { z } from 'zod';
import { imageSchema, paginatedSchema, paginationParamsSchema, personSchema } from '@/shared/api';
import {
  contentTypeSchema,
  genreSchema,
  projectPreviewSchema,
} from '@/entities/project/@x/participant';

export const PARTICIPANTS_PAGE_SIZE = 15;

export const ORIGINS = ['russian', 'international'] as const;
export const originSchema = z.enum(ORIGINS);

export const participantPreviewSchema = z.object({
  id: z.string(),
  name: z.string(),
  website: z.url().nullable().default(null),
  websiteLabel: z.string().nullable().default(null),
  logo: imageSchema.nullable().default(null),
  origin: originSchema,
  contentTypes: z.array(contentTypeSchema),
});

export const participantSchema = participantPreviewSchema.extend({
  addressLines: z.array(z.string()),
  country: z.string().nullable().default(null),
  distributionTerritory: z.string().nullable().default(null),
  about: z.string(),
  achievements: z.string().nullable().default(null),
  genres: z.array(genreSchema).default([]),
  contact: personSchema,
  projects: z.array(projectPreviewSchema).default([]),
});

export const getParticipantsParamsSchema = paginationParamsSchema.extend({
  origin: z.array(originSchema).default([]),
  contentType: z.array(contentTypeSchema).default([]),
  genre: z.array(genreSchema).default([]),
  limit: z.coerce.number().int().min(1).max(100).default(PARTICIPANTS_PAGE_SIZE),
});

export const getParticipantParamsSchema = z.object({ id: z.string().min(1) });

export const participantListSchema = paginatedSchema(participantPreviewSchema);

export type Origin = z.infer<typeof originSchema>;
export type ParticipantPreview = z.infer<typeof participantPreviewSchema>;
export type Participant = z.infer<typeof participantSchema>;
export type ParticipantList = z.infer<typeof participantListSchema>;
export type GetParticipantsParams = z.input<typeof getParticipantsParamsSchema>;
