import 'server-only';
import { serverEnv } from '@/shared/config/server';
import { AUTH_HEADER_NAME, formatAuthHeader } from '../config';
import type { SnippetContract, SnippetParams, SnippetResponse } from '../contract';
import { ApiError } from '../errors';
import { normalizeHttpError, serverHttp } from './http.server';
import { getMockHandler, mockDelay } from './mocks.server';
import { clearSession, getSessionToken } from './session.server';

async function requestBackend(
  contract: SnippetContract,
  params: unknown,
  token: string | null,
): Promise<unknown> {
  const headers = token ? { [AUTH_HEADER_NAME]: formatAuthHeader(token) } : undefined;
  const response = await serverHttp.post<unknown>(`/${contract.name}`, params, { headers });
  return response.data;
}

async function requestMock(
  contract: SnippetContract,
  params: unknown,
  token: string | null,
): Promise<unknown> {
  const handler = getMockHandler(contract.name);
  if (!handler) {
    throw new ApiError(
      501,
      `No mock handler registered for snippet "${contract.name}". Register it in src/app/mocks.`,
      'INTERNAL_ERROR',
    );
  }

  await mockDelay();

  if (contract.auth && !token) {
    await clearSession();
    throw new ApiError(401, 'Authorization required', 'UNAUTHORIZED');
  }

  try {
    return await handler(params, { token });
  } catch (error) {
    const apiError = normalizeHttpError(error);
    if (apiError.status === 401) await clearSession();
    throw apiError;
  }
}

type CallSnippetOptions = {
  token?: string | null;
};

export async function executeSnippet(
  contract: SnippetContract,
  params: unknown,
  options: CallSnippetOptions = {},
): Promise<unknown> {
  const parsedParams = contract.params.safeParse(params);
  if (!parsedParams.success) {
    throw new ApiError(400, parsedParams.error.message, 'VALIDATION_ERROR');
  }

  const token =
    options.token !== undefined ? options.token : contract.auth ? await getSessionToken() : null;

  const raw = serverEnv.USE_MOCKS
    ? await requestMock(contract, parsedParams.data, token)
    : await requestBackend(contract, parsedParams.data, token);

  const parsedResponse = contract.response.safeParse(raw);
  if (!parsedResponse.success) {
    throw new ApiError(
      502,
      `Invalid response for "${contract.name}": ${parsedResponse.error.message}`,
      'INVALID_RESPONSE',
    );
  }

  return parsedResponse.data;
}

export async function callSnippet<C extends SnippetContract>(
  contract: C,
  params: SnippetParams<C>,
  options: CallSnippetOptions = {},
): Promise<SnippetResponse<C>> {
  return (await executeSnippet(contract, params, options)) as SnippetResponse<C>;
}
