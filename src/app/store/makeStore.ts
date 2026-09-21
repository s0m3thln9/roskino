import { configureStore } from '@reduxjs/toolkit';
import { sessionSlice } from '@/entities/session';
import { baseApi } from '@/shared/api';

export const makeStore = () =>
  configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      [sessionSlice.reducerPath]: sessionSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
