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
    <div className="relative flex h-20 w-[min(25.125rem,calc(100vw-9.125rem))] min-w-0 overflow-hidden rounded-md bg-black/50 text-white backdrop-blur-glass">
      <div className="relative flex size-20 shrink-0 items-center justify-center bg-white/10">
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
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center px-4">
        <div className="flex items-baseline justify-between gap-4">
          <span className="typo-text-7 text-white/50">{labels.welcome}</span>
          <LogoutButton
            label={labels.signOut}
            className="relative z-10 typo-text-7 text-white/50 hover:text-white hover:opacity-100"
          />
        </div>
        <Link
          href={ROUTES.participants}
          aria-label={labels.market}
          className="truncate typo-text-5 before:absolute before:inset-0"
        >
          {user.name}
        </Link>
      </div>
    </div>
  );
}
