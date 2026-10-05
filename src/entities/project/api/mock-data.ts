import type { ContentType, Genre, Project } from '../model/schema';

type ProjectSeed = Omit<Project, 'participant'> & { participantId: string };

const poster = { url: '/mocks/media/poster-1.jpg', alt: '', width: 700, height: 990 };
const stills = [
  { url: '/mocks/media/gallery-2.png', alt: '', width: 1600, height: 900 },
  { url: '/mocks/media/banner-1.jpg', alt: '', width: 1400, height: 1022 },
  { url: '/mocks/media/news-1.jpg', alt: '', width: 853, height: 1280 },
  { url: '/mocks/media/gallery-1.jpg', alt: '', width: 862, height: 1280 },
];
const sixStills = [...stills, ...stills.slice(0, 2)];
const STILL_SETS = [sixStills, [], stills.slice(0, 2), stills.slice(0, 3), stills];

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

export const MOCK_STUDIOS = [
  'Aurora Film',
  'Belka Studio',
  'Volga Pictures',
  'Gorod Media',
  'Dom Kino Lab',
  'Zima Animation',
  'Iskra Production',
  'Kometa Film',
  'Luch Studio',
  'Mayak Pictures',
  'Nord Media',
  'Oblako Animation',
  'Parus Film',
  'Raduga Studio',
  'Sever Pictures',
  'Tundra Film',
  'Ural Media',
  'Fenix Animation',
  'Khronika Studio',
  'Tsvet Film',
].map((name) => ({ id: name.toLowerCase().replace(/\s+/g, '-'), name }));

const GENERATED_TITLES = [
  'Winter Tales',
  'The Last Lighthouse',
  'Paper Planes',
  'Silent Harbor',
  'Moonlit Garden',
  'The Iron Bridge',
  'Wild Rivers',
  'Glass Town',
  'Echoes of Summer',
  'The Red Balloon',
  'Northern Wind',
  'Clockwork Fox',
  'Hidden Valley',
  'The Long Road',
  'Starfall',
  'Little Captain',
  'Snow Leopard',
  'The Quiet Hour',
  'Distant Shores',
  'Golden Field',
  'The Secret Map',
  'Night Train',
  'Blue Mountains',
  'Stone Garden',
  'The Painter',
  'Forest Friends',
  'City Lights',
  'The Ninth Wave',
  'Sky Riders',
  'Old Stories',
];

const CONTENT_ROTATION: ContentType[] = ['animation', 'feature-film', 'series', 'documentary'];
const GENRE_ROTATION: Genre[][] = [
  ['adventure', 'comedy'],
  ['drama'],
  ['fantasy', 'adventure'],
  ['sci-fi', 'action'],
  ['musical', 'romance'],
  ['comedy', 'drama'],
];
const AGE_ROTATION = ['0+', '6+', '12+', '16+'];
const SCREENING_SLOTS = [
  { startsAt: '2026-12-01T13:30:00+03:00', location: 'Moskva Cinema', room: 'Room 2' },
  { startsAt: '2026-12-02T16:00:00+03:00', location: 'Rossiya National Center', room: 'Room 1' },
  { startsAt: '2026-12-03T10:30:00+03:00', location: 'Moskva Cinema', room: 'Room 4' },
];

const generatedProjects: ProjectSeed[] = GENERATED_TITLES.map((title, index) => {
  const studio = MOCK_STUDIOS[index < 5 ? 0 : index % MOCK_STUDIOS.length]!;
  const slot = SCREENING_SLOTS[index % SCREENING_SLOTS.length]!;
  return seed(
    `${title.toLowerCase().replace(/\s+/g, '-')}`,
    studio.id,
    title,
    CONTENT_ROTATION[index % CONTENT_ROTATION.length]!,
    GENRE_ROTATION[index % GENRE_ROTATION.length]!,
    {
      ageRating: AGE_ROTATION[index % AGE_ROTATION.length]!,
      lengthMinutes: 20 + ((index * 17) % 100),
      year: 2026 + (index % 2),
      productionCompanies: [studio.name],
      trailer: index % 3 === 0 ? trailer : null,
      stills: STILL_SETS[index % STILL_SETS.length]!,
      screening: index % 6 === 0 ? { ...slot, section: 'Screenings' } : null,
    },
  );
});

projectsSeed.push(...generatedProjects);

export const participantRefsSeed: Record<string, { name: string }> = {
  'smf-animation': { name: 'SMF Animation' },
  'av-company': { name: 'Av Company' },
  'b-company': { name: 'B Company' },
  'c-company': { name: 'C Company' },
  ...Object.fromEntries(MOCK_STUDIOS.map(({ id, name }) => [id, { name }])),
};
