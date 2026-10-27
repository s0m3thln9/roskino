import { getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/entities/session/server';
import { getAuthLabels } from '@/features/auth-by-login/server';
import { featureFlags } from '@/shared/config/server';
import { NAV_ITEMS } from '../model/nav';
import { MarketLoginButton } from './MarketLoginButton';
import { MenuButton } from './MenuButton';
import { UserPanel } from './UserPanel';

export async function BottomBar() {
  const [user, t, tLogout] = await Promise.all([
    getCurrentUser().catch(() => null),
    getTranslations('Navigation'),
    getTranslations('Logout'),
  ]);
  const items = NAV_ITEMS.filter((item) => item.key !== 'archive' || featureFlags.archive);
  const labels = Object.fromEntries(items.map((item) => [item.key, t(item.key)]));

  return (
    <div className="fixed bottom-0 left-1/2 z-40 flex -translate-x-1/2 gap-1 md:bottom-10">
      <MenuButton
        items={items}
        labels={labels}
        buttonLabel={t('menuButton')}
        menuLabel={t('menu')}
        compact={Boolean(user)}
      />
      {user ? (
        <UserPanel
          user={user}
          labels={{ welcome: t('welcome'), market: t('market') }}
          logoutLabels={{
            signOut: t('signOut'),
            message: tLogout('message'),
            cancel: tLogout('cancel'),
            confirm: tLogout('confirm'),
            close: tLogout('close'),
          }}
        />
      ) : (
        <MarketLoginButton label={t('market')} authLabels={await getAuthLabels()} />
      )}
    </div>
  );
}
