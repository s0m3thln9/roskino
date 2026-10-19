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
    productionYear: string;
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
    [labels.productionYear, String(project.year)],
    [labels.releaseInRussia, project.releaseInRussia ?? '—'],
    [labels.status, project.status],
    [labels.productionCompanies, project.productionCompanies.join(', ')],
    [labels.directors, project.directors.join(', ')],
    [labels.producers, project.producers.join(', ')],
    [labels.writers, project.writers.join(', ')],
  ];

  return (
    <div className={cn('flex flex-col gap-10 text-white', className)}>
      <h2 className="mt-12 typo-headline-1 max-md:order-1 md:mt-10 md:pr-14">{project.title}</h2>

      <div className="max-md:order-1 max-md:contents md:flex md:flex-row md:items-start md:justify-between md:gap-6">
        <Person
          name={project.representative.name}
          position={project.representative.position}
          email={project.representative.email}
          photoUrl={project.representative.photo?.url}
          className="max-md:order-8"
        />
        {project.screening && (
          <ScreeningFlag screening={project.screening} variant="aside" className="max-md:hidden" />
        )}
      </div>

      {project.screening && (
        <ScreeningFlag
          screening={project.screening}
          detailed
          className={cn('-mx-10 w-fit max-md:order-3 md:hidden', project.trailer && '-mt-7')}
        />
      )}

      {project.trailer && (
        <section className="flex flex-col gap-5 max-md:order-2 md:gap-3">
          <div className="flex items-center gap-5 typo-text-6 md:typo-text-1">
            <span>{labels.mainTrailer}</span>
            {project.trailer.duration && <span>{project.trailer.duration}</span>}
          </div>
          <div className="relative -mx-10 aspect-video overflow-hidden bg-black md:mx-0 md:w-full">
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

      <div className="max-md:order-1 max-md:contents md:flex md:flex-col md:gap-10 lg:flex-row">
        <div className="max-md:contents md:flex md:shrink-0 md:flex-col md:gap-8">
          {project.poster && (
            <div
              className={cn(
                'relative aspect-[3/4] w-full overflow-hidden max-md:order-4 md:w-[240px]',
                !project.trailer && !project.screening && 'max-md:mt-5',
              )}
            >
              <Image
                src={project.poster.url}
                alt={project.poster.alt || project.title}
                fill
                sizes="(max-width: 768px) 310px, 240px"
                className="object-cover"
              />
            </div>
          )}
          <Link
            href={ROUTES.participant(project.participant.id)}
            className="flex w-[130px] flex-col gap-3 typo-link-2 hover:opacity-70 max-md:order-9"
          >
            <Icon name="company-logo-default" className="text-white" />
            <span>{labels.otherProjects}</span>
          </Link>
        </div>

        <dl className="flex min-w-0 flex-1 flex-col gap-3 max-md:order-6 max-md:-mt-2">
          {rows.map(([label, value]) => (
            <InfoRow key={label} label={label} value={value} />
          ))}
        </dl>
      </div>

      <hr className="-mr-10 border-t-2 border-dotted border-peach/50 max-md:order-7 max-md:mt-5 max-md:-mb-2 md:hidden" />
      <hr className="-mr-10 border-t-2 border-dotted border-peach/50 max-md:order-10 md:hidden" />

      <section className="flex max-w-[660px] flex-col gap-2 max-md:order-5">
        <h3 className="typo-text-3 md:typo-button">{labels.description}</h3>
        <p className="typo-text-6">{project.description}</p>
      </section>

      {project.stills.length > 0 && (
        <section className="flex flex-col gap-6 max-md:order-11 md:gap-5">
          <h3 className="typo-text-3 md:typo-button">{labels.stills}</h3>
          <Carousel
            labels={{ previous: labels.previous, next: labels.next }}
            arrowsClassName="top-[4.25rem] md:top-[6.875rem]"
            scrollOnItemClick
            className="max-md:-ml-10 max-md:[&>ul]:gap-1"
          >
            {project.stills.map((still, index) => (
              <li
                key={`${still.url}-${index}`}
                className="relative aspect-[354/200] w-[calc(100vw-2.25rem)] shrink-0 snap-start overflow-hidden md:aspect-video md:w-[390px]"
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
