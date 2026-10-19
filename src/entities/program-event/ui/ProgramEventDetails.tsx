'use client';

import type { Person as PersonData } from '@/shared/api';
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

function PeopleSection({ title, people }: { title: string; people: PersonData[] }) {
  return (
    <section className="flex flex-col gap-8 md:gap-6">
      <h4 className="typo-button">{title}</h4>
      <ul className="grid gap-x-10 gap-y-10 md:grid-cols-2 md:gap-y-12">
        {people.map((person) => (
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
  );
}

export function ProgramEventDetails({
  event,
  labels,
  contentTypeLabels,
  genreLabels,
  className,
}: ProgramEventDetailsProps) {
  if (event.projects.length > 0) {
    return (
      <ul className={cn('mt-8 flex flex-col gap-1 md:mt-10 md:gap-2.5', className)}>
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
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-15 pt-8 pr-10 pb-15 pl-10 text-black md:gap-12 md:pt-3 md:pb-12',
        className,
      )}
    >
      {event.participants.length > 0 && (
        <PeopleSection title={labels.participants} people={event.participants} />
      )}
      {event.moderators.length > 0 && (
        <PeopleSection title={labels.moderators} people={event.moderators} />
      )}
    </div>
  );
}
