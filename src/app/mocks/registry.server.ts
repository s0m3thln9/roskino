import 'server-only';
import { bannerMockHandlers } from '@/entities/banner/server';
import { eventMockHandlers } from '@/entities/event/server';
import { mediaMockHandlers } from '@/entities/media/server';
import { newsMockHandlers } from '@/entities/news/server';
import { participantMockHandlers } from '@/entities/participant/server';
import { partnerMockHandlers } from '@/entities/partner/server';
import { programEventMockHandlers } from '@/entities/program-event/server';
import { projectMockHandlers } from '@/entities/project/server';
import { sessionMockHandlers } from '@/entities/session/server';
import { siteSettingsMockHandlers } from '@/entities/site-settings/server';
import { favoritesMockHandlers } from '@/features/add-to-favorites/server';
import { SNIPPETS } from '@/shared/api';
import { registerMockHandlers, type MockHandlerEntry } from '@/shared/api/server';
import { serverEnv } from '@/shared/config/server';

export const mockHandlers: readonly MockHandlerEntry[] = [
  ...siteSettingsMockHandlers,
  ...eventMockHandlers,
  ...bannerMockHandlers,
  ...mediaMockHandlers,
  ...newsMockHandlers,
  ...partnerMockHandlers,
  ...sessionMockHandlers,
  ...projectMockHandlers,
  ...participantMockHandlers,
  ...programEventMockHandlers,
  ...favoritesMockHandlers,
];

export function registerMocks(): void {
  if (!serverEnv.USE_MOCKS) return;
  registerMockHandlers(mockHandlers);

  if (process.env.NODE_ENV !== 'production') {
    const covered = new Set(mockHandlers.map((entry) => entry.name));
    const missing = SNIPPETS.filter((name) => !covered.has(name));
    if (missing.length > 0) console.warn(`[mocks] No mock handlers for: ${missing.join(', ')}`);
  }
}

registerMocks();
