import 'server-only';
import { isApiError } from '../errors';

export async function withFallback<T, F>(request: Promise<T>, fallback: F): Promise<T | F> {
  try {
    return await request;
  } catch (error) {
    if (!isApiError(error)) throw error;
    console.error(`[api] request failed, rendering without it: ${error.message}`);
    return fallback;
  }
}
