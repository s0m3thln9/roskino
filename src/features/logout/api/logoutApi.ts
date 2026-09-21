import { authRequest, baseApi, sessionTerminated } from '@/shared/api';

export const logoutApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    logout: build.mutation<{ ok: true }, void>({
      query: () => authRequest('logout'),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(sessionTerminated());
          dispatch(baseApi.util.resetApiState());
        }
      },
    }),
  }),
});

export const { useLogoutMutation } = logoutApi;
