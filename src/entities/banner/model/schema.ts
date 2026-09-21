import { z } from 'zod';
import { imageSchema } from '@/shared/api';

export const MAX_BANNERS = 10;

export const bannerSchema = z.object({
  id: z.string(),
  title: z.string(),
  image: imageSchema,
  href: z.string().min(1),
  openInNewTab: z.boolean().default(false),
});

export const bannerListSchema = z.array(bannerSchema).max(MAX_BANNERS);

export type Banner = z.infer<typeof bannerSchema>;
