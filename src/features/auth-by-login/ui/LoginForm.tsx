'use client';

import { useState, type FormEvent } from 'react';
import { sessionApi } from '@/entities/session';
import { useAppDispatch } from '@/shared/model';
import { Button, PasswordField } from '@/shared/ui';
import { useLoginMutation } from '../api/authApi';
import type { AuthLabels } from '../model/labels';

type LoginFormProps = {
  titleId: string;
  labels: AuthLabels;
  onSuccess: (name: string) => void;
  onCancel: () => void;
  onForgot: () => void;
};

export function LoginForm({ titleId, labels, onSuccess, onCancel, onForgot }: LoginFormProps) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [submit, { isLoading, isError, reset }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await submit({ login, password });
    if (!('data' in result)) return;

    const request = dispatch(sessionApi.endpoints.getMe.initiate());
    const user = await request.unwrap().catch(() => null);
    request.unsubscribe();
    onSuccess(user?.name ?? login);
  };

  const handleChange = (setter: (value: string) => void) => (value: string) => {
    setter(value);
    if (isError) reset();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h2 id={titleId} className="pr-12 typo-title uppercase">
        {labels.title}
      </h2>
      <p className="mt-5 typo-text-4">{labels.intro}</p>

      <div className="mt-10 flex flex-col gap-7.5">
        <PasswordField
          name="login"
          autoComplete="username"
          required
          defaultVisible
          placeholder={labels.login}
          aria-label={labels.login}
          value={login}
          onChange={(event) => handleChange(setLogin)(event.target.value)}
          error={isError}
          labels={{ show: labels.showPassword, hide: labels.hidePassword }}
        />
        <PasswordField
          name="password"
          autoComplete="current-password"
          required
          placeholder={labels.password}
          aria-label={labels.password}
          value={password}
          onChange={(event) => handleChange(setPassword)(event.target.value)}
          error={isError}
          labels={{ show: labels.showPassword, hide: labels.hidePassword }}
        />
      </div>

      {isError && (
        <p role="alert" className="mt-5 text-sm leading-6">
          {labels.error}
        </p>
      )}

      <div className="mt-15 grid grid-cols-2 gap-2.5">
        <Button variant="secondary" width="full" onClick={onCancel}>
          {labels.cancel}
        </Button>
        <Button type="submit" variant="primary" width="full" disabled={isLoading}>
          {labels.submit}
        </Button>
      </div>

      <button
        type="button"
        onClick={onForgot}
        className="mt-7.5 self-center text-sm underline decoration-from-font underline-offset-2 hover:opacity-70"
      >
        {labels.forgot}
      </button>
    </form>
  );
}
