import { defineSnippet, langParamsSchema } from '@/shared/api';
import { siteSettingsSchema } from '../model/schema';

export const getSiteSettingsContract = defineSnippet({
  name: 'getSiteSettings',
  params: langParamsSchema,
  response: siteSettingsSchema,
  auth: false,
});
