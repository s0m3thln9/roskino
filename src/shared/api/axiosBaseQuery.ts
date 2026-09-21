import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { type AxiosError, type Method } from 'axios';
import type { z } from 'zod';
import { apiUnauthorized } from './events';
import { codeFromStatus, isApiErrorPayload, type ApiErrorPayload } from './errors';

export type AxiosQueryArgs = {
  url: string;
  method?: Method;
  data?: unknown;
  params?: Record<string, unknown>;
};

export type AxiosQueryExtraOptions = {
  schema?: z.ZodType;
};

export const clientHttp = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

function toErrorPayload(error: unknown): ApiErrorPayload {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<unknown>;
    const body = axiosError.response?.data;
    if (isApiErrorPayload(body)) return body;

    const status = axiosError.response?.status;
    if (status) return { status, code: codeFromStatus(status), message: axiosError.message };
    return { status: 0, code: 'NETWORK_ERROR', message: axiosError.message };
  }

  return {
    status: 0,
    code: 'INTERNAL_ERROR',
    message: error instanceof Error ? error.message : 'Unknown error',
  };
}

export const axiosBaseQuery =
  (): BaseQueryFn<AxiosQueryArgs, unknown, ApiErrorPayload, AxiosQueryExtraOptions> =>
  async ({ url, method = 'POST', data, params }, api, extraOptions) => {
    try {
      const response = await clientHttp.request<unknown>({
        url,
        method,
        data,
        params,
        signal: api.signal,
      });

      const schema = extraOptions?.schema;
      if (!schema) return { data: response.data };

      const parsed = schema.safeParse(response.data);
      if (!parsed.success) {
        return {
          error: { status: 500, code: 'INVALID_RESPONSE', message: parsed.error.message },
        };
      }
      return { data: parsed.data };
    } catch (error) {
      const payload = toErrorPayload(error);
      if (payload.status === 401) api.dispatch(apiUnauthorized());
      return { error: payload };
    }
  };
