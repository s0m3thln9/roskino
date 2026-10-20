import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { getBanners } from '@/entities/banner/server';
import { EventAbout, EventDetailCard, EventHighlightCard } from '@/entities/event';
import { getEvent } from '@/entities/event/server';
import { getMedia } from '@/entities/media/server';
import { mediaTypeSchema } from '@/entities/media';
import { getProgramSummary } from '@/entities/program-event/server';
import { withFallback } from '@/shared/api/server';
import { featureFlags } from '@/shared/config/server';
import { cn } from '@/shared/lib';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';
import { BannerCarousel } from '@/widgets/banner-carousel';
import { Header } from '@/widgets/header';
import { MediaGallery } from '@/widgets/media-gallery';
import { ProgramSummary } from '@/widgets/program-summary';

type AboutPageProps = {
  params: Promise<LocaleParams>;
  searchParams: Promise<{ media?: string; year?: string }>;
};

export async function generateAboutMetadata({
  params,
}: Pick<AboutPageProps, 'params'>): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const event = await withFallback(getEvent(locale), null);
  return event ? { title: event.title } : {};
}

export async function AboutPage({ params, searchParams }: AboutPageProps) {
  const locale = await resolveLocale(params);
  const { media, year } = await searchParams;
  const mediaType = mediaTypeSchema.catch('photo').parse(media);
  const parsedYear = year ? Number(year) : undefined;
  const mediaYear = Number.isNaN(parsedYear) ? undefined : parsedYear;

  const emptyMedia = { years: [], year: mediaYear ?? 0, items: [] };

  const [event, banners, program, photos, videos, t] = await Promise.all([
    withFallback(getEvent(locale), null),
    withFallback(getBanners(locale), []),
    withFallback(getProgramSummary(locale), null),
    withFallback(getMedia(locale, 'photo', mediaYear), emptyMedia),
    withFallback(getMedia(locale, 'video', mediaYear), emptyMedia),
    getTranslations('About'),
  ]);

  return (
    <>
      <Header tone="dark" showLogo={false} />
      <main className="flex-1">
        <section
          className={cn(
            'relative isolate h-150 overflow-hidden bg-[#006b80] pt-60 md:h-auto md:pt-40 md:pb-20 lg:h-215 lg:pb-0',
            locale === 'ru' ? 'lg:pt-57.5' : 'lg:pt-50',
          )}
        >
          <Image
            src="/images/kv.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(147.22%_37.95%_at_50%_100%,#006b80_0%,rgb(0_107_128/0.5)_49.52%,rgb(0_107_128/0)_100%),linear-gradient(180deg,rgb(0_107_128/0)_83.27%,#006b80_100%)]"
          />
          <div className="mx-auto max-w-page page-gutter lg:max-w-[calc(var(--container-wide)+6.25rem)]">
            {event && <h1 className="sr-only">{event.title}</h1>}
            {locale === 'ru' ? (
              <>
                <Image
                  src="/images/kv-typo-ru-mobile.svg"
                  alt=""
                  width={350}
                  height={95}
                  priority
                  className="h-auto w-full mix-blend-hard-light md:hidden"
                />
                <Image
                  src="/images/kv-typo-ru.svg"
                  alt=""
                  width={1114}
                  height={302}
                  priority
                  className="h-auto w-full max-w-wide mix-blend-hard-light max-md:hidden"
                />
              </>
            ) : (
              <Image
                src="/images/kv-typo.svg"
                alt=""
                width={890}
                height={377}
                priority
                className="h-auto w-full max-w-222.5 mix-blend-hard-light"
              />
            )}
          </div>
        </section>

        {event && (
          <section className="bg-gradient-main pt-25 pb-40 text-white md:pt-15 md:pb-20 lg:pt-30 lg:pb-50">
            <div className="mx-auto flex max-w-page flex-col gap-40 page-gutter md:gap-15 lg:max-w-[calc(var(--container-wide)+6.25rem)] lg:gap-50">
              <div className="grid gap-25 md:grid-cols-3 md:gap-5">
                {event.details.map((detail) => (
                  <EventDetailCard key={detail.label} detail={detail} />
                ))}
              </div>

              <EventAbout about={event.about} className="px-5 md:px-0" />

              <div className="grid gap-25 md:grid-cols-3 md:gap-5">
                {event.highlights.map((highlight) => (
                  <EventHighlightCard key={highlight.caption} highlight={highlight} />
                ))}
              </div>
            </div>
          </section>
        )}

        <BannerCarousel banners={banners} slideLabelPrefix={t('bannerSlide')} />

        <section className="overflow-hidden bg-black pt-30 pb-15 md:pt-20 md:pb-20 lg:pt-37.5 lg:pb-25">
          <div className="mx-auto flex max-w-page flex-col gap-28 page-gutter md:gap-25 lg:max-w-[calc(var(--container-wide)+6.25rem)] lg:gap-50">
            {program && (
              <ProgramSummary
                summary={program}
                title={t('programTitle')}
                labels={{ previous: t('previous'), next: t('next'), register: t('register') }}
              />
            )}

            <Suspense fallback={null}>
              <MediaGallery
                key={photos.year}
                title={t('galleryTitle')}
                items={{ photo: photos.items, video: videos.items }}
                years={photos.years}
                year={photos.year}
                initialType={mediaType}
                showArchive={featureFlags.archive}
                labels={{
                  photo: t('photo'),
                  video: t('video'),
                  previous: t('previous'),
                  next: t('next'),
                  play: t('play'),
                  empty: t('galleryEmpty'),
                }}
              />
            </Suspense>
          </div>
        </section>
      </main>
    </>
  );
}
