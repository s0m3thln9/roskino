import { defineSnippet } from '@/shared/api';
import {
  getNewsItemParamsSchema,
  getNewsParamsSchema,
  newsItemSchema,
  newsListSchema,
} from '../model/schema';

export const getNewsContract = defineSnippet({
  name: 'getNews',
  params: getNewsParamsSchema,
  response: newsListSchema,
  auth: false,
});

export const getNewsItemContract = defineSnippet({
  name: 'getNewsItem',
  params: getNewsItemParamsSchema,
  response: newsItemSchema,
  auth: false,
});
