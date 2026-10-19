'use client';

import Image from 'next/image';
import { ScreeningFlag, useScreeningDate } from '@/entities/project/@x/program-event';
import { ROUTES } from '@/shared/config';
import { Link } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui';
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
        'absolute top-6 right-0 z-10 flex flex-col items-end bg-red py-5 pr-10 pl-14 text-right text-white max-md:hidden',
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
        'group relative flex flex-col gap-6 bg-black p-10 text-white md:flex-row md:gap-5',
        className,
      )}
    >
      <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden md:w-[210px]">
        {project.poster && (
          <Image
            src={project.poster.url}
            alt={project.poster.alt || project.title}
            fill
            sizes="(max-width: 768px) 310px, 210px"
            className="object-cover"
          />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-6 md:gap-5">
        <div className="flex flex-col gap-4 max-md:-mb-4 md:flex-row md:items-start md:justify-between">
          <h4
            className={cn(
              'typo-title md:font-display md:typo-subtitle md:uppercase',
              project.screening && 'md:pr-64',
            )}
          >
            <Link href={ROUTES.project(project.id)} className="before:absolute before:inset-0">
              {project.title}
            </Link>
          </h4>
          {!project.screening && duration && (
            <span className="shrink-0 font-display typo-subtitle uppercase max-md:hidden">
              {duration}
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
          <span className="typo-text-3 md:typo-button">{labels.description}</span>
          <p className="typo-text-6 md:line-clamp-5">{project.description}</p>
        </div>
      </div>

      {project.screening && <ScreeningRibbon screening={project.screening} duration={duration} />}

      <div className="-mt-2 flex items-end justify-between gap-4 md:hidden">
        {project.screening ? (
          <ScreeningFlag
            screening={project.screening}
            duration={duration}
            className="-mb-4 -ml-10"
          />
        ) : (
          <span />
        )}
        <Icon
          name="open"
          className="transition-transform group-focus-within:translate-x-1 group-hover:translate-x-1"
        />
      </div>
    </article>
  );
}
