import type { z } from 'zod';
import type { SnippetName } from './snippets';

export type SnippetContract<
  TName extends SnippetName = SnippetName,
  TParams extends z.ZodType = z.ZodType,
  TResponse extends z.ZodType = z.ZodType,
> = {
  name: TName;
  params: TParams;
  response: TResponse;
  auth: boolean;
};

export type SnippetParams<C extends SnippetContract> = z.input<C['params']>;

export type SnippetResponse<C extends SnippetContract> = z.output<C['response']>;

export function defineSnippet<
  TName extends SnippetName,
  TParams extends z.ZodType,
  TResponse extends z.ZodType,
>(contract: SnippetContract<TName, TParams, TResponse>) {
  return contract;
}
