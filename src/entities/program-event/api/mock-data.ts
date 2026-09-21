import type { Localized } from '@/shared/lib';
import type { ProgramCategory, ProgramSummary } from '../model/schema';

const DAYS = ['2026-12-01', '2026-12-02', '2026-12-03'] as const;

const at = (date: string, time: string) => `${date}T${time}:00+03:00`;

type SummarySeed = {
  room: Localized;
  time: [string, string];
  title: Localized;
  category: ProgramCategory;
};

const summarySeed: SummarySeed[] = [
  {
    room: { ru: 'Зал 1', en: 'Room 1' },
    time: ['10:00', '11:00'],
    title: { ru: 'Пленарная сессия', en: 'Plenary session' },
    category: 'plenary',
  },
  {
    room: { ru: 'Зал 1', en: 'Room 1' },
    time: ['12:00', '13:00'],
    title: { ru: 'Презентация проектов', en: 'Project presentations' },
    category: 'presentation',
  },
  {
    room: { ru: 'Зал 1', en: 'Room 1' },
    time: ['13:00', '14:00'],
    title: { ru: 'Презентация проектов', en: 'Project presentations' },
    category: 'presentation',
  },
  {
    room: { ru: 'Зал 1', en: 'Room 1' },
    time: ['15:00', '16:00'],
    title: { ru: 'Презентация проектов', en: 'Project presentations' },
    category: 'presentation',
  },
  {
    room: { ru: 'Зал 1', en: 'Room 1' },
    time: ['16:00', '18:00'],
    title: { ru: 'Деловые встречи', en: 'Business meetings' },
    category: 'business',
  },
  {
    room: { ru: 'Зал 2', en: 'Room 2' },
    time: ['12:00', '13:00'],
    title: { ru: 'Презентация проектов', en: 'Project presentations' },
    category: 'presentation',
  },
  {
    room: { ru: 'Зал 2', en: 'Room 2' },
    time: ['13:00', '14:00'],
    title: { ru: 'Презентация проектов', en: 'Project presentations' },
    category: 'presentation',
  },
  {
    room: { ru: 'Зал 2', en: 'Room 2' },
    time: ['15:00', '16:00'],
    title: { ru: 'Презентация проектов', en: 'Project presentations' },
    category: 'presentation',
  },
];

const dayLabels: Localized<string[]> = {
  ru: ['1 декабря', '2 декабря', '3 декабря'],
  en: ['December 1', 'December 2', 'December 3'],
};

export function buildProgramSummary(lang: keyof Localized): ProgramSummary {
  return {
    days: DAYS.map((date, dayIndex) => {
      const rooms = new Map<string, ProgramSummary['days'][number]['rooms'][number]>();
      summarySeed.forEach((seed, index) => {
        const name = seed.room[lang];
        const room = rooms.get(name) ?? { name, events: [] };
        room.events.push({
          id: `summary-${date}-${index}`,
          startsAt: at(date, seed.time[0]),
          endsAt: at(date, seed.time[1]),
          title: seed.title[lang],
          category: seed.category,
        });
        rooms.set(name, room);
      });
      return { date, label: dayLabels[lang][dayIndex] ?? date, rooms: [...rooms.values()] };
    }),
  };
}

export const PROGRAM_LOCATIONS = [
  { value: 'moskva-cinema', label: 'Cinema «Moskva»' },
  { value: 'rossiya-nc', label: 'NC «Rossiya»' },
] as const;

export const PROGRAM_ROOMS = ['Room 1', 'Room 2', 'Room 3', 'Room 4'] as const;

export const PROGRAM_DATES = [
  { value: DAYS[0], label: '1st of Dec.' },
  { value: DAYS[1], label: '2nd of Dec.' },
  { value: DAYS[2], label: '3rd of Dec.' },
];

const speaker = (name: string, position: string, email?: string) => ({
  name,
  position,
  email,
  photo: null,
});

export type ProgramEventSeed = {
  id: string;
  kind: 'session' | 'break';
  title: string;
  date: string;
  time: [string, string];
  location: (typeof PROGRAM_LOCATIONS)[number]['value'];
  room: string | null;
  place: string | null;
  category: ProgramCategory;
  topic: string | null;
  participants: ReturnType<typeof speaker>[];
  moderators: ReturnType<typeof speaker>[];
  projectIds: string[];
};

const baseSeed = (
  id: string,
  date: string,
  time: [string, string],
  title: string,
  category: ProgramCategory,
  extra: Partial<ProgramEventSeed> = {},
): ProgramEventSeed => ({
  id,
  kind: category === 'break' ? 'break' : 'session',
  title,
  date,
  time,
  location: 'moskva-cinema',
  room: category === 'break' ? null : 'Room 1',
  place: null,
  category,
  topic: null,
  participants: [],
  moderators: [],
  projectIds: [],
  ...extra,
});

export const programSeed: ProgramEventSeed[] = DAYS.flatMap((date, dayIndex) => [
  baseSeed(`d${dayIndex + 1}-plenary`, date, ['10:00', '11:00'], 'Plenary session', 'plenary', {
    topic: 'Russian content on the global market: new opportunities',
    participants: [
      speaker('Name Surname', 'Profession, Company Name', 'speaker1@example.com'),
      speaker('Maria Savinykh', 'Director of International Sales, SMF Animation'),
      speaker('Anna Belova', 'Producer, Av Company'),
      speaker('Ivan Petrov', 'CEO, B Company'),
      speaker('Olga Smirnova', 'Head of Distribution, C Company'),
    ],
    moderators: [speaker('Regina J.B. Buyer', 'Moderator, Toonz Turkey')],
  }),
  baseSeed(
    `d${dayIndex + 1}-presentations`,
    date,
    ['12:00', '14:00'],
    'Project presentations',
    'presentation',
    {
      room: 'Room 2',
      projectIds: ['fixies-big-secret', 'northern-lights', 'space-cats'],
      moderators: [speaker('Name Surname', 'Moderator')],
    },
  ),
  baseSeed(`d${dayIndex + 1}-lunch`, date, ['14:00', '15:00'], 'Lunch break', 'break', {
    place: 'Restaurant - Pushkin, 2nd Floor',
  }),
  baseSeed(`d${dayIndex + 1}-screenings`, date, ['15:00', '16:00'], 'Screenings', 'screening', {
    location: 'rossiya-nc',
    room: 'Room 3',
    projectIds: ['last-summer', 'bear-and-fox'],
  }),
  baseSeed(`d${dayIndex + 1}-meetings`, date, ['16:00', '18:00'], 'Business Meetings', 'business', {
    location: 'rossiya-nc',
    room: 'Room 4',
  }),
  baseSeed(`d${dayIndex + 1}-dinner`, date, ['18:00', '20:00'], 'Dinner', 'break', {
    place: 'Restaurant - Pushkin, 2nd Floor',
  }),
]);

export const toDateTime = at;
