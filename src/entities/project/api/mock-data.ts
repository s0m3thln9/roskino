import type { ContentType, Genre, Project } from '../model/schema';

type ProjectSeed = Omit<Project, 'isFavorite' | 'participant'> & { participantId: string };

const poster = { url: '/mocks/media/poster-1.jpg', alt: '', width: 700, height: 990 };
const stills = [
  { url: '/mocks/media/gallery-2.png', alt: '', width: 1600, height: 900 },
  { url: '/mocks/media/banner-1.jpg', alt: '', width: 1400, height: 1022 },
  { url: '/mocks/media/news-1.jpg', alt: '', width: 853, height: 1280 },
  { url: '/mocks/media/gallery-1.jpg', alt: '', width: 862, height: 1280 },
];
const trailer = {
  url: 'https://www.w3schools.com/html/mov_bbb.mp4',
  poster: stills[0] ?? null,
  title: 'Main trailer',
  duration: '2:28',
};

const description =
  'SMF Animation operates as a multi-platform entertainment company that includes animation production, licensing, educational initiatives, and creative development facilities. The company continues to strengthen its international footprint, with content broadcast and streamed in more than 120 countries.';

const representative = {
  name: 'Maria Savinykh',
  position: 'Director of International Sales and Projects',
  email: 'm.savinykh@smfanimation.com',
  photo: null,
};

function seed(
  id: string,
  participantId: string,
  title: string,
  contentType: ContentType,
  genres: Genre[],
  extra: Partial<ProjectSeed> = {},
): ProjectSeed {
  return {
    id,
    participantId,
    title,
    poster: { ...poster, alt: title },
    contentType,
    genres,
    ageRating: '6+',
    country: 'Russia',
    year: 2027,
    screening: null,
    description,
    lengthMinutes: 85,
    releaseInRussia: 'Autumn 2027',
    status: 'Post-production',
    productionCompanies: ['SMF Animation'],
    directors: ['Maksim Kulikov'],
    producers: ['Anton Grechko', 'Oleg Roy'],
    writers: ['Maksim Kulikov'],
    trailer: null,
    stills,
    representative,
    ...extra,
  };
}

export const projectsSeed: ProjectSeed[] = [
  seed(
    'fixies-big-secret',
    'smf-animation',
    'Fixies: The Big Secret',
    'animation',
    ['adventure', 'comedy'],
    {
      screening: {
        startsAt: '2026-12-02T12:30:00+03:00',
        location: 'Moskva Cinema',
        room: 'Room 2',
        section: 'Screenings',
      },
      trailer,
      lengthMinutes: 93,
    },
  ),
  seed('magic-lantern', 'smf-animation', 'The Magic Lantern', 'series', ['fantasy', 'adventure'], {
    ageRating: '0+',
    lengthMinutes: 22,
    releaseInRussia: 'Spring 2027',
    status: 'In production',
  }),
  seed('northern-lights', 'av-company', 'Northern Lights', 'feature-film', ['drama', 'romance'], {
    ageRating: '16+',
    lengthMinutes: 104,
    productionCompanies: ['Av Company'],
    directors: ['Anna Belova'],
    screening: {
      startsAt: '2026-12-01T15:00:00+03:00',
      location: 'Rossiya National Center',
      room: 'Room 1',
      section: 'Screenings',
    },
    trailer,
  }),
  seed('ice-road', 'av-company', 'Ice Road', 'documentary', ['adventure'], {
    ageRating: '12+',
    lengthMinutes: 88,
    productionCompanies: ['Av Company'],
    status: 'Completed',
    releaseInRussia: '2026',
    year: 2026,
  }),
  seed('space-cats', 'b-company', 'Space Cats', 'animation', ['sci-fi', 'comedy'], {
    lengthMinutes: 94,
    productionCompanies: ['B Company'],
    trailer,
  }),
  seed('last-summer', 'b-company', 'Last Summer', 'series', ['drama'], {
    ageRating: '16+',
    lengthMinutes: 48,
    productionCompanies: ['B Company'],
    screening: {
      startsAt: '2026-12-03T11:00:00+03:00',
      location: 'Moskva Cinema',
      room: 'Room 3',
      section: 'Screenings',
    },
  }),
  seed('city-of-music', 'c-company', 'City of Music', 'feature-film', ['musical', 'comedy'], {
    ageRating: '12+',
    lengthMinutes: 112,
    productionCompanies: ['C Company'],
  }),
  seed('bear-and-fox', 'c-company', 'Bear and Fox', 'animation', ['action', 'adventure'], {
    ageRating: '0+',
    lengthMinutes: 7,
    productionCompanies: ['C Company'],
    status: 'Completed',
    trailer,
  }),
];

const FAVORITES_KEY = Symbol.for('roskino.mock-favorites');

type FavoritesHolder = { [FAVORITES_KEY]?: Map<string, Set<string>> };

function favoritesStore(): Map<string, Set<string>> {
  const holder = globalThis as FavoritesHolder;
  holder[FAVORITES_KEY] ??= new Map();
  return holder[FAVORITES_KEY];
}

export function getMockFavorites(token: string | null): Set<string> {
  if (!token) return new Set();
  const store = favoritesStore();
  const existing = store.get(token);
  if (existing) return existing;
  const created = new Set<string>();
  store.set(token, created);
  return created;
}

export function addMockFavorite(token: string | null, projectId: string): void {
  getMockFavorites(token).add(projectId);
}

export const participantRefsSeed: Record<string, { name: string }> = {
  'smf-animation': { name: 'SMF Animation' },
  'av-company': { name: 'Av Company' },
  'b-company': { name: 'B Company' },
  'c-company': { name: 'C Company' },
};
