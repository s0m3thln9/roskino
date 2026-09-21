import { createSlice } from '@reduxjs/toolkit';
import { apiUnauthorized, sessionTerminated } from '@/shared/api';
import { sessionApi } from '../api/sessionApi';
import type { User } from './schema';

export type SessionStatus = 'unknown' | 'authenticated' | 'anonymous';

export type SessionState = {
  status: SessionStatus;
  user: User | null;
};

const initialState: SessionState = {
  status: 'unknown',
  user: null,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(apiUnauthorized, () => ({ status: 'anonymous', user: null }))
      .addCase(sessionTerminated, () => ({ status: 'anonymous', user: null }))
      .addMatcher(sessionApi.endpoints.getMe.matchFulfilled, (_state, { payload }) => ({
        status: 'authenticated',
        user: payload,
      }));
  },
  selectors: {
    selectSessionStatus: (state) => state.status,
    selectSessionUser: (state) => state.user,
    selectIsAuthenticated: (state) => state.status === 'authenticated',
  },
});

export const { selectSessionStatus, selectSessionUser, selectIsAuthenticated } =
  sessionSlice.selectors;
