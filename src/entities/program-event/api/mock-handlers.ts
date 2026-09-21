import 'server-only';
import { findMockProjectScreenings } from '@/entities/project/@x/program-event.server';
import { ApiError } from '@/shared/api';
import { defineMockHandler } from '@/shared/api/server';
import type { ProgramEventPreview } from '../model/schema';
import {
  getProgramContract,
  getProgramEventContract,
  getProgramSummaryContract,
} from './contracts';
import {
  PROGRAM_DATES,
  PROGRAM_LOCATIONS,
  PROGRAM_ROOMS,
  buildProgramSummary,
  programSeed,
  toDateTime,
  type ProgramEventSeed,
} from './mock-data';

function hasDetails(seed: ProgramEventSeed): boolean {
  return (
    seed.kind === 'session' &&
    (seed.participants.length > 0 || seed.moderators.length > 0 || seed.projectIds.length > 0)
  );
}

function toPreview(seed: ProgramEventSeed): ProgramEventPreview {
  return {
    id: seed.id,
    kind: seed.kind,
    title: seed.title,
    startsAt: toDateTime(seed.date, seed.time[0]),
    endsAt: toDateTime(seed.date, seed.time[1]),
    date: seed.date,
    location:
      PROGRAM_LOCATIONS.find((item) => item.value === seed.location)?.label ?? seed.location,
    room: seed.room,
    place: seed.place,
    category: seed.category,
    hasDetails: hasDetails(seed),
  };
}

export const programEventMockHandlers = [
  defineMockHandler(getProgramSummaryContract, ({ lang }) => buildProgramSummary(lang)),
  defineMockHandler(getProgramContract, ({ date, location, room }) => ({
    filters: {
      dates: PROGRAM_DATES,
      locations: [...PROGRAM_LOCATIONS],
      rooms: PROGRAM_ROOMS.map((value) => ({ value, label: value })),
    },
    events: programSeed
      .filter(
        (seed) =>
          (!date || seed.date === date) &&
          (!location || seed.location === location) &&
          (!room || seed.room === room || seed.kind === 'break'),
      )
      .sort((a, b) => `${a.date}${a.time[0]}`.localeCompare(`${b.date}${b.time[0]}`))
      .map(toPreview),
  })),
  defineMockHandler(getProgramEventContract, ({ id }, { token }) => {
    const seed = programSeed.find((item) => item.id === id);
    if (!seed) throw new ApiError(404, `Program event "${id}" not found`);
    return {
      ...toPreview(seed),
      topic: seed.topic,
      participants: seed.participants,
      moderators: seed.moderators,
      projects: findMockProjectScreenings(seed.projectIds, token),
    };
  }),
];
