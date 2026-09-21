import { defineSnippet, emptyParamsSchema, okResponseSchema } from '@/shared/api';
import {
  loginParamsSchema,
  loginResponseSchema,
  recoverAccessParamsSchema,
  userSchema,
} from '../model/schema';

export const loginContract = defineSnippet({
  name: 'login',
  params: loginParamsSchema,
  response: loginResponseSchema,
  auth: false,
});

export const logoutContract = defineSnippet({
  name: 'logout',
  params: emptyParamsSchema,
  response: okResponseSchema,
  auth: true,
});

export const getMeContract = defineSnippet({
  name: 'getMe',
  params: emptyParamsSchema,
  response: userSchema,
  auth: true,
});

export const recoverAccessContract = defineSnippet({
  name: 'recoverAccess',
  params: recoverAccessParamsSchema,
  response: okResponseSchema,
  auth: false,
});
