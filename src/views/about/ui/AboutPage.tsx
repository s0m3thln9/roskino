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
import { featureFlags } from '@/shared/config/server';
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
  const event = await getEvent(locale);
  return { title: event.title };
}

export async function AboutPage({ params, searchParams }: AboutPageProps) {
  const locale = await resolveLocale(params);
  const { media, year } = await searchParams;
  const mediaType = mediaTypeSchema.catch('photo').parse(media);
  const mediaYear = year ? Number(year) : undefined;

  const [event, banners, program, gallery, t] = await Promise.all([
    getEvent(locale),
    getBanners(locale),
    getProgramSummary(locale),
    getMedia(locale, mediaType, Number.isNaN(mediaYear) ? undefined : mediaYear),
    getTranslations('About'),
  ]);

  return (
    <>
      <Header tone="dark" coloredLogo />
      <main className="flex-1">
        <section className="relative isolate overflow-hidden bg-[#006b80] pt-30 pb-20 md:pt-40 lg:h-215 lg:pt-50 lg:pb-0">
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
            <h1 className="sr-only">{event.title}</h1>
            <Image
              src="/images/kv-typo.svg"
              alt=""
              width={890}
              height={377}
              priority
              className="h-auto w-full max-w-222.5 mix-blend-hard-light"
            />
          </div>
        </section>

        <section className="bg-gradient-main pt-15 pb-20 text-white lg:pt-30 lg:pb-50">
          <div className="mx-auto flex max-w-page flex-col gap-15 page-gutter lg:max-w-[calc(var(--container-wide)+6.25rem)] lg:gap-50">
            <div className="grid gap-5 md:grid-cols-3">
              {event.details.map((detail) => (
                <EventDetailCard key={detail.label} detail={detail} />
              ))}
            </div>

            <EventAbout about={event.about} />

            <div className="grid gap-5 md:grid-cols-3">
              {event.highlights.map((highlight) => (
                <EventHighlightCard key={highlight.caption} highlight={highlight} />
              ))}
            </div>
          </div>
        </section>

        <BannerCarousel banners={banners} slideLabelPrefix={t('bannerSlide')} />

        <section className="overflow-hidden bg-black py-20 lg:pt-37.5 lg:pb-25">
          <div className="mx-auto flex max-w-page flex-col gap-25 page-gutter lg:max-w-[calc(var(--container-wide)+6.25rem)] lg:gap-50">
            <ProgramSummary
              summary={program}
              title={t('programTitle')}
              labels={{ previous: t('previous'), next: t('next') }}
            />

            <Suspense fallback={null}>
              <MediaGallery
                title={t('galleryTitle')}
                items={gallery.items}
                years={gallery.years}
                year={gallery.year}
                type={mediaType}
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
