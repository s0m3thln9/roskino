import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';

export function AppProviders({ children }: { children: ReactNode }) {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
