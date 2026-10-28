import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { bindShortWordsDeep } from '@/shared/lib';
import { routing } from './routing';

export const formats = {
  dateTime: {
    short: { day: '2-digit', month: '2-digit', year: 'numeric' },
    long: { day: 'numeric', month: 'long', year: 'numeric' },
  },
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    formats,
    messages: bindShortWordsDeep((await import(`./messages/${locale}.json`)).default),
  };
});
