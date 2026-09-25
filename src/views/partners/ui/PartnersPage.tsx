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
      <main className="flex-1 bg-grey pt-30 pb-20 md:pt-40 md:pb-30">
        <div className="mx-auto flex max-w-page flex-col gap-15 page-gutter md:gap-25">
          <h1 className="sr-only">{t('partners')}</h1>
          {groups.map((group) => (
            <section key={group.type} className="flex flex-col gap-6 md:gap-10">
              <h2 className="max-w-wide typo-headline-2">{group.title}</h2>
              <div className="flex flex-col gap-1">
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
