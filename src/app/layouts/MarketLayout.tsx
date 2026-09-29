import { getTranslations } from 'next-intl/server';
import { Suspense, type ReactNode } from 'react';
import { MARKET_LOCALE } from '@/shared/i18n';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';
import { BottomBar } from '@/widgets/bottom-bar';
import { Footer } from '@/widgets/footer';
import { MarketHeader } from '@/widgets/header';
import { MarketNav } from '@/widgets/market-nav';

type MarketLayoutProps = {
  children: ReactNode;
  params: Promise<LocaleParams>;
};

export async function MarketLayout({ children, params }: MarketLayoutProps) {
  const [locale, nav] = await Promise.all([
    resolveLocale(params),
    getTranslations({ locale: MARKET_LOCALE, namespace: 'Navigation' }),
  ]);

  return (
    <>
      <MarketHeader />
      <div className="flex flex-1 flex-col pt-25 lg:pt-50">
        <div className="mx-auto w-full max-w-page page-gutter">
          <Suspense fallback={<div className="h-7" />}>
            <MarketNav
              labels={{
                participants: nav('participants'),
                projects: nav('projects'),
                program: nav('program'),
              }}
              className="lg:pl-[14.125rem]"
            />
          </Suspense>
        </div>
        {children}
      </div>
      <Footer locale={locale} />
      <Suspense fallback={null}>
        <BottomBar />
      </Suspense>
    </>
  );
}
