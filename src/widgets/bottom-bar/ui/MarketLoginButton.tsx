'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { AuthDialog, type AuthLabels } from '@/features/auth-by-login';
import { LOGIN_PARAM, resolveLoginRedirect } from '@/shared/config';
import { MARKET_LOCALE, usePathname, useRouter } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui';
import { barButtonClassName } from './styles';

type MarketLoginButtonProps = {
  label: string;
  authLabels: AuthLabels;
};

export function MarketLoginButton({ label, authLabels }: MarketLoginButtonProps) {
  const searchParams = useSearchParams();
  const loginTarget = searchParams.get(LOGIN_PARAM);
  const [open, setOpen] = useState(loginTarget !== null);
  const [previousTarget, setPreviousTarget] = useState(loginTarget);
  const router = useRouter();

  if (loginTarget !== previousTarget) {
    setPreviousTarget(loginTarget);
    if (loginTarget !== null) setOpen(true);
  }
  const pathname = usePathname();

  const clearLoginParam = () => {
    if (loginTarget === null) return;
    const params = new URLSearchParams(searchParams.toString());
    params.delete(LOGIN_PARAM);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleClose = () => {
    setOpen(false);
    clearLoginParam();
  };

  const handleAuthenticated = () => {
    setOpen(false);
    router.push(resolveLoginRedirect(loginTarget), { locale: MARKET_LOCALE });
    router.refresh();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={cn(barButtonClassName, 'bg-black hover:bg-black/80')}
      >
        <Icon name="my-market" className="size-6" />
        <span className="typo-menu">{label}</span>
      </button>
      <AuthDialog
        open={open}
        labels={authLabels}
        onClose={handleClose}
        onAuthenticated={handleAuthenticated}
      />
    </>
  );
}
