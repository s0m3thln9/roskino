import { z } from 'zod';
import { localeSchema, personSchema } from '@/shared/api';
import { projectPreviewSchema } from '@/entities/project/@x/program-event';

export const PROGRAM_CATEGORIES = [
  'plenary',
  'presentation',
  'screening',
  'business',
  'break',
] as const;
export const programCategorySchema = z.enum(PROGRAM_CATEGORIES);

export const programSummaryEventSchema = z.object({
  id: z.string(),
  startsAt: z.iso.datetime({ offset: true }),
  endsAt: z.iso.datetime({ offset: true }),
  title: z.string(),
  category: programCategorySchema,
});

export const programSummarySchema = z.object({
  days: z.array(
    z.object({
      date: z.iso.date(),
      label: z.string(),
      rooms: z.array(
        z.object({
          name: z.string(),
          events: z.array(programSummaryEventSchema),
        }),
      ),
    }),
  ),
});

export const programEventPreviewSchema = z.object({
  id: z.string(),
  kind: z.enum(['session', 'break']),
  title: z.string(),
  startsAt: z.iso.datetime({ offset: true }),
  endsAt: z.iso.datetime({ offset: true }),
  date: z.iso.date(),
  location: z.string(),
  room: z.string().nullable().default(null),
  place: z.string().nullable().default(null),
  category: programCategorySchema,
  hasDetails: z.boolean(),
});

export const programProjectSchema = projectPreviewSchema.extend({
  lengthMinutes: z.number().int().positive().nullable().default(null),
  description: z.string(),
});

export const programEventSchema = programEventPreviewSchema.extend({
  topic: z.string().nullable().default(null),
  participants: z.array(personSchema).default([]),
  moderators: z.array(personSchema).default([]),
  projects: z.array(programProjectSchema).default([]),
});

export const programFiltersSchema = z.object({
  dates: z.array(z.object({ value: z.iso.date(), label: z.string() })),
  locations: z.array(z.object({ value: z.string(), label: z.string() })),
  rooms: z.array(z.object({ value: z.string(), label: z.string() })),
});

export const getProgramParamsSchema = z.object({
  date: z.iso.date().optional(),
  location: z.string().optional(),
  room: z.string().optional(),
});

export const programResponseSchema = z.object({
  filters: programFiltersSchema,
  events: z.array(programEventPreviewSchema),
});

export const getProgramEventParamsSchema = z.object({ id: z.string().min(1) });

export const getProgramSummaryParamsSchema = z.object({ lang: localeSchema });

export type ProgramCategory = z.infer<typeof programCategorySchema>;
export type ProgramSummary = z.infer<typeof programSummarySchema>;
export type ProgramSummaryEvent = z.infer<typeof programSummaryEventSchema>;
export type ProgramEventPreview = z.infer<typeof programEventPreviewSchema>;
export type ProgramProject = z.infer<typeof programProjectSchema>;
export type ProgramEvent = z.infer<typeof programEventSchema>;
export type ProgramFilters = z.infer<typeof programFiltersSchema>;
export type ProgramResponse = z.infer<typeof programResponseSchema>;
export type GetProgramParams = z.input<typeof getProgramParamsSchema>;
