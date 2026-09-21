import 'server-only';
import { NextResponse, type NextRequest } from 'next/server';
import { getParticipantContract, getParticipantsContract } from '@/entities/participant';
import { getProgramContract, getProgramEventContract } from '@/entities/program-event';
import { getFiltersContract, getProjectContract, getProjectsContract } from '@/entities/project';
import { getMeContract, recoverAccessContract } from '@/entities/session';
import { addToFavoritesContract } from '@/features/add-to-favorites';
import { ApiError, type SnippetContract } from '@/shared/api';
import { executeSnippet } from '@/shared/api/server';
import '../mocks';
import { assertSameOrigin, errorResponse, readJsonBody } from './respond.server';

const BFF_WHITELIST: readonly SnippetContract[] = [
  getMeContract,
  recoverAccessContract,
  getFiltersContract,
  getParticipantsContract,
  getParticipantContract,
  getProjectsContract,
  getProjectContract,
  addToFavoritesContract,
  getProgramContract,
  getProgramEventContract,
];

const contractsByName = new Map<string, SnippetContract>(
  BFF_WHITELIST.map((contract) => [contract.name, contract]),
);

export async function handleBffRequest(request: NextRequest, snippet: string) {
  try {
    assertSameOrigin(request);
    const contract = contractsByName.get(snippet);
    if (!contract) throw new ApiError(404, `Snippet "${snippet}" is not available`, 'NOT_FOUND');

    const params = await readJsonBody(request);
    const data = await executeSnippet(contract, params);
    return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return errorResponse(error);
  }
}
