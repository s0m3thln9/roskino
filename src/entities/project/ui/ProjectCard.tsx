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
  className?: string;
};

export function ProjectCard({
  project,
  href,
  contentTypeLabel,
  genreLabels,
  className,
}: ProjectCardProps) {
  const meta = [contentTypeLabel, ...genreLabels, project.ageRating].filter(Boolean).join(', ');

  return (
    <article
      className={cn('group relative flex flex-col bg-black p-6 text-white md:p-10', className)}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        {project.poster ? (
          <Image
            src={project.poster.url}
            alt={project.poster.alt || project.title}
            fill
            sizes="(max-width: 768px) 100vw, 240px"
            className="object-cover"
          />
        ) : (
          <div className="size-full bg-grey/20" />
        )}
      </div>

      <div className="mt-6 flex flex-col gap-1">
        <h3 className="typo-title uppercase">
          <Link
            href={href ?? ROUTES.project(project.id)}
            className="before:absolute before:inset-0"
          >
            {project.title}
          </Link>
        </h3>
        <p className="typo-text-1">{meta}</p>
        <p className="typo-text-1">
          {project.country} ({project.year})
        </p>
      </div>

      <div className="mt-auto flex items-end justify-between gap-4 pt-6">
        {project.screening ? <ScreeningFlag screening={project.screening} /> : <span />}
        <Icon
          name="open"
          className="transition-transform group-focus-within:translate-x-1 group-hover:translate-x-1"
        />
      </div>
    </article>
  );
}
