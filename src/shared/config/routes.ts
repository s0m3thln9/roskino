export const ROUTES = {
  about: '/',
  news: '/news',
  newsItem: (slug: string) => `/news/${slug}`,
  partners: '/partners',
  archive: '/archive',
  login: '/market/login',
  market: '/market',
  participants: '/market/participants',
  participant: (id: string) => `/market/participants/${id}`,
  projects: '/market/projects',
  project: (id: string) => `/market/projects/${id}`,
  program: '/market/program',
  programEvent: (id: string) => `/market/program/${id}`,
} as const;

export const MARKET_PREFIX = ROUTES.market;
