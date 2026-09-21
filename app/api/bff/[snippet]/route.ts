import type { NextRequest } from 'next/server';
import { handleBffRequest } from '@/app/api';

export async function POST(request: NextRequest, context: RouteContext<'/api/bff/[snippet]'>) {
  const { snippet } = await context.params;
  return handleBffRequest(request, snippet);
}
