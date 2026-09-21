export {
  AUTH_BASE_PATH,
  AUTH_HEADER_NAME,
  BFF_BASE_PATH,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  formatAuthHeader,
} from './config';
export {
  defineSnippet,
  type SnippetContract,
  type SnippetParams,
  type SnippetResponse,
} from './contract';
export {
  API_ERROR_CODES,
  ApiError,
  apiErrorPayloadSchema,
  codeFromStatus,
  isApiError,
  isApiErrorPayload,
  type ApiErrorCode,
  type ApiErrorPayload,
} from './errors';
export { apiUnauthorized, sessionTerminated } from './events';
export {
  emptyParamsSchema,
  imageSchema,
  langParamsSchema,
  localeSchema,
  okResponseSchema,
  paginatedSchema,
  paginationParamsSchema,
  personSchema,
  videoSchema,
  type ImageAsset,
  type Paginated,
  type Person,
  type VideoAsset,
} from './schemas';
export { SNIPPETS, type SnippetName } from './snippets';
export { API_TAGS, authRequest, baseApi, bffRequest } from './baseApi';
export {
  axiosBaseQuery,
  clientHttp,
  type AxiosQueryArgs,
  type AxiosQueryExtraOptions,
} from './axiosBaseQuery';
