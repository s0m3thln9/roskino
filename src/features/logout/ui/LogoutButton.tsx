'use client';

import { MARKET_PREFIX, ROUTES } from '@/shared/config';
import { usePathname, useRouter } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import { useLogoutMutation } from '../api/logoutApi';

type LogoutButtonProps = {
  label: string;
  className?: string;
};

export function LogoutButton({ label, className }: LogoutButtonProps) {
  const [logout, { isLoading }] = useLogoutMutation();
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = async () => {
    await logout();
    if (pathname.startsWith(MARKET_PREFIX)) router.replace(ROUTES.login);
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className={cn('transition-colors disabled:opacity-50', className)}
    >
      {label}
    </button>
  );
}
