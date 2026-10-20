import 'server-only';
import type { z } from 'zod';

const MAX_ROUNDS = 20;

type Path = PropertyKey[];

function isContainer(value: unknown): value is Record<PropertyKey, unknown> {
  return value !== null && typeof value === 'object';
}

function getAt(root: unknown, path: Path): unknown {
  return path.reduce<unknown>((node, key) => (isContainer(node) ? node[key] : undefined), root);
}

export function formatPath(path: Path): string {
  return path.reduce<string>(
    (result, key) =>
      typeof key === 'number'
        ? `${result}[${key}]`
        : result
          ? `${result}.${String(key)}`
          : String(key),
    '',
  );
}

function comparePathsDesc(a: Path, b: Path): number {
  for (let index = 0; index < Math.min(a.length, b.length); index++) {
    const left = a[index]!;
    const right = b[index]!;
    if (left === right) continue;
    if (typeof left === 'number' && typeof right === 'number') return right - left;
    return String(right).localeCompare(String(left));
  }
  return b.length - a.length;
}

function applyRepair(root: unknown, target: Path, maximum: number | null): boolean {
  if (maximum !== null) {
    const list = getAt(root, target);
    if (!Array.isArray(list) || list.length <= maximum) return false;
    list.length = maximum;
    return true;
  }

  const parent = getAt(root, target.slice(0, -1));
  const key = target.at(-1);
  if (key === undefined || !isContainer(parent)) return false;
  if (Array.isArray(parent) && typeof key === 'number') {
    if (key >= parent.length) return false;
    parent.splice(key, 1);
    return true;
  }
  if (!(key in parent)) return false;
  delete parent[key];
  return true;
}

function planRepairs(root: unknown, issues: z.core.$ZodIssue[]) {
  const plans = new Map<string, { target: Path; maximum: number | null }>();

  for (const issue of issues) {
    const value = getAt(root, issue.path);
    const truncate = issue.code === 'too_big' && Array.isArray(value);
    const target = truncate || value !== undefined ? issue.path : issue.path.slice(0, -1);
    if (target.length === 0 && !truncate) return null;
    const key = JSON.stringify(target.map(String));
    if (plans.has(key)) continue;
    plans.set(key, { target, maximum: truncate ? Number(issue.maximum) : null });
  }

  return [...plans.values()].sort((a, b) => comparePathsDesc(a.target, b.target));
}

export function lenientParse<T extends z.ZodType>(schema: T, raw: unknown) {
  let result = schema.safeParse(raw);
  if (result.success) return { result, issues: [] };

  const { issues } = result.error;
  const data: unknown = structuredClone(raw);
  for (let round = 0; round < MAX_ROUNDS && !result.success; round++) {
    const plans = planRepairs(data, result.error.issues);
    if (!plans) break;

    let changed = false;
    for (const plan of plans) {
      if (applyRepair(data, plan.target, plan.maximum)) changed = true;
    }
    if (!changed) break;

    result = schema.safeParse(data);
  }

  return { result, issues };
}
