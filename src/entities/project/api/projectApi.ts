import { baseApi, bffRequest, type SnippetResponse } from '@/shared/api';
import type { GetProjectsParams } from '../model/schema';
import { getFiltersContract, getProjectContract, getProjectsContract } from './contracts';

export const projectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProjects: build.query<SnippetResponse<typeof getProjectsContract>, GetProjectsParams>({
      query: (params) => bffRequest(getProjectsContract, params),
      extraOptions: { schema: getProjectsContract.response },
      providesTags: (result) => [
        { type: 'Project', id: 'LIST' },
        ...(result?.items.map(({ id }) => ({ type: 'Project' as const, id })) ?? []),
      ],
    }),
    getProject: build.query<SnippetResponse<typeof getProjectContract>, string>({
      query: (id) => bffRequest(getProjectContract, { id }),
      extraOptions: { schema: getProjectContract.response },
      providesTags: (_result, _error, id) => [{ type: 'Project', id }],
    }),
    getFilters: build.query<SnippetResponse<typeof getFiltersContract>, void>({
      query: () => bffRequest(getFiltersContract, {}),
      extraOptions: { schema: getFiltersContract.response },
      providesTags: ['Filters'],
      keepUnusedDataFor: 3600,
    }),
  }),
});

export const { useGetProjectsQuery, useGetProjectQuery, useGetFiltersQuery } = projectApi;
