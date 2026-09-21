import 'server-only';
import { ApiError } from '@/shared/api';
import { defineMockHandler } from '@/shared/api/server';
import { getNewsContract, getNewsItemContract } from './contracts';
import { buildNewsMock } from './mock-data';

export const newsMockHandlers = [
  defineMockHandler(getNewsContract, ({ lang, page, limit }) => {
    const all = buildNewsMock(lang).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    const totalPages = Math.max(1, Math.ceil(all.length / limit));
    const start = (page - 1) * limit;
    return {
      items: all
        .slice(start, start + limit)
        .map(({ id, slug, title, excerpt, publishedAt, cover }) => ({
          id,
          slug,
          title,
          excerpt,
          publishedAt,
          cover,
        })),
      page,
      limit,
      total: all.length,
      totalPages,
    };
  }),
  defineMockHandler(getNewsItemContract, ({ lang, slug }) => {
    const item = buildNewsMock(lang).find((news) => news.slug === slug || news.id === slug);
    if (!item) throw new ApiError(404, `News "${slug}" not found`);
    return item;
  }),
];
