import 'server-only';
import { randomUUID } from 'node:crypto';
import { ApiError } from '@/shared/api';
import { defineMockHandler } from '@/shared/api/server';
import { getMeContract, loginContract, logoutContract, recoverAccessContract } from './contracts';

const MOCK_TOKEN_PREFIX = 'mock-token.';

function decodeLogin(token: string): string {
  const encoded = token.slice(MOCK_TOKEN_PREFIX.length).split('.')[0] ?? '';
  return Buffer.from(encoded, 'base64url').toString('utf8') || 'guest';
}

function toDisplayName(login: string): string {
  const name = login.split('@')[0] ?? login;
  return name
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part[0]!.toUpperCase() + part.slice(1))
    .join(' ');
}

export const sessionMockHandlers = [
  defineMockHandler(loginContract, ({ login }) => ({
    token: `${MOCK_TOKEN_PREFIX}${Buffer.from(login, 'utf8').toString('base64url')}.${randomUUID()}`,
  })),
  defineMockHandler(logoutContract, () => ({ ok: true as const })),
  defineMockHandler(getMeContract, (_params, { token }) => {
    if (!token?.startsWith(MOCK_TOKEN_PREFIX)) {
      throw new ApiError(401, 'Invalid session token', 'UNAUTHORIZED');
    }
    const login = decodeLogin(token);
    return {
      id: `user-${login}`,
      name: toDisplayName(login) || 'Guest',
      email: login.includes('@') ? login : `${login}@example.com`,
      company: 'Demo Distribution LLC',
    };
  }),
  defineMockHandler(recoverAccessContract, () => ({ ok: true as const })),
];
