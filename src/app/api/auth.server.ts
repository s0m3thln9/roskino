import 'server-only';
import { NextResponse, type NextRequest } from 'next/server';
import { loginContract, logoutContract } from '@/entities/session';
import { ApiError } from '@/shared/api';
import { callSnippet, clearSession, getSessionToken, setSessionToken } from '@/shared/api/server';
import '../mocks';
import { assertSameOrigin, errorResponse, readJsonBody } from './respond.server';

export async function handleLogin(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const body = await readJsonBody(request);
    const parsed = loginContract.params.safeParse(body);
    if (!parsed.success) {
      throw new ApiError(400, 'Login and password are required', 'VALIDATION_ERROR');
    }
    const credentials = parsed.data;
    const { token } = await callSnippet(loginContract, credentials);
    await setSessionToken(token);
    return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function handleLogout(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const token = await getSessionToken();
    if (token) {
      await callSnippet(logoutContract, {}, { token }).catch(() => undefined);
    }
    await clearSession();
    return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return errorResponse(error);
  }
}
