'use client';

import { ROUTES } from '@/shared/config';
import { useRouter } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import { useLogoutMutation } from '../api/logoutApi';

type LogoutButtonProps = {
  label: string;
  className?: string;
};

export function LogoutButton({ label, className }: LogoutButtonProps) {
  const [logout, { isLoading }] = useLogoutMutation();
  const router = useRouter();

  const handleClick = async () => {
    await logout();
    router.replace(ROUTES.login);
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className={cn('typo-link-2 hover:opacity-70', className)}
    >
      {label}
    </button>
  );
}
