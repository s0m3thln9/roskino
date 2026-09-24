import type { ReactNode } from 'react';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';
import { Footer } from '@/widgets/footer';

type SiteLayoutProps = {
  children: ReactNode;
  params: Promise<LocaleParams>;
};

export async function SiteLayout({ children, params }: SiteLayoutProps) {
  const locale = await resolveLocale(params);

  return (
    <>
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer locale={locale} />
    </>
  );
}
