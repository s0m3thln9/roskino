import 'server-only';
import { NextResponse, type NextRequest } from 'next/server';
import { ApiError, isApiError } from '@/shared/api';

export function errorResponse(error: unknown): NextResponse {
  if (isApiError(error)) {
    return NextResponse.json(error.toPayload(), { status: error.status });
  }
  console.error('[api] unexpected error', error);
  return NextResponse.json(
    new ApiError(500, 'Internal server error', 'INTERNAL_ERROR').toPayload(),
    {
      status: 500,
    },
  );
}

export function assertSameOrigin(request: NextRequest): void {
  const origin = request.headers.get('origin');
  if (!origin) return;
  if (new URL(origin).host !== request.nextUrl.host) {
    throw new ApiError(403, 'Cross-origin request rejected', 'FORBIDDEN');
  }
}

export async function readJsonBody(request: NextRequest): Promise<unknown> {
  const text = await request.text();
  if (!text) return {};
  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new ApiError(400, 'Request body must be valid JSON', 'BAD_REQUEST');
  }
}
