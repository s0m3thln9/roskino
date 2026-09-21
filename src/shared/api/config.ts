export const AUTH_HEADER_NAME = 'Authorization';

export const formatAuthHeader = (token: string) => token;

export const SESSION_COOKIE_NAME = 'rk_session';

export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export const BFF_BASE_PATH = '/api/bff';

export const AUTH_BASE_PATH = '/api/auth';
