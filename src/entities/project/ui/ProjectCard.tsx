import Image from 'next/image';
import { ROUTES } from '@/shared/config';
import { Link } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui';
import type { ProjectPreview } from '../model/schema';
import { ScreeningFlag } from './ScreeningFlag';

type ProjectCardProps = {
  project: ProjectPreview;
  href?: string;
  contentTypeLabel: string;
  genreLabels: string[];
  minutesLabel: string;
  className?: string;
};

export function ProjectCard({
  project,
  href,
  contentTypeLabel,
  genreLabels,
  minutesLabel,
  className,
}: ProjectCardProps) {
  const meta = [contentTypeLabel, ...genreLabels, project.ageRating].filter(Boolean).join(', ');
  const duration = project.lengthMinutes ? `${project.lengthMinutes} ${minutesLabel}` : null;

  return (
    <article className={cn('group relative flex flex-col bg-black p-10 text-white', className)}>
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        {project.poster ? (
          <Image
            src={project.poster.url}
            alt={project.poster.alt || project.title}
            fill
            sizes="(max-width: 768px) 310px, 240px"
            className="object-cover"
          />
        ) : (
          <div className="size-full bg-grey/20" />
        )}
      </div>

      <div className="mt-6 flex flex-col gap-1">
        <h3 className="typo-title">
          <Link
            href={href ?? ROUTES.project(project.id)}
            scroll={false}
            className="before:absolute before:inset-0"
          >
            {project.title}
          </Link>
        </h3>
        <p className="typo-text-7">{meta}</p>
        <p className="typo-text-7 max-md:-mt-1">
          {project.country} ({project.year})
        </p>
      </div>

      <div className="mt-auto flex items-end justify-between gap-4 pt-4">
        {project.screening ? (
          <ScreeningFlag
            screening={project.screening}
            duration={duration}
            className="-mb-5 -ml-10 max-md:-mb-4"
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
