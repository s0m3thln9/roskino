import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PartnerCard } from '@/entities/partner';
import { getPartners } from '@/entities/partner/server';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';
import { Header } from '@/widgets/header';

type PartnersPageProps = {
  params: Promise<LocaleParams>;
};

export async function generatePartnersMetadata({ params }: PartnersPageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'Navigation' });
  return { title: t('partners') };
}

export async function PartnersPage({ params }: PartnersPageProps) {
  const locale = await resolveLocale(params);
  const [groups, t] = await Promise.all([getPartners(locale), getTranslations('Navigation')]);

  return (
    <>
      <Header tone="dark" />
      <main className="flex-1 bg-apricot pt-40 pb-25 md:pb-30 lg:pt-50">
        <div className="mx-auto flex max-w-page flex-col gap-30 page-gutter max-md:px-10 md:gap-25 lg:gap-40">
          <h1 className="sr-only">{t('partners')}</h1>
          {groups.map((group) => (
            <section
              key={group.type}
              className="mx-auto flex w-full max-w-wide flex-col gap-15 md:gap-10 lg:gap-25"
            >
              <h2 className="typo-headline-2 md:max-w-190">{group.title}</h2>
              <div className="-mx-10 flex flex-col gap-1 md:mx-0">
                {group.partners.map((partner) => (
                  <PartnerCard key={partner.id} partner={partner} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
