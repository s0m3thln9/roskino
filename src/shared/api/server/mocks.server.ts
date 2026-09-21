import 'server-only';
import type { z } from 'zod';
import type { SnippetContract } from '../contract';
import type { SnippetName } from '../snippets';

export type MockContext = { token: string | null };

type AnyMockHandler = (params: unknown, context: MockContext) => unknown;

export type MockHandlerEntry = {
  name: SnippetName;
  handle: AnyMockHandler;
};

export function defineMockHandler<C extends SnippetContract>(
  contract: C,
  handler: (
    params: z.output<C['params']>,
    context: MockContext,
  ) => z.input<C['response']> | Promise<z.input<C['response']>>,
): MockHandlerEntry {
  return {
    name: contract.name,
    handle: (params, context) => handler(params as z.output<C['params']>, context),
  };
}

const REGISTRY_KEY = Symbol.for('roskino.mock-registry');

type RegistryHolder = { [REGISTRY_KEY]?: Map<SnippetName, AnyMockHandler> };

function getRegistry(): Map<SnippetName, AnyMockHandler> {
  const holder = globalThis as RegistryHolder;
  holder[REGISTRY_KEY] ??= new Map();
  return holder[REGISTRY_KEY];
}

export function registerMockHandlers(entries: readonly MockHandlerEntry[]): void {
  const registry = getRegistry();
  for (const entry of entries) registry.set(entry.name, entry.handle);
}

export function getMockHandler(name: SnippetName): AnyMockHandler | undefined {
  return getRegistry().get(name);
}

export function mockDelay(min = 250, max = 700): Promise<void> {
  const ms = Math.round(min + Math.random() * (max - min));
  return new Promise((resolve) => setTimeout(resolve, ms));
}
