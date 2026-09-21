import { createApi } from '@reduxjs/toolkit/query/react';
import { AUTH_BASE_PATH, BFF_BASE_PATH } from './config';
import type { SnippetContract, SnippetParams } from './contract';
import { axiosBaseQuery, type AxiosQueryArgs } from './axiosBaseQuery';

export const API_TAGS = [
  'Me',
  'Filters',
  'Participant',
  'Project',
  'Favorites',
  'Program',
] as const;

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  tagTypes: API_TAGS,
  endpoints: () => ({}),
});

const stripApiPrefix = (path: string) => path.replace(/^\/api/, '');

export function bffRequest<C extends SnippetContract>(
  contract: C,
  params: SnippetParams<C>,
): AxiosQueryArgs {
  return { url: `${stripApiPrefix(BFF_BASE_PATH)}/${contract.name}`, method: 'POST', data: params };
}

export function authRequest(action: 'login' | 'logout', data?: unknown): AxiosQueryArgs {
  return { url: `${stripApiPrefix(AUTH_BASE_PATH)}/${action}`, method: 'POST', data };
}
