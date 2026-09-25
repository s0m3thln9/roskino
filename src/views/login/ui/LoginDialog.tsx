'use client';

import { useState } from 'react';
import { LoginForm, RecoverAccessForm } from '@/features/auth-by-login';

type LoginDialogProps = {
  redirectTo: string;
  labels: {
    title: string;
    login: string;
    password: string;
    submit: string;
    forgot: string;
    error: string;
    showPassword: string;
    hidePassword: string;
    recoverTitle: string;
    recoverDescription: string;
    fullName: string;
    companyName: string;
    email: string;
    cancel: string;
    send: string;
    sent: string;
    recoverError: string;
  };
};

export function LoginDialog({ redirectTo, labels }: LoginDialogProps) {
  const [mode, setMode] = useState<'login' | 'recover'>('login');

  return (
    <div className="w-full max-w-[600px] rounded-lg bg-white/75 p-6 backdrop-blur-panel md:p-10">
      {mode === 'login' ? (
        <LoginForm redirectTo={redirectTo} labels={labels} onForgot={() => setMode('recover')} />
      ) : (
        <RecoverAccessForm
          labels={{
            title: labels.recoverTitle,
            description: labels.recoverDescription,
            fullName: labels.fullName,
            companyName: labels.companyName,
            email: labels.email,
            cancel: labels.cancel,
            send: labels.send,
            sent: labels.sent,
            error: labels.recoverError,
          }}
          onCancel={() => setMode('login')}
        />
      )}
    </div>
  );
}
