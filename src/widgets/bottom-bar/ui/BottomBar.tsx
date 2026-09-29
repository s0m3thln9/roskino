import { getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/entities/session/server';
import { getAuthLabels } from '@/features/auth-by-login/server';
import { featureFlags } from '@/shared/config/server';
import { NAV_ITEMS } from '../model/nav';
import { MarketLoginButton } from './MarketLoginButton';
import { MenuButton } from './MenuButton';
import { UserPanel } from './UserPanel';

export async function BottomBar() {
  const [user, t] = await Promise.all([getCurrentUser(), getTranslations('Navigation')]);
  const items = NAV_ITEMS.filter((item) => item.key !== 'archive' || featureFlags.archive);
  const labels = Object.fromEntries(items.map((item) => [item.key, t(item.key)]));

  return (
    <div className="fixed bottom-10 left-1/2 z-40 flex -translate-x-1/2 gap-1">
      <MenuButton
        items={items}
        labels={labels}
        buttonLabel={t('menuButton')}
        menuLabel={t('menu')}
      />
      {user ? (
        <UserPanel
          user={user}
          labels={{ welcome: t('welcome'), signOut: t('signOut'), market: t('market') }}
        />
      ) : (
        <MarketLoginButton label={t('market')} authLabels={await getAuthLabels()} />
      )}
    </div>
  );
}
