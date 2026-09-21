import 'server-only';
import { cache } from 'react';
import { isApiError } from '@/shared/api';
import { callSnippet, hasSession } from '@/shared/api/server';
import { getMeContract } from './contracts';

export const getCurrentUser = cache(async () => {
  if (!(await hasSession())) return null;
  try {
    return await callSnippet(getMeContract, {});
  } catch (error) {
    if (isApiError(error) && error.status === 401) return null;
    throw error;
  }
});
