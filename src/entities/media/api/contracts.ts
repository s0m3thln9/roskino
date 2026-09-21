import { defineSnippet, langParamsSchema } from '@/shared/api';
import { archiveResponseSchema, getMediaParamsSchema, mediaResponseSchema } from '../model/schema';

export const getMediaContract = defineSnippet({
  name: 'getMedia',
  params: getMediaParamsSchema,
  response: mediaResponseSchema,
  auth: false,
});

export const getArchiveContract = defineSnippet({
  name: 'getArchive',
  params: langParamsSchema,
  response: archiveResponseSchema,
  auth: false,
});
