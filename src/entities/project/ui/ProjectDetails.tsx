'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ROUTES } from '@/shared/config';
import { Link } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import { Carousel, Icon, InfoRow, Person, PlayButton } from '@/shared/ui';
import type { Project } from '../model/schema';
import { ScreeningFlag } from './ScreeningFlag';

type ProjectDetailsProps = {
  project: Project;
  labels: {
    description: string;
    stills: string;
    mainTrailer: string;
    otherProjects: string;
    previous: string;
    next: string;
    play: string;
    ageRating: string;
    length: string;
    type: string;
    genre: string;
    releaseInRussia: string;
    status: string;
    productionCompanies: string;
    directors: string;
    producers: string;
    writers: string;
    minutes: string;
  };
  contentTypeLabel: string;
  genreLabels: string[];
  className?: string;
};

export function ProjectDetails({
  project,
  labels,
  contentTypeLabel,
  genreLabels,
  className,
}: ProjectDetailsProps) {
  const [showTrailer, setShowTrailer] = useState(false);

  const rows: Array<[string, string]> = [
    [labels.ageRating, project.ageRating],
    [labels.length, project.lengthMinutes ? `${project.lengthMinutes} ${labels.minutes}` : '—'],
    [labels.type, contentTypeLabel],
    [labels.genre, genreLabels.join(', ')],
    [labels.releaseInRussia, project.releaseInRussia ?? '—'],
    [labels.status, project.status],
    [labels.productionCompanies, project.productionCompanies.join(', ')],
    [labels.directors, project.directors.join(', ')],
    [labels.producers, project.producers.join(', ')],
    [labels.writers, project.writers.join(', ')],
  ];

  return (
    <div className={cn('flex flex-col gap-10 text-white', className)}>
      <h2 className="typo-headline-1 md:mt-10 md:pr-14">{project.title}</h2>

      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <Person
          name={project.representative.name}
          position={project.representative.position}
          email={project.representative.email}
          photoUrl={project.representative.photo?.url}
        />
        {project.screening && <ScreeningFlag screening={project.screening} variant="aside" />}
      </div>

      {project.trailer && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-5 typo-text-1">
            <span>{labels.mainTrailer}</span>
            {project.trailer.duration && <span>{project.trailer.duration}</span>}
          </div>
          <div className="relative aspect-video w-full overflow-hidden bg-black">
            {showTrailer ? (
              <video src={project.trailer.url} controls autoPlay className="size-full" />
            ) : (
              <>
                {project.trailer.poster && (
                  <Image
                    src={project.trailer.poster.url}
                    alt={project.trailer.poster.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 920px"
                    className="object-cover"
                  />
                )}
                <span className="absolute inset-0 flex items-center justify-center">
                  <PlayButton label={labels.play} onClick={() => setShowTrailer(true)} />
                </span>
              </>
            )}
          </div>
        </section>
      )}

      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="flex shrink-0 flex-col gap-8">
          {project.poster && (
            <div className="relative aspect-[3/4] w-[200px] overflow-hidden md:w-[240px]">
              <Image
                src={project.poster.url}
                alt={project.poster.alt || project.title}
                fill
                sizes="240px"
                className="object-cover"
              />
            </div>
          )}
          <Link
            href={ROUTES.participant(project.participant.id)}
            className="flex w-[130px] flex-col gap-3 typo-link-2 hover:opacity-70"
          >
            <Icon name="company-logo-default" className="text-white" />
            <span>{labels.otherProjects}</span>
          </Link>
        </div>

        <dl className="flex min-w-0 flex-1 flex-col gap-3">
          {rows.map(([label, value]) => (
            <InfoRow key={label} label={label} value={value} />
          ))}
        </dl>
      </div>

      <section className="flex max-w-[660px] flex-col gap-2">
        <h3 className="typo-button">{labels.description}</h3>
        <p className="typo-text-6">{project.description}</p>
      </section>

      {project.stills.length > 0 && (
        <section className="flex flex-col gap-5">
          <h3 className="typo-button">{labels.stills}</h3>
          <Carousel
            labels={{ previous: labels.previous, next: labels.next }}
            arrowsClassName="top-[4.25rem] md:top-[6.875rem]"
            scrollOnItemClick
          >
            {project.stills.map((still, index) => (
              <li
                key={`${still.url}-${index}`}
                className="relative aspect-video w-[240px] shrink-0 snap-start overflow-hidden md:w-[390px]"
              >
                <Image
                  src={still.url}
                  alt={still.alt}
                  fill
                  sizes="390px"
                  className="object-cover"
                />
              </li>
            ))}
          </Carousel>
        </section>
      )}
    </div>
  );
}
