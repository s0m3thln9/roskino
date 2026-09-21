import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';
import { StoreProvider } from '../store';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <NextIntlClientProvider>
      <StoreProvider>{children}</StoreProvider>
    </NextIntlClientProvider>
  );
}
