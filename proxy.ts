import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/shared/api';
import { LOGIN_PARAM, MARKET_PREFIX, resolveLoginRedirect } from '@/shared/config';
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

    if (!request.cookies.has(SESSION_COOKIE_NAME)) {
      const url = request.nextUrl.clone();
      url.pathname = `/${MARKET_LOCALE}`;
      url.search = '';
      url.searchParams.set(
        LOGIN_PARAM,
        `${pathname.slice(MARKET_LOCALE.length + 1)}${request.nextUrl.search}`,
      );
      return NextResponse.redirect(url);
    }
  }

  const loginTarget = request.nextUrl.searchParams.get(LOGIN_PARAM);
  if (loginTarget !== null && request.cookies.has(SESSION_COOKIE_NAME)) {
    const target = new URL(resolveLoginRedirect(loginTarget), request.url);
    const url = request.nextUrl.clone();
    url.pathname = `/${MARKET_LOCALE}${target.pathname}`;
    url.search = target.search;
    return NextResponse.redirect(url);
  }

  return intlProxy(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
