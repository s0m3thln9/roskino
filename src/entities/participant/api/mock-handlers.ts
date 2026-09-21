import 'server-only';
import { findMockProjectPreviews } from '@/entities/project/@x/participant.server';
import { ApiError } from '@/shared/api';
import { defineMockHandler } from '@/shared/api/server';
import type { ParticipantPreview } from '../model/schema';
import { getParticipantContract, getParticipantsContract } from './contracts';
import { participantsSeed } from './mock-data';

export const participantMockHandlers = [
  defineMockHandler(getParticipantsContract, ({ origin, contentType, genre, page, limit }) => {
    const all: ParticipantPreview[] = participantsSeed
      .filter(
        (item) =>
          (origin.length === 0 || origin.includes(item.origin)) &&
          (contentType.length === 0 ||
            item.contentTypes.some((type) => contentType.includes(type))) &&
          (genre.length === 0 || item.genres.some((value) => genre.includes(value))),
      )
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(({ id, name, website, websiteLabel, logo, origin: itemOrigin, contentTypes }) => ({
        id,
        name,
        website,
        websiteLabel,
        logo,
        origin: itemOrigin,
        contentTypes,
      }));
    const start = (page - 1) * limit;
    return {
      items: all.slice(start, start + limit),
      page,
      limit,
      total: all.length,
      totalPages: Math.max(1, Math.ceil(all.length / limit)),
    };
  }),
  defineMockHandler(getParticipantContract, ({ id }, { token }) => {
    const participant = participantsSeed.find((item) => item.id === id);
    if (!participant) throw new ApiError(404, `Participant "${id}" not found`);
    const projects =
      participant.origin === 'russian'
        ? findMockProjectPreviews((project) => project.participantId === id, token)
        : [];
    return { ...participant, projects };
  }),
];
