import 'server-only';
import { getTranslations } from 'next-intl/server';
import { MARKET_LOCALE } from '@/shared/i18n';
import { AUTH_LABEL_KEYS, type AuthLabels } from './model/labels';

export async function getAuthLabels(): Promise<AuthLabels> {
  const t = await getTranslations({ locale: MARKET_LOCALE, namespace: 'Auth' });
  return Object.fromEntries(AUTH_LABEL_KEYS.map((key) => [key, t(key)])) as AuthLabels;
}
