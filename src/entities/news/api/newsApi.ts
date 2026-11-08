import { baseApi, bffRequest, type SnippetResponse } from '@/shared/api';
import type { SearchNewsParams } from '../model/schema';
import { searchNewsContract } from './contracts';

export const newsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    searchNews: build.query<SnippetResponse<typeof searchNewsContract>, SearchNewsParams>({
      query: (params) => bffRequest(searchNewsContract, params),
      extraOptions: { schema: searchNewsContract.response },
    }),
  }),
});

export const { useSearchNewsQuery } = newsApi;
