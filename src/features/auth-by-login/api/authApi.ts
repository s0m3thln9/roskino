import { sessionApi, type LoginParams } from '@/entities/session';
import { authRequest, baseApi } from '@/shared/api';

export const authByLoginApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<{ ok: true }, LoginParams>({
      query: (credentials) => authRequest('login', credentials),
      async onQueryStarted(_credentials, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(baseApi.util.resetApiState());
          await dispatch(sessionApi.endpoints.getMe.initiate(undefined, { forceRefetch: true }));
        } catch {}
      },
    }),
  }),
});

export const { useLoginMutation } = authByLoginApi;
