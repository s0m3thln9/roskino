import type { ReactNode } from 'react';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';
import { Footer } from '@/widgets/footer';
import { MarketHeader } from '@/widgets/header';

type MarketLayoutProps = {
  children: ReactNode;
  params: Promise<LocaleParams>;
};

export async function MarketLayout({ children, params }: MarketLayoutProps) {
  const locale = await resolveLocale(params);

  return (
    <>
      <MarketHeader />
      <div className="flex flex-1 flex-col pt-25">{children}</div>
      <Footer locale={locale} />
    </>
  );
}
