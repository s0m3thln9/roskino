import type { Metadata } from 'next';
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
      <Header tone="light" />
      <main className="flex-1">
        <section className="bg-linear-to-b from-[#143744] to-grey pt-30 pb-20 md:pt-40 lg:min-h-[860px] lg:pt-65">
          <div className="mx-auto max-w-page page-gutter">
            <h1 className="max-w-[833px] typo-headline-2 text-white">{event.title}</h1>
          </div>
        </section>

        <section className="bg-grey pb-20 lg:pb-40">
          <div className="mx-auto flex max-w-page flex-col gap-15 page-gutter lg:gap-25">
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

        <section className="bg-black py-20 lg:py-30">
          <div className="mx-auto flex max-w-page flex-col gap-25 page-gutter lg:gap-40">
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
