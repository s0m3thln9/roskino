import { z } from 'zod';
import { imageSchema } from '@/shared/api';

export const eventDetailIconSchema = z.enum(['place', 'dates', 'venue']);
export const eventHighlightIconSchema = z.enum(['program', 'place', 'dates', 'venue']);

export const richTextSegmentSchema = z.object({
  text: z.string(),
  href: z.string().optional(),
});

export const eventDetailSchema = z.object({
  icon: eventDetailIconSchema,
  label: z.string(),
  lines: z.array(z.string()).min(1),
});

export const eventHighlightSchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('number'),
    value: z.string(),
    caption: z.string(),
    text: z.string(),
  }),
  z.object({
    kind: z.literal('icon'),
    icon: eventHighlightIconSchema,
    caption: z.string(),
    text: z.string(),
  }),
]);

export const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  startDate: z.iso.date(),
  endDate: z.iso.date(),
  heroImage: imageSchema.nullable().default(null),
  details: z.array(eventDetailSchema),
  about: z.object({
    title: z.string(),
    body: z.array(richTextSegmentSchema),
  }),
  highlights: z.array(eventHighlightSchema),
  goals: z
    .object({
      title: z.string(),
      items: z.array(z.string()),
    })
    .nullable()
    .default(null),
});

export type RichTextSegment = z.infer<typeof richTextSegmentSchema>;
export type EventDetail = z.infer<typeof eventDetailSchema>;
export type EventHighlight = z.infer<typeof eventHighlightSchema>;
export type MarketEvent = z.infer<typeof eventSchema>;
