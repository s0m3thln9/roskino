import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';
import { Header } from '@/widgets/header';
import { KeyVisual } from '@/widgets/key-visual';

type Edition2026PageProps = {
  params: Promise<LocaleParams>;
};

export async function generateEdition2026Metadata({
  params,
}: Edition2026PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'Edition2026' });
  return {
    title: t('title'),
    description: null,
    openGraph: { title: t('title') },
  };
}

export async function Edition2026Page({ params }: Edition2026PageProps) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'Edition2026' });

  return (
    <main className="relative isolate flex-1 overflow-hidden bg-[#00204d]">
      <Header showLogo={false} showAccreditation={false} />
      <h1 className="sr-only">{t('title')}</h1>
      <KeyVisual className="-z-10" />
    </main>
  );
}
