import 'server-only';
import axios, { type AxiosError } from 'axios';
import { serverEnv } from '@/shared/config/server';
import { ApiError, codeFromStatus } from '../errors';
import { clearSession } from './session.server';

type BackendErrorBody = { error?: { code?: string; message?: string }; message?: string };

function readBackendMessage(body: unknown): string | null {
  if (!body || typeof body !== 'object') return null;
  const typed = body as BackendErrorBody;
  return typed.error?.message ?? typed.message ?? null;
}

export function normalizeHttpError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<unknown>;
    const status = axiosError.response?.status;
    if (status) {
      const message = readBackendMessage(axiosError.response?.data) ?? axiosError.message;
      return new ApiError(status, message, codeFromStatus(status));
    }
    return new ApiError(503, axiosError.message, 'NETWORK_ERROR');
  }

  return new ApiError(
    500,
    error instanceof Error ? error.message : 'Unknown error',
    'INTERNAL_ERROR',
  );
}

export const serverHttp = axios.create({
  baseURL: serverEnv.API_URL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

serverHttp.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    const apiError = normalizeHttpError(error);
    if (apiError.status === 401) await clearSession();
    return Promise.reject(apiError);
  },
);
