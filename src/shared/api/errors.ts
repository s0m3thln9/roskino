import { z } from 'zod';

export const API_ERROR_CODES = [
  'BAD_REQUEST',
  'UNAUTHORIZED',
  'FORBIDDEN',
  'NOT_FOUND',
  'VALIDATION_ERROR',
  'INVALID_RESPONSE',
  'NETWORK_ERROR',
  'INTERNAL_ERROR',
] as const;

export type ApiErrorCode = (typeof API_ERROR_CODES)[number];

export const apiErrorPayloadSchema = z.object({
  status: z.number().int(),
  code: z.enum(API_ERROR_CODES),
  message: z.string(),
});

export type ApiErrorPayload = z.infer<typeof apiErrorPayloadSchema>;

const STATUS_TO_CODE: Record<number, ApiErrorCode> = {
  400: 'BAD_REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  422: 'VALIDATION_ERROR',
};

export function codeFromStatus(status: number): ApiErrorCode {
  return STATUS_TO_CODE[status] ?? (status >= 500 ? 'INTERNAL_ERROR' : 'BAD_REQUEST');
}

export class ApiError extends Error {
  readonly status: number;
  readonly code: ApiErrorCode;

  constructor(status: number, message: string, code: ApiErrorCode = codeFromStatus(status)) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }

  toPayload(): ApiErrorPayload {
    return { status: this.status, code: this.code, message: this.message };
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function isApiErrorPayload(value: unknown): value is ApiErrorPayload {
  return apiErrorPayloadSchema.safeParse(value).success;
}
