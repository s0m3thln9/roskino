import { z } from 'zod';
import { imageSchema } from '@/shared/api';

export const partnerSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  website: z.url(),
  websiteLabel: z.string(),
  logo: imageSchema.nullable().default(null),
});

export const partnerGroupSchema = z.object({
  type: z.string(),
  title: z.string(),
  partners: z.array(partnerSchema),
});

export const partnerGroupsSchema = z.array(partnerGroupSchema);

export type Partner = z.infer<typeof partnerSchema>;
export type PartnerGroup = z.infer<typeof partnerGroupSchema>;
