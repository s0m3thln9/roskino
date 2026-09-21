import { defineSnippet } from '@/shared/api';
import {
  getParticipantParamsSchema,
  getParticipantsParamsSchema,
  participantListSchema,
  participantSchema,
} from '../model/schema';

export const getParticipantsContract = defineSnippet({
  name: 'getParticipants',
  params: getParticipantsParamsSchema,
  response: participantListSchema,
  auth: true,
});

export const getParticipantContract = defineSnippet({
  name: 'getParticipant',
  params: getParticipantParamsSchema,
  response: participantSchema,
  auth: true,
});
