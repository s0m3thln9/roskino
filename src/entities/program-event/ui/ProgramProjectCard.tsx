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

const DURATION_CLASS = 'font-display text-[1.5rem] leading-8 font-medium uppercase';

function ScreeningRibbon({
  screening,
  duration,
}: {
  screening: NonNullable<ProgramProject['screening']>;
  duration: string | null;
}) {
  const { time, day } = useScreeningDate(screening);

  return (
    <div className="absolute top-5 right-0 z-10 flex h-[135px] min-w-[259px] flex-col items-end bg-[url(/images/screening-flag.svg)] bg-size-[100%_100%] bg-no-repeat pt-5 pr-10 pl-16 text-right text-white max-md:hidden">
      {duration && <span className={DURATION_CLASS}>{duration}</span>}
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
        'group relative flex flex-col gap-6 bg-black p-10 text-white md:flex-row md:gap-10',
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

      <div className="flex min-w-0 flex-1 flex-col gap-6 md:gap-0">
        <div className="flex flex-col gap-4 max-md:-mb-4 md:flex-row md:items-start md:justify-between">
          <h4
            className={cn(
              'typo-title md:text-[1.5rem] md:leading-8 md:uppercase',
              project.screening && 'md:pr-64',
            )}
          >
            <Link href={ROUTES.project(project.id)} className="before:absolute before:inset-0">
              {project.title}
            </Link>
          </h4>
          {!project.screening && duration && (
            <span className={cn('shrink-0 max-md:hidden', DURATION_CLASS)}>{duration}</span>
          )}
        </div>

        <div className="flex flex-col typo-text-7 md:mt-2">
          <span>{meta}</span>
          <span>
            {project.country} ({project.year})
          </span>
        </div>

        <div className="flex flex-col gap-2 md:mt-11">
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
          className="pointer-events-none transition-transform group-focus-within:translate-x-1 group-hover:translate-x-1"
        />
      </div>
    </article>
  );
}
