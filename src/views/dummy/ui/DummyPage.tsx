import { getImageProps } from 'next/image';

const DESKTOP_MEDIA = '(min-width: 48rem)';

export function DummyPage() {
  const background = {
    alt: '',
    fill: true,
    sizes: '100vw',
    loading: 'eager',
    fetchPriority: 'high',
  } as const;
  const { srcSet: bgDesktopSrcSet } = getImageProps({
    ...background,
    src: '/images/dummy-bg.jpg',
  }).props;
  const { props: bgMobileProps } = getImageProps({
    ...background,
    src: '/images/dummy-bg-mobile.jpg',
  });

  return (
    <main className="relative isolate flex flex-1 items-center overflow-hidden bg-white px-5 md:items-start md:px-0 md:pt-75 md:pr-10 md:pl-40">
      <h1 className="sr-only">Russian International Content Market</h1>
      <picture>
        <source media={DESKTOP_MEDIA} srcSet={bgDesktopSrcSet} />
        <img {...bgMobileProps} alt="" className="-z-10 object-cover" />
      </picture>
      <picture className="w-full max-w-90 md:max-w-275">
        <source media={DESKTOP_MEDIA} srcSet="/images/dummy-typo.svg" width={1100} height={466} />
        <img
          src="/images/dummy-typo-mobile.svg"
          alt=""
          width={360}
          height={152}
          className="h-auto w-full mix-blend-hard-light"
        />
      </picture>
    </main>
  );
}
