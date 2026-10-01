export type PaginationItem =
  { type: 'page'; page: number } | { type: 'gap'; key: 'start' | 'end'; page: number };

export function getPaginationItems(current: number, total: number): PaginationItem[] {
  if (total <= 0) return [];
  if (total <= 6) {
    return Array.from({ length: total }, (_, index) => ({ type: 'page', page: index + 1 }));
  }

  const page = Math.min(Math.max(current, 1), total);
  const from = page <= 3 ? 2 : page >= total - 2 ? total - 3 : page - 1;
  const to = page <= 3 ? 4 : page >= total - 2 ? total - 1 : page + 1;
  const middle = (first: number, last: number) => Math.floor((first + last) / 2);

  const items: PaginationItem[] = [{ type: 'page', page: 1 }];
  if (from > 2) items.push({ type: 'gap', key: 'start', page: middle(2, from - 1) });
  for (let p = from; p <= to; p += 1) items.push({ type: 'page', page: p });
  if (to < total - 1) items.push({ type: 'gap', key: 'end', page: middle(to + 1, total - 1) });
  items.push({ type: 'page', page: total });
  return items;
}
