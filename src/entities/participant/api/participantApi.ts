import { baseApi, bffRequest, type SnippetResponse } from '@/shared/api';
import type { GetParticipantsParams } from '../model/schema';
import { getParticipantContract, getParticipantsContract } from './contracts';

export const participantApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getParticipants: build.query<
      SnippetResponse<typeof getParticipantsContract>,
      GetParticipantsParams
    >({
      query: (params) => bffRequest(getParticipantsContract, params),
      extraOptions: { schema: getParticipantsContract.response },
      providesTags: (result) => [
        { type: 'Participant', id: 'LIST' },
        ...(result?.items.map(({ id }) => ({ type: 'Participant' as const, id })) ?? []),
      ],
    }),
    getParticipant: build.query<SnippetResponse<typeof getParticipantContract>, string>({
      query: (id) => bffRequest(getParticipantContract, { id }),
      extraOptions: { schema: getParticipantContract.response },
      providesTags: (result, _error, id) => [
        { type: 'Participant', id },
        ...(result?.projects.map((project) => ({ type: 'Project' as const, id: project.id })) ??
          []),
      ],
    }),
  }),
});

export const { useGetParticipantsQuery, useGetParticipantQuery } = participantApi;
