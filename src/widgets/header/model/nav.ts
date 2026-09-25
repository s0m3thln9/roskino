import { ROUTES } from '@/shared/config';
import type { IconName } from '@/shared/ui';

export type NavItem = {
  key: 'about' | 'news' | 'partners' | 'archive' | 'market';
  href: string;
  icon: IconName;
  highlighted?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { key: 'about', href: ROUTES.about, icon: 'home' },
  { key: 'news', href: ROUTES.news, icon: 'news' },
  { key: 'partners', href: ROUTES.partners, icon: 'partners' },
  { key: 'archive', href: ROUTES.archive, icon: 'dates' },
  { key: 'market', href: ROUTES.participants, icon: 'my-market', highlighted: true },
];
