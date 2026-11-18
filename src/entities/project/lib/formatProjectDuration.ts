import type { ProjectPreview } from '../model/schema';

export function formatProjectDuration(
  project: Pick<ProjectPreview, 'lengthMinutes' | 'episodes'>,
  minutesLabel: string,
): string | null {
  if (project.lengthMinutes === null) return null;
  const duration = `${project.lengthMinutes} ${minutesLabel}`;
  return project.episodes === null ? duration : `${project.episodes} eps × ${duration}`;
}
