import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';
import { AppProviders } from '../providers';
import { fontVariables } from '../styles/fonts';
import '../styles/globals.css';

type RootLayoutProps = {
  children: ReactNode;
  params: Promise<LocaleParams>;
};

export { generateLocaleParams as generateStaticParams } from '@/shared/i18n/server';

export async function generateMetadata({
  params,
}: Pick<RootLayoutProps, 'params'>): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: { default: t('title'), template: `%s — ${t('title')}` },
    description: t('description'),
  };
}

export async function RootLayout({ children, params }: RootLayoutProps) {
  const locale = await resolveLocale(params);

  return (
    <html lang={locale} className={fontVariables}>
      <body className="flex min-h-dvh flex-col antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
