import Image from 'next/image';
import type { User } from '@/entities/session';
import { LogoutButton } from '@/features/logout';
import { ROUTES } from '@/shared/config';
import { Link } from '@/shared/i18n';
import { Icon } from '@/shared/ui';

type UserPanelProps = {
  user: User;
  labels: { welcome: string; signOut: string; market: string };
};

export function UserPanel({ user, labels }: UserPanelProps) {
  return (
    <div className="flex h-20 w-[min(25.125rem,calc(100vw-9.125rem))] min-w-0 overflow-hidden rounded-md bg-dark-grey/75 text-white backdrop-blur-glass">
      <Link
        href={ROUTES.participants}
        aria-label={labels.market}
        className="relative flex size-20 shrink-0 items-center justify-center bg-white/10"
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
        <span className="typo-text-7 text-white/50">{labels.welcome}</span>
        <span className="truncate typo-text-5">{user.name}</span>
        <LogoutButton
          label={labels.signOut}
          className="absolute inset-0 flex items-center justify-center bg-dark-grey typo-text-5 opacity-0 transition-opacity hover:opacity-100 focus-visible:opacity-100"
        />
      </div>
    </div>
  );
}
