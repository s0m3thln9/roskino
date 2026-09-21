import { defineSnippet, langParamsSchema } from '@/shared/api';
import { eventSchema } from '../model/schema';

export const getEventContract = defineSnippet({
  name: 'getEvent',
  params: langParamsSchema,
  response: eventSchema,
  auth: false,
});
