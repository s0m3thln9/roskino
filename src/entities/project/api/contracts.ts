import { defineSnippet, emptyParamsSchema } from '@/shared/api';
import {
  catalogFiltersSchema,
  getProjectParamsSchema,
  getProjectsParamsSchema,
  projectListSchema,
  projectSchema,
} from '../model/schema';

export const getProjectsContract = defineSnippet({
  name: 'getProjects',
  params: getProjectsParamsSchema,
  response: projectListSchema,
  auth: true,
});

export const getProjectContract = defineSnippet({
  name: 'getProject',
  params: getProjectParamsSchema,
  response: projectSchema,
  auth: true,
});

export const getFiltersContract = defineSnippet({
  name: 'getFilters',
  params: emptyParamsSchema,
  response: catalogFiltersSchema,
  auth: true,
});
