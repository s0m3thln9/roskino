'use client';

import { cn } from '@/shared/lib';
import { Person } from '@/shared/ui';
import type { ProgramEvent } from '../model/schema';
import { ProgramProjectCard } from './ProgramProjectCard';

type ProgramEventDetailsProps = {
  event: ProgramEvent;
  labels: {
    participants: string;
    moderators: string;
    description: string;
    minutes: string;
  };
  contentTypeLabels: Record<string, string>;
  genreLabels: Record<string, string>;
  className?: string;
};

export function ProgramEventDetails({
  event,
  labels,
  contentTypeLabels,
  genreLabels,
  className,
}: ProgramEventDetailsProps) {
  return (
    <div className={cn('flex flex-col gap-10 pt-8 text-white', className)}>
      {event.topic && <p className="max-w-text typo-text-5">{event.topic}</p>}

      {event.participants.length > 0 && (
        <section className="flex flex-col gap-5">
          <h4 className="typo-button">{labels.participants}</h4>
          <ul className="grid gap-5 md:grid-cols-2">
            {event.participants.map((person) => (
              <li key={person.email ?? person.name}>
                <Person
                  name={person.name}
                  position={person.position}
                  email={person.email}
                  photoUrl={person.photo?.url}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {event.moderators.length > 0 && (
        <section className="flex flex-col gap-5">
          <h4 className="typo-button">{labels.moderators}</h4>
          <ul className="grid gap-5 md:grid-cols-2">
            {event.moderators.map((person) => (
              <li key={person.email ?? person.name}>
                <Person
                  name={person.name}
                  position={person.position}
                  email={person.email}
                  photoUrl={person.photo?.url}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {event.projects.length > 0 && (
        <ul className="flex flex-col gap-2.5">
          {event.projects.map((project) => (
            <li key={project.id} className="contents">
              <ProgramProjectCard
                project={project}
                contentTypeLabel={contentTypeLabels[project.contentType] ?? ''}
                genreLabels={project.genres.map((genre) => genreLabels[genre] ?? genre)}
                labels={{ description: labels.description, minutes: labels.minutes }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
