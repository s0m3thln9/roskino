'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import { Button, Icon } from '@/shared/ui';
import { useLoginMutation } from '../api/authApi';

type LoginFormProps = {
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
  };
  onForgot: () => void;
  className?: string;
};

const fieldClassName =
  'typo-text-3 w-full border-b-2 border-black/20 bg-transparent pb-2 outline-none focus:border-black';

export function LoginForm({ redirectTo, labels, onForgot, className }: LoginFormProps) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [submit, { isLoading, isError }] = useLoginMutation();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await submit({ login, password });
    if ('data' in result) router.replace(redirectTo);
  };

  return (
    <form onSubmit={handleSubmit} className={cn('flex flex-col gap-8', className)}>
      <h1 className="typo-title uppercase">{labels.title}</h1>

      <label className="flex flex-col gap-2">
        <span className="typo-text-7 text-black/50">{labels.login}</span>
        <input
          type="text"
          name="login"
          autoComplete="username"
          required
          value={login}
          onChange={(event) => setLogin(event.target.value)}
          className={fieldClassName}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="typo-text-7 text-black/50">{labels.password}</span>
        <span className="flex items-center gap-3">
          <input
            type={visible ? 'text' : 'password'}
            name="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={fieldClassName}
          />
          <button
            type="button"
            onClick={() => setVisible((value) => !value)}
            aria-label={visible ? labels.hidePassword : labels.showPassword}
            className="shrink-0 pb-2"
          >
            <Icon name={visible ? 'hide' : 'show'} />
          </button>
        </span>
      </label>

      {isError && <p className="typo-text-7 text-violet">{labels.error}</p>}

      <div className="flex flex-col gap-4">
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="border-2 border-black"
        >
          {labels.submit}
        </Button>
        <button type="button" onClick={onForgot} className="self-start typo-link-2">
          {labels.forgot}
        </button>
      </div>
    </form>
  );
}
