import { z } from 'zod';
import { imageSchema } from '@/shared/api';

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  company: z.string(),
  avatar: imageSchema.nullable().default(null),
});

export const loginParamsSchema = z.object({
  login: z.string().trim().min(1),
  password: z.string().min(1),
});

export const loginResponseSchema = z.object({
  token: z.string().min(1),
});

export const RECOVER_FIELD_MAX_LENGTH = 48;

export const recoverAccessParamsSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1)
    .max(RECOVER_FIELD_MAX_LENGTH)
    .regex(/^[\p{L}\s'.-]+$/u),
  companyName: z
    .string()
    .trim()
    .min(1)
    .max(RECOVER_FIELD_MAX_LENGTH)
    .regex(/^[\p{L}\p{N}\s"'«».,&-]+$/u),
  email: z.email(),
});

export type User = z.infer<typeof userSchema>;
export type LoginParams = z.infer<typeof loginParamsSchema>;
export type RecoverAccessParams = z.infer<typeof recoverAccessParamsSchema>;
