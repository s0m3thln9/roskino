'use client';

import Image from 'next/image';
import { useId, useState } from 'react';
import { MARKET_PREFIX, ROUTES } from '@/shared/config';
import { usePathname, useRouter } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import { Button, Modal } from '@/shared/ui';
import { useLogoutMutation } from '../api/logoutApi';

export type LogoutLabels = {
  signOut: string;
  message: string;
  cancel: string;
  confirm: string;
  close: string;
};

type LogoutButtonProps = {
  labels: LogoutLabels;
  className?: string;
};

export function LogoutButton({ labels, className }: LogoutButtonProps) {
  const [open, setOpen] = useState(false);
  const [logout, { isLoading }] = useLogoutMutation();
  const router = useRouter();
  const pathname = usePathname();
  const messageId = useId();

  const handleConfirm = async () => {
    await logout();
    setOpen(false);
    if (pathname.startsWith(MARKET_PREFIX)) router.replace(ROUTES.about);
    router.refresh();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn('transition-colors disabled:opacity-50', className)}
      >
        {labels.signOut}
      </button>
      <Modal
        open={open}
        variant="dark"
        onClose={() => setOpen(false)}
        closeLabel={labels.close}
        labelledBy={messageId}
      >
        <div className="flex flex-col items-center pt-8 text-center">
          <Image
            src="/images/warning-badge.svg"
            alt=""
            aria-hidden
            width={160}
            height={160}
            className="size-40"
          />
          <p id={messageId} className="mt-12 max-w-60 typo-text-2">
            {labels.message}
          </p>
        </div>
        <div className="mt-15 grid gap-2.5 md:grid-cols-2">
          <Button variant="secondary" width="full" onClick={() => setOpen(false)}>
            {labels.cancel}
          </Button>
          <Button variant="primary" width="full" onClick={handleConfirm} disabled={isLoading}>
            {labels.confirm}
          </Button>
        </div>
      </Modal>
    </>
  );
}
