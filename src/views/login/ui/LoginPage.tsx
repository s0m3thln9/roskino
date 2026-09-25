import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { resolveLocale, type LocaleParams } from '@/shared/i18n/server';
import { LoginDialog } from './LoginDialog';

type LoginPageProps = {
  params: Promise<LocaleParams>;
  searchParams: Promise<{ from?: string }>;
};

export async function generateLoginMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'Auth' });
  return { title: t('title') };
}

export async function LoginPage({ params, searchParams }: LoginPageProps) {
  await resolveLocale(params);
  const { from } = await searchParams;
  const t = await getTranslations({ locale: 'en', namespace: 'Auth' });

  const redirectTo =
    from && from.startsWith('/en/market') ? from.replace('/en', '') : '/market/participants';

  return (
    <main className="mx-auto flex w-full max-w-page flex-1 items-center justify-center page-gutter py-20">
      <LoginDialog
        redirectTo={redirectTo}
        labels={{
          title: t('title'),
          login: t('login'),
          password: t('password'),
          submit: t('submit'),
          forgot: t('forgot'),
          error: t('error'),
          showPassword: t('showPassword'),
          hidePassword: t('hidePassword'),
          recoverTitle: t('recoverTitle'),
          recoverDescription: t('recoverDescription'),
          fullName: t('fullName'),
          companyName: t('companyName'),
          email: t('email'),
          cancel: t('cancel'),
          send: t('send'),
          sent: t('sent'),
          recoverError: t('recoverError'),
        }}
      />
    </main>
  );
}
