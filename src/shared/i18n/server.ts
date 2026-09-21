import { hasLocale, type Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from './routing';

export type LocaleParams = { locale: string };

export async function resolveLocale(params: Promise<LocaleParams>): Promise<Locale> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return locale;
}

export function generateLocaleParams() {
  return routing.locales.map((locale) => ({ locale }));
}
