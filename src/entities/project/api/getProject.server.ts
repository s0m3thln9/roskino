import 'server-only';
import { cache } from 'react';
import { isApiError } from '@/shared/api';
import { callSnippet } from '@/shared/api/server';
import { getProjectContract } from './contracts';

export const getProject = cache(async (id: string) => {
  try {
    return await callSnippet(getProjectContract, { id });
  } catch (error) {
    if (isApiError(error) && error.status === 404) return null;
    throw error;
  }
});
