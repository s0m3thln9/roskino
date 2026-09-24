import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getSiteSettings } from '@/entities/site-settings/server';
import { ROUTES } from '@/shared/config';
import { featureFlags } from '@/shared/config/server';
import { Link, type Locale } from '@/shared/i18n';
import { ContactLink, Icon, Logo, roundButtonVariants } from '@/shared/ui';

const SOCIAL_ICONS = { telegram: 'social-telegram', max: 'social-max' } as const;

const FOOTER_LINKS = [
  { key: 'about', href: ROUTES.about },
  { key: 'news', href: ROUTES.news },
  { key: 'partners', href: ROUTES.partners },
  { key: 'archive', href: ROUTES.archive },
  { key: 'market', href: ROUTES.participants },
] as const;

export async function Footer({ locale }: { locale: Locale }) {
  const [settings, t] = await Promise.all([getSiteSettings(locale), getTranslations('Navigation')]);
  const { organization, socials, map } = settings;
  const links = FOOTER_LINKS.filter((link) => link.key !== 'archive' || featureFlags.archive);

  return (
    <footer className="bg-black page-gutter py-10 text-white md:py-25">
      <div className="mx-auto flex max-w-page flex-col gap-10">
        <div className="flex items-start justify-between gap-6">
          <Logo variant="roskino" className="h-6 w-[110px] md:h-7 md:w-[129px]" />
          <ul className="flex items-center gap-5">
            {socials.map((social) => (
              <li key={social.type}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className={roundButtonVariants({ variant: 'solid' })}
                >
                  <Icon name={SOCIAL_ICONS[social.type]} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="flex min-w-[270px] flex-col gap-6">
            <div className="flex flex-col gap-5">
              <address className="typo-text-2 not-italic">
                {organization.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <div className="flex flex-col gap-1">
                <ContactLink icon="phone" href={`tel:${organization.phone.replace(/\s/g, '')}`}>
                  {organization.phone}
                </ContactLink>
                <ContactLink icon="email" href={`mailto:${organization.email}`}>
                  {organization.email}
                </ContactLink>
              </div>
            </div>
            <div className="flex flex-col gap-5 typo-text-2">
              <p>
                {t('ogrn')}: {organization.ogrn}
              </p>
              <p className="typo-text-1 text-xl">{organization.copyright}</p>
            </div>
          </div>

          <nav aria-label={t('menu')} className="lg:order-first">
            <ul className="flex flex-col gap-2">
              {links.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="typo-link-1 hover:opacity-70">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative w-full overflow-hidden rounded-md lg:max-w-[954px]">
            <Image
              src={map.image.url}
              alt={map.image.alt}
              width={map.image.width ?? 954}
              height={map.image.height ?? 269}
              className="h-[220px] w-full object-cover md:h-[269px]"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon name="pin" className="text-black" />
            </div>
            <a
              href={map.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="absolute top-3 right-3 rounded-b-md bg-black px-5 pt-1.75 pb-2.25 typo-text-1 text-white hover:bg-black/80"
            >
              {map.directionsLabel}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
