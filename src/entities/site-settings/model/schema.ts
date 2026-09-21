import { z } from 'zod';
import { imageSchema } from '@/shared/api';

export const socialLinkSchema = z.object({
  type: z.enum(['telegram', 'max']),
  url: z.url(),
  label: z.string(),
});

export const siteSettingsSchema = z.object({
  organization: z.object({
    name: z.string(),
    addressLines: z.array(z.string()),
    phone: z.string(),
    email: z.email(),
    ogrn: z.string(),
    copyright: z.string(),
  }),
  socials: z.array(socialLinkSchema),
  map: z.object({
    image: imageSchema,
    directionsUrl: z.url(),
    directionsLabel: z.string(),
  }),
});

export type SocialLink = z.infer<typeof socialLinkSchema>;
export type SiteSettings = z.infer<typeof siteSettingsSchema>;
