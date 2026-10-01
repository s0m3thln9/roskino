import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/shared/i18n/request.ts');

type RemotePattern = NonNullable<NonNullable<NextConfig['images']>['remotePatterns']>[number];

function toRemotePattern(value: string): Exclude<RemotePattern, URL> {
  const url = new URL(value);
  return {
    protocol: url.protocol === 'http:' ? 'http' : 'https',
    hostname: url.hostname,
    port: url.port,
    pathname: `${url.pathname.replace(/\/+$/, '')}/**`,
  };
}

const mediaPatterns: RemotePattern[] = (process.env.MEDIA_URLS ?? '')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean)
  .map(toRemotePattern);

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: mediaPatterns,
  },
};

export default withNextIntl(nextConfig);
