import { baseApi, bffRequest, type SnippetResponse } from '@/shared/api';
import { getMeContract } from './contracts';

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<SnippetResponse<typeof getMeContract>, void>({
      query: () => bffRequest(getMeContract, {}),
      extraOptions: { schema: getMeContract.response },
      providesTags: ['Me'],
    }),
  }),
});

export const { useGetMeQuery } = sessionApi;
