import { baseApi, bffRequest, type SnippetResponse } from '@/shared/api';
import type { GetProgramParams } from '../model/schema';
import { getProgramContract, getProgramEventContract } from './contracts';

export const programApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProgram: build.query<SnippetResponse<typeof getProgramContract>, GetProgramParams>({
      query: (params) => bffRequest(getProgramContract, params),
      extraOptions: { schema: getProgramContract.response },
      providesTags: [{ type: 'Program', id: 'LIST' }],
    }),
    getProgramEvent: build.query<SnippetResponse<typeof getProgramEventContract>, string>({
      query: (id) => bffRequest(getProgramEventContract, { id }),
      extraOptions: { schema: getProgramEventContract.response },
      providesTags: (result, _error, id) => [
        { type: 'Program', id },
        ...(result?.projects.map((project) => ({ type: 'Project' as const, id: project.id })) ??
          []),
      ],
    }),
  }),
});

export const { useGetProgramQuery, useGetProgramEventQuery } = programApi;
