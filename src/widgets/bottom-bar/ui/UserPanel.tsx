import Image from 'next/image';
import type { User } from '@/entities/session';
import { LogoutButton, type LogoutLabels } from '@/features/logout';
import { ROUTES } from '@/shared/config';
import { Link } from '@/shared/i18n';
import { Icon } from '@/shared/ui';

type UserPanelProps = {
  user: User;
  labels: { welcome: string; market: string };
  logoutLabels: LogoutLabels;
};

export function UserPanel({ user, labels, logoutLabels }: UserPanelProps) {
  return (
    <div className="flex h-20 w-[min(25.125rem,calc(100vw-5.25rem))] min-w-0 overflow-hidden rounded-md bg-dark-grey/75 text-white backdrop-blur-glass md:w-[min(25.125rem,calc(100vw-9.125rem))]">
      <Link
        href={ROUTES.participants}
        aria-label={labels.market}
        className="relative flex size-20 shrink-0 items-center justify-center bg-white/10 max-md:hidden"
      >
        {user.avatar ? (
          <Image
            src={user.avatar.url}
            alt={user.avatar.alt || user.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <Icon name="avatar-default" className="size-10" />
        )}
      </Link>
      <div className="relative flex min-w-0 flex-1 flex-col justify-center gap-1 px-5">
        <span className="truncate typo-text-7 text-white/50 max-lg:pr-20">{labels.welcome}</span>
        <span className="truncate typo-text-5">{user.name}</span>
        <LogoutButton
          labels={logoutLabels}
          className="absolute top-4 right-4 typo-menu text-white/50 lg:inset-0 lg:flex lg:items-center lg:justify-center lg:bg-dark-grey lg:typo-text-5 lg:text-white lg:normal-case lg:opacity-0 lg:transition-opacity lg:hover:opacity-100 lg:focus-visible:opacity-100"
        />
      </div>
    </div>
  );
}
