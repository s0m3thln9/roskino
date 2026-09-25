import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/shared/api';
import { MARKET_PREFIX, ROUTES } from '@/shared/config';
import { MARKET_LOCALE, routing } from '@/shared/i18n';

const intlProxy = createMiddleware(routing);

const marketPathPattern = new RegExp(`^/(${routing.locales.join('|')})${MARKET_PREFIX}(/|$)`);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const marketMatch = pathname.match(marketPathPattern);

  if (marketMatch) {
    if (marketMatch[1] !== MARKET_LOCALE) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.replace(`/${marketMatch[1]}`, `/${MARKET_LOCALE}`);
      return NextResponse.redirect(url);
    }

    const loginPath = `/${MARKET_LOCALE}${ROUTES.login}`;
    const isLoginPage = pathname === loginPath;
    const hasSession = request.cookies.has(SESSION_COOKIE_NAME);

    if (!hasSession && !isLoginPage) {
      const url = request.nextUrl.clone();
      url.pathname = loginPath;
      url.search = '';
      url.searchParams.set('from', `${pathname}${request.nextUrl.search}`);
      return NextResponse.redirect(url);
    }

    if (hasSession && isLoginPage) {
      const url = request.nextUrl.clone();
      url.pathname = `/${MARKET_LOCALE}${ROUTES.participants}`;
      url.search = '';
      return NextResponse.redirect(url);
    }
  }

  return intlProxy(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
