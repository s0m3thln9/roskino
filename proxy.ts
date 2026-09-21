import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';
import { MARKET_PREFIX } from '@/shared/config';
import { MARKET_LOCALE, routing } from '@/shared/i18n';

const intlProxy = createMiddleware(routing);

const marketPathPattern = new RegExp(`^/(${routing.locales.join('|')})${MARKET_PREFIX}(/|$)`);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const marketMatch = pathname.match(marketPathPattern);

  if (marketMatch && marketMatch[1] !== MARKET_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(`/${marketMatch[1]}`, `/${MARKET_LOCALE}`);
    return NextResponse.redirect(url);
  }

  return intlProxy(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
