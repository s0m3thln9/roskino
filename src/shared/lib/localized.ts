export type AppLocale = 'ru' | 'en';

export type Localized<T = string> = Record<AppLocale, T>;

export function pickLocale<T>(value: Localized<T>, locale: AppLocale): T {
  return value[locale];
}
