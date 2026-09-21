import { defineSnippet, langParamsSchema } from '@/shared/api';
import { partnerGroupsSchema } from '../model/schema';

export const getPartnersContract = defineSnippet({
  name: 'getPartners',
  params: langParamsSchema,
  response: partnerGroupsSchema,
  auth: false,
});
