export type PaginationItem = { type: 'page'; page: number } | { type: 'gap'; key: 'start' | 'end' };

export function getPaginationItems(current: number, total: number): PaginationItem[] {
  if (total <= 0) return [];
  if (total <= 6) {
    return Array.from({ length: total }, (_, index) => ({ type: 'page', page: index + 1 }));
  }

  const page = Math.min(Math.max(current, 1), total);
  const items: PaginationItem[] = [{ type: 'page', page: 1 }];

  if (page <= 3) {
    for (let p = 2; p <= 4; p += 1) items.push({ type: 'page', page: p });
    items.push({ type: 'gap', key: 'end' });
  } else if (page >= total - 2) {
    items.push({ type: 'gap', key: 'start' });
    for (let p = total - 3; p < total; p += 1) items.push({ type: 'page', page: p });
  } else {
    items.push({ type: 'gap', key: 'start' });
    for (let p = page - 1; p <= page + 1; p += 1) items.push({ type: 'page', page: p });
    items.push({ type: 'gap', key: 'end' });
  }

  items.push({ type: 'page', page: total });
  return items;
}
