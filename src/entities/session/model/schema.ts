import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  company: z.string(),
});

export const loginParamsSchema = z.object({
  login: z.string().trim().min(1),
  password: z.string().min(1),
});

export const loginResponseSchema = z.object({
  token: z.string().min(1),
});

export const recoverAccessParamsSchema = z.object({
  fullName: z.string().trim().min(1),
  companyName: z.string().trim().min(1),
  email: z.email(),
});

export type User = z.infer<typeof userSchema>;
export type LoginParams = z.infer<typeof loginParamsSchema>;
export type RecoverAccessParams = z.infer<typeof recoverAccessParamsSchema>;
