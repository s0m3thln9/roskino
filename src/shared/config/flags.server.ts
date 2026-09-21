import 'server-only';
import { serverEnv } from './env.server';

export const featureFlags = {
  archive: serverEnv.FEATURE_ARCHIVE,
} as const;

export type FeatureFlags = typeof featureFlags;
