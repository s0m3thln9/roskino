'use client';

import { useState, type FormEvent } from 'react';
import { recoverAccessContract, recoverAccessParamsSchema } from '@/entities/session';
import { bffRequest, clientHttp } from '@/shared/api';
import { Button, TextField } from '@/shared/ui';
import type { AuthLabels } from '../model/labels';

type Field = 'fullName' | 'companyName' | 'email';

const FIELDS: { key: Field; type: string; autoComplete: string }[] = [
  { key: 'fullName', type: 'text', autoComplete: 'name' },
  { key: 'companyName', type: 'text', autoComplete: 'organization' },
  { key: 'email', type: 'email', autoComplete: 'email' },
];

const ERROR_LABELS = {
  fullName: 'fullNameError',
  companyName: 'companyNameError',
  email: 'emailError',
} as const satisfies Record<Field, keyof AuthLabels>;

type RecoverAccessFormProps = {
  titleId: string;
  labels: AuthLabels;
  onSent: () => void;
  onCancel: () => void;
};

export function RecoverAccessForm({ titleId, labels, onSent, onCancel }: RecoverAccessFormProps) {
  const [values, setValues] = useState<Record<Field, string>>({
    fullName: '',
    companyName: '',
    email: '',
  });
  const [invalid, setInvalid] = useState<Field | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const update = (key: Field, value: string) => {
    setValues((previous) => ({ ...previous, [key]: value }));
    if (invalid === key) setInvalid(null);
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = recoverAccessParamsSchema.safeParse(values);
    if (!parsed.success) {
      const fields = new Set(parsed.error.issues.map((issue) => issue.path[0]));
      setInvalid(FIELDS.find(({ key }) => fields.has(key))?.key ?? null);
      return;
    }

    setStatus('loading');
    try {
      const request = bffRequest(recoverAccessContract, parsed.data);
      await clientHttp.request({ url: request.url, method: request.method, data: request.data });
      onSent();
    } catch {
      setStatus('error');
    }
  };

  const message = invalid
    ? labels[ERROR_LABELS[invalid]]
    : status === 'error'
      ? labels.recoverError
      : labels.recoverHint;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col">
      <h2 id={titleId} className="max-w-80 pr-12 typo-title uppercase">
        {labels.recoverTitle}
      </h2>
      <p className="mt-5 typo-text-4">{labels.recoverDescription}</p>

      <div className="mt-10 flex flex-col gap-7.5">
        {FIELDS.map(({ key, type, autoComplete }) => (
          <TextField
            key={key}
            name={key}
            type={type}
            autoComplete={autoComplete}
            required
            label={labels[key]}
            value={values[key]}
            onChange={(event) => update(key, event.target.value)}
            onClear={() => update(key, '')}
            clearLabel={labels.clear}
            error={invalid === key}
          />
        ))}
      </div>

      <p
        role={invalid || status === 'error' ? 'alert' : undefined}
        className="mt-5 text-sm leading-6"
      >
        {message}
      </p>

      <div className="mt-auto grid grid-cols-2 gap-2.5 pt-15">
        <Button variant="secondary" width="full" onClick={onCancel}>
          {labels.cancel}
        </Button>
        <Button type="submit" variant="primary" width="full" disabled={status === 'loading'}>
          {labels.send}
        </Button>
      </div>
    </form>
  );
}
