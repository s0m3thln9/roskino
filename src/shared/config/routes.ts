export const ROUTES = {
  about: '/',
  news: '/news',
  newsItem: (slug: string) => `/news/${slug}`,
  partners: '/partners',
  archive: '/archive',
  market: '/market',
  participants: '/market/participants',
  participant: (id: string) => `/market/participants/${id}`,
  projects: '/market/projects',
  project: (id: string) => `/market/projects/${id}`,
  program: '/market/program',
  programEvent: (id: string) => `/market/program/${id}`,
} as const;

export const MARKET_PREFIX = ROUTES.market;

export const LOGIN_PARAM = 'login';

export function resolveLoginRedirect(target: string | null | undefined): string {
  return target?.startsWith(`${MARKET_PREFIX}/`) ? target : ROUTES.participants;
}

export const MARKET_NAV_ITEMS = [
  { key: 'participants', href: ROUTES.participants },
  { key: 'projects', href: ROUTES.projects },
  { key: 'program', href: ROUTES.program },
] as const;
