import 'server-only';
import { z } from 'zod';

const booleanFlag = z
  .enum(['true', 'false'])
  .default('false')
  .transform((value) => value === 'true');

const envSchema = z.object({
  API_URL: z.url(),
  USE_MOCKS: booleanFlag,
  FEATURE_ARCHIVE: booleanFlag,
});

export const serverEnv = envSchema.parse({
  API_URL: process.env.API_URL,
  USE_MOCKS: process.env.USE_MOCKS,
  FEATURE_ARCHIVE: process.env.FEATURE_ARCHIVE,
});
