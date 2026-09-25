'use client';

import Image from 'next/image';
import { ROUTES } from '@/shared/config';
import { Link } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import type { ProgramProject } from '../model/schema';

type ProgramProjectCardProps = {
  project: ProgramProject;
  contentTypeLabel: string;
  genreLabels: string[];
  labels: { description: string; minutes: string };
  className?: string;
};

export function ProgramProjectCard({
  project,
  contentTypeLabel,
  genreLabels,
  labels,
  className,
}: ProgramProjectCardProps) {
  const meta = [contentTypeLabel, ...genreLabels, project.ageRating].filter(Boolean).join(', ');

  return (
    <article
      className={cn(
        'relative flex flex-col gap-5 bg-black p-5 text-white md:flex-row md:p-10',
        className,
      )}
    >
      <div className="relative aspect-[3/4] w-[160px] shrink-0 overflow-hidden md:w-[210px]">
        {project.poster && (
          <Image
            src={project.poster.url}
            alt={project.poster.alt || project.title}
            fill
            sizes="210px"
            className="object-cover"
          />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <h4 className="font-display typo-subtitle uppercase">
            <Link href={ROUTES.project(project.id)} className="before:absolute before:inset-0">
              {project.title}
            </Link>
          </h4>
          {project.lengthMinutes && (
            <span className="shrink-0 font-display typo-subtitle uppercase">
              {project.lengthMinutes} {labels.minutes}
            </span>
          )}
        </div>

        <div className="flex flex-col typo-text-7">
          <span>{meta}</span>
          <span>
            {project.country} ({project.year})
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="typo-button">{labels.description}</span>
          <p className="line-clamp-5 typo-text-6">{project.description}</p>
        </div>
      </div>
    </article>
  );
}
