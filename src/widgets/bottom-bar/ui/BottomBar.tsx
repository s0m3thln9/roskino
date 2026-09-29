import { getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/entities/session/server';
import { ROUTES } from '@/shared/config';
import { featureFlags } from '@/shared/config/server';
import { Link } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui';
import { NAV_ITEMS } from '../model/nav';
import { MenuButton } from './MenuButton';
import { barButtonClassName } from './styles';
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
        <Link
          href={ROUTES.participants}
          className={cn(barButtonClassName, 'bg-black hover:bg-black/80')}
        >
          <Icon name="my-market" className="size-6" />
          <span className="typo-menu">{t('market')}</span>
        </Link>
      )}
    </div>
  );
}
