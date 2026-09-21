import { defineSnippet, langParamsSchema } from '@/shared/api';
import { bannerListSchema } from '../model/schema';

export const getBannersContract = defineSnippet({
  name: 'getBanners',
  params: langParamsSchema,
  response: bannerListSchema,
  auth: false,
});
