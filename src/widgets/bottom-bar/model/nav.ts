import { ROUTES } from '@/shared/config';
import type { IconName } from '@/shared/ui';

export type NavItem = {
  key: 'about' | 'news' | 'partners' | 'archive';
  href: string;
  icon: IconName;
};

export const NAV_ITEMS: NavItem[] = [
  { key: 'about', href: ROUTES.about, icon: 'home' },
  { key: 'partners', href: ROUTES.partners, icon: 'partners' },
  { key: 'news', href: ROUTES.news, icon: 'news' },
  { key: 'archive', href: ROUTES.archive, icon: 'dates' },
];
