import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getArchive } from '@/entities/media/server';
import { featureFlags } from '@/shared/config/server';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';
import { Header } from '@/widgets/header';

type ArchivePageProps = {
  params: Promise<LocaleParams>;
};

export async function generateArchiveMetadata({ params }: ArchivePageProps): Promise<Metadata> {
  if (!featureFlags.archive) return {};
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'Navigation' });
  return { title: t('archive') };
}

export async function ArchivePage({ params }: ArchivePageProps) {
  if (!featureFlags.archive) notFound();

  const locale = await resolveLocale(params);
  const [{ editions }, t] = await Promise.all([getArchive(locale), getTranslations('Navigation')]);

  return (
    <>
      <Header tone="dark" />
      <main className="flex-1 bg-grey pt-30 pb-20 md:pt-40 md:pb-30">
        <div className="mx-auto flex max-w-page flex-col gap-10 page-gutter md:gap-15">
          <h1 className="typo-headline-2">{t('archive')}</h1>

          <ul className="flex flex-col gap-1">
            {editions.map((edition) => (
              <li
                key={edition.year}
                className="flex flex-col gap-6 bg-white p-5 md:flex-row md:items-start md:gap-10 md:p-10"
              >
                {edition.cover && (
                  <div className="relative h-[180px] w-full shrink-0 overflow-hidden md:h-[220px] md:w-[360px]">
                    <Image
                      src={edition.cover.url}
                      alt={edition.cover.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex min-w-0 flex-1 flex-col gap-4">
                  <h2 className="typo-title uppercase">{edition.title}</h2>
                  <p className="typo-text-3 text-black/50">{edition.dates}</p>
                  <p className="typo-text-4">{edition.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
