import { getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/entities/session/server';
import { LogoutButton } from '@/features/logout';

export async function MarketUser() {
  const [user, t] = await Promise.all([getCurrentUser(), getTranslations('Navigation')]);
  if (!user) return null;

  return (
    <div className="flex items-center gap-5">
      <span className="typo-text-1">
        {t('welcome')}, {user.name}
      </span>
      <LogoutButton label={t('signOut')} />
    </div>
  );
}
