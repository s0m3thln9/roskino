import { z } from 'zod';
import { imageSchema } from '@/shared/api';

export const DEFAULT_MAP_COORDINATES = { lat: 55.756244, lng: 37.601155 };
export const DEFAULT_MAP_ZOOM = 16;

export const socialLinkSchema = z.object({
  type: z.enum(['telegram', 'max']),
  url: z.url(),
  label: z.string(),
});

const emailListSchema = z.array(z.string().trim().pipe(z.email())).max(2);

export const siteSettingsSchema = z.object({
  organization: z
    .object({
      name: z.string(),
      addressLines: z.array(z.string()),
      phone: z.string(),
      email: z
        .string()
        .transform((value) => value.split(/[,;\n]+/).filter((part) => part.trim()))
        .pipe(emailListSchema)
        .optional(),
      emails: emailListSchema.optional(),
      ogrn: z.string(),
      copyright: z.string(),
    })
    .transform(({ email, emails, ...organization }) => ({
      ...organization,
      emails: [...new Set(emails?.length ? emails : email)],
    })),
  socials: z.array(socialLinkSchema),
  map: z.object({
    image: imageSchema,
    coordinates: z
      .object({ lat: z.number().min(-90).max(90), lng: z.number().min(-180).max(180) })
      .default(DEFAULT_MAP_COORDINATES),
    zoom: z.number().min(0).max(21).default(DEFAULT_MAP_ZOOM),
    directionsUrl: z.url(),
    directionsLabel: z.string(),
  }),
  accreditation: z
    .object({
      url: z.url(),
      label: z.string(),
      shortLabel: z.string().nullable().default(null),
    })
    .nullable()
    .default(null),
});

export type SocialLink = z.infer<typeof socialLinkSchema>;
export type SiteSettings = z.infer<typeof siteSettingsSchema>;
