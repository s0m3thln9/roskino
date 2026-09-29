'use client';

import Image from 'next/image';
import { useId, useState } from 'react';
import { Modal } from '@/shared/ui';
import type { AuthLabels } from '../model/labels';
import { LoginForm } from './LoginForm';
import { RecoverAccessForm } from './RecoverAccessForm';

type Step =
  { type: 'login' } | { type: 'recover' } | { type: 'welcome'; name: string } | { type: 'sent' };

type AuthDialogProps = {
  open: boolean;
  labels: AuthLabels;
  onClose: () => void;
  onAuthenticated: () => void;
};

function SuccessBadge() {
  return (
    <Image
      src="/images/success-badge.svg"
      alt=""
      aria-hidden
      width={160}
      height={160}
      className="size-30 md:size-40"
    />
  );
}

export function AuthDialog({ open, labels, onClose, onAuthenticated }: AuthDialogProps) {
  const [step, setStep] = useState<Step>({ type: 'login' });
  const titleId = useId();

  const handleClose = () => {
    const authenticated = step.type === 'welcome';
    setStep({ type: 'login' });
    if (authenticated) onAuthenticated();
    else onClose();
  };

  return (
    <Modal
      open={open}
      variant="dark"
      onClose={handleClose}
      closeLabel={labels.close}
      labelledBy={titleId}
    >
      {step.type === 'login' && (
        <LoginForm
          titleId={titleId}
          labels={labels}
          onSuccess={(name) => setStep({ type: 'welcome', name })}
          onCancel={handleClose}
          onForgot={() => setStep({ type: 'recover' })}
        />
      )}

      {step.type === 'recover' && (
        <RecoverAccessForm
          titleId={titleId}
          labels={labels}
          onSent={() => setStep({ type: 'sent' })}
          onCancel={() => setStep({ type: 'login' })}
        />
      )}

      {step.type === 'welcome' && (
        <div className="flex flex-col items-center py-5 text-center md:py-7.5">
          <SuccessBadge />
          <p className="mt-10 typo-text-3">{labels.welcomeBack}</p>
          <p id={titleId} className="mt-1 typo-title uppercase">
            {step.name}
          </p>
        </div>
      )}

      {step.type === 'sent' && (
        <div className="flex flex-col items-center py-5 text-center md:py-7.5">
          <SuccessBadge />
          <p id={titleId} className="mt-10 typo-text-3">
            {labels.sentTitle}
          </p>
          <p className="mt-2.5 max-w-80 text-sm">{labels.sentText}</p>
        </div>
      )}
    </Modal>
  );
}
