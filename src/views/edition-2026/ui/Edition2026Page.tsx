import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getImageProps } from 'next/image';
import { MEDIA_QUERIES } from '@/shared/config';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';

type Edition2026PageProps = {
  params: Promise<LocaleParams>;
};

const BACKGROUND = {
  alt: '',
  fill: true,
  sizes: '100vw',
  loading: 'eager',
  fetchPriority: 'high',
} as const;

export async function generateEdition2026Metadata({
  params,
}: Edition2026PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'Edition2026' });
  return { title: t('title') };
}

export async function Edition2026Page({ params }: Edition2026PageProps) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'Edition2026' });
  const desktopBackground = getImageProps({ ...BACKGROUND, src: '/images/2026-bg.jpg' }).props;
  const mobileBackground = getImageProps({
    ...BACKGROUND,
    src: '/images/2026-bg-mobile.jpg',
  }).props;

  return (
    <main className="relative isolate flex flex-1 items-center overflow-hidden bg-white px-5 md:items-start md:px-0 md:pt-[min(18.75rem,33dvh)] md:pr-10 md:pl-40">
      <h1 className="sr-only">{t('title')}</h1>
      <picture>
        <source
          media={MEDIA_QUERIES.md}
          srcSet={desktopBackground.srcSet}
          sizes={desktopBackground.sizes}
        />
        <img {...mobileBackground} alt="" className="-z-10 object-cover" />
      </picture>
      <picture className="w-full max-w-90 md:max-w-275">
        <source media={MEDIA_QUERIES.md} srcSet="/images/2026-typo.svg" width={1100} height={466} />
        <img
          src="/images/2026-typo-mobile.svg"
          alt=""
          width={360}
          height={152}
          className="h-auto w-full mix-blend-hard-light md:max-h-[calc(67dvh-2.5rem)] md:object-contain md:object-left-top"
        />
      </picture>
    </main>
  );
}
