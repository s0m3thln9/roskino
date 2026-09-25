import Image from 'next/image';
import { ROUTES } from '@/shared/config';
import { Link } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import type { ProjectPreview } from '../model/schema';
import { ScreeningFlag } from './ScreeningFlag';

type ProjectPosterCardProps = {
  project: ProjectPreview;
  contentTypeLabel: string;
  genreLabels: string[];
  className?: string;
};

export function ProjectPosterCard({
  project,
  contentTypeLabel,
  genreLabels,
  className,
}: ProjectPosterCardProps) {
  const meta = [contentTypeLabel, ...genreLabels, project.ageRating].filter(Boolean).join(', ');

  return (
    <article
      className={cn('relative flex w-[210px] shrink-0 flex-col gap-4 text-black', className)}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
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
      <div className="flex flex-col gap-1">
        <h4 className="typo-title uppercase">
          <Link href={ROUTES.project(project.id)} className="before:absolute before:inset-0">
            {project.title}
          </Link>
        </h4>
        <p className="typo-text-1">{meta}</p>
        <p className="typo-text-1">
          {project.country} ({project.year})
        </p>
      </div>
      {project.screening && <ScreeningFlag screening={project.screening} variant="line" />}
    </article>
  );
}
