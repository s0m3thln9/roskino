'use client';

import { useState, type FormEvent } from 'react';
import { recoverAccessContract } from '@/entities/session';
import { bffRequest, clientHttp } from '@/shared/api';
import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';

type RecoverAccessFormProps = {
  labels: {
    title: string;
    description: string;
    fullName: string;
    companyName: string;
    email: string;
    cancel: string;
    send: string;
    sent: string;
    error: string;
  };
  onCancel: () => void;
  className?: string;
};

const fieldClassName =
  'typo-text-3 w-full border-b-2 border-black/20 bg-transparent pb-2 outline-none focus:border-black';

export function RecoverAccessForm({ labels, onCancel, className }: RecoverAccessFormProps) {
  const [values, setValues] = useState({ fullName: '', companyName: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    try {
      const request = bffRequest(recoverAccessContract, values);
      await clientHttp.request({ url: request.url, method: request.method, data: request.data });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const update = (key: keyof typeof values) => (event: { target: { value: string } }) =>
    setValues((previous) => ({ ...previous, [key]: event.target.value }));

  return (
    <form onSubmit={handleSubmit} className={cn('flex flex-col gap-8', className)}>
      <div className="flex flex-col gap-3">
        <h2 className="typo-title uppercase">{labels.title}</h2>
        <p className="typo-text-7">{labels.description}</p>
      </div>

      <label className="flex flex-col gap-2">
        <span className="typo-text-7 text-black/50">{labels.fullName}</span>
        <input
          required
          value={values.fullName}
          onChange={update('fullName')}
          className={fieldClassName}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="typo-text-7 text-black/50">{labels.companyName}</span>
        <input
          required
          value={values.companyName}
          onChange={update('companyName')}
          className={fieldClassName}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="typo-text-7 text-black/50">{labels.email}</span>
        <input
          type="email"
          required
          value={values.email}
          onChange={update('email')}
          className={fieldClassName}
        />
      </label>

      {status === 'sent' && <p className="typo-text-7">{labels.sent}</p>}
      {status === 'error' && <p className="typo-text-7 text-violet">{labels.error}</p>}

      <div className="flex flex-wrap gap-4">
        <Button
          type="button"
          variant="primary"
          onClick={onCancel}
          className="border-2 border-black"
        >
          {labels.cancel}
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={status === 'loading'}
          className="border-2 border-black"
        >
          {labels.send}
        </Button>
      </div>
    </form>
  );
}
