import 'server-only';
import { cache } from 'react';
import { isApiError } from '@/shared/api';
import { callSnippet } from '@/shared/api/server';
import { getParticipantContract } from './contracts';

export const getParticipant = cache(async (id: string) => {
  try {
    return await callSnippet(getParticipantContract, { id });
  } catch (error) {
    if (isApiError(error) && error.status === 404) return null;
    throw error;
  }
});
