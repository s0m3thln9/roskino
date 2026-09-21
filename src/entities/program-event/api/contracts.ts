import { defineSnippet } from '@/shared/api';
import {
  getProgramEventParamsSchema,
  getProgramParamsSchema,
  getProgramSummaryParamsSchema,
  programEventSchema,
  programResponseSchema,
  programSummarySchema,
} from '../model/schema';

export const getProgramSummaryContract = defineSnippet({
  name: 'getProgramSummary',
  params: getProgramSummaryParamsSchema,
  response: programSummarySchema,
  auth: false,
});

export const getProgramContract = defineSnippet({
  name: 'getProgram',
  params: getProgramParamsSchema,
  response: programResponseSchema,
  auth: true,
});

export const getProgramEventContract = defineSnippet({
  name: 'getProgramEvent',
  params: getProgramEventParamsSchema,
  response: programEventSchema,
  auth: true,
});
