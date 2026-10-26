import { getLocale, getTranslations } from 'next-intl/server';
import { MEDIA_QUERIES, ROUTES } from '@/shared/config';
import { Link } from '@/shared/i18n';
import { buttonVariants } from '@/shared/ui';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import { ReloadButton } from './ReloadButton';

export async function NotFoundPage() {
  const locale = await getLocale();
  const t = await getTranslations('NotFound');

  return (
    <>
      <main className="relative isolate flex-1 overflow-hidden bg-error page-gutter pt-65 pb-25 text-black lg:pb-37.5">
        <Header tone="dark" showAccreditation={false} />
        <picture>
          <source
            media={MEDIA_QUERIES.lg}
            srcSet="/images/404-ribbon.svg"
            width={1057}
            height={708}
          />
          <img
            src="/images/404-ribbon-mobile.svg"
            alt=""
            width={371}
            height={504}
            className="pointer-events-none absolute top-0 left-0 -z-10 h-auto w-[371px] lg:w-[1057px]"
          />
        </picture>
        <div className="mx-auto w-full max-w-page">
          <div className="flex flex-col lg:ml-[calc(50%+0.625rem)] lg:max-w-108">
            <h1 className="flex flex-col gap-1 px-5 font-display font-medium uppercase md:px-0">
              <span className="text-[5rem] leading-none">404</span>
              <span className="text-2xl leading-7.5">{`//${t('title')}`}</span>
            </h1>
            <div className="mt-9 flex max-w-95 flex-col gap-6 px-5 typo-text-2 md:px-0">
              <p>{t('description')}</p>
              <p>{t('hint')}</p>
            </div>
            <div className="mt-17 flex flex-col gap-1">
              <ReloadButton label={t('reload')} />
              <Link
                href={ROUTES.about}
                className={buttonVariants({ variant: 'dark', width: 'full' })}
              >
                {t('backHome')}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
