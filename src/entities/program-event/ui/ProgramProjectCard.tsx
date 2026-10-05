'use client';

import Image from 'next/image';
import { useScreeningDate } from '@/entities/project/@x/program-event';
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

const RIBBON_CLIP =
  '[clip-path:polygon(0_1rem,100%_0,100%_calc(100%-1rem),0_100%,1.75rem_calc(50%+0.5rem))]';

function ScreeningRibbon({
  screening,
  duration,
}: {
  screening: NonNullable<ProgramProject['screening']>;
  duration: string | null;
}) {
  const { time, day } = useScreeningDate(screening);

  return (
    <div
      className={cn(
        'absolute top-6 right-0 z-10 flex flex-col items-end bg-peach py-5 pr-6 pl-14 text-right text-white md:pr-10',
        RIBBON_CLIP,
      )}
    >
      {duration && <span className="font-display typo-subtitle uppercase">{duration}</span>}
      <span className="typo-text-7">
        {time}, {day}
      </span>
      <span className="typo-text-7">
        {screening.section} / {screening.room}
      </span>
    </div>
  );
}

export function ProgramProjectCard({
  project,
  contentTypeLabel,
  genreLabels,
  labels,
  className,
}: ProgramProjectCardProps) {
  const meta = [contentTypeLabel, ...genreLabels, project.ageRating].filter(Boolean).join(', ');
  const duration = project.lengthMinutes ? `${project.lengthMinutes} ${labels.minutes}` : null;

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
          <h4
            className={cn('font-display typo-subtitle uppercase', project.screening && 'md:pr-64')}
          >
            <Link href={ROUTES.project(project.id)} className="before:absolute before:inset-0">
              {project.title}
            </Link>
          </h4>
          {!project.screening && duration && (
            <span className="shrink-0 font-display typo-subtitle uppercase">{duration}</span>
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

      {project.screening && <ScreeningRibbon screening={project.screening} duration={duration} />}
    </article>
  );
}
