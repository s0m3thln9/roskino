import Image from 'next/image';
import type { ReactNode } from 'react';
import { cn } from '@/shared/lib';
import { Icon, Person, Tag } from '@/shared/ui';
import type { Participant } from '../model/schema';

type ParticipantDetailsProps = {
  participant: Participant;
  labels: {
    contentTypes: string;
    achievements: string;
    projects: string;
    country: string;
    territory: string;
  };
  contentTypeLabels: Record<string, string>;
  projectsSlot?: ReactNode;
  className?: string;
};

export function ParticipantDetails({
  participant,
  labels,
  contentTypeLabels,
  projectsSlot,
  className,
}: ParticipantDetailsProps) {
  return (
    <div className={cn('flex flex-col gap-10', className)}>
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-15">
        <div className="flex max-w-[392px] flex-col gap-10">
          <div className="flex h-[140px] items-center">
            {participant.logo ? (
              <Image
                src={participant.logo.url}
                alt={participant.logo.alt || participant.name}
                width={participant.logo.width ?? 140}
                height={participant.logo.height ?? 140}
                unoptimized={participant.logo.url.endsWith('.svg')}
                className="h-auto max-h-[140px] w-auto object-contain"
              />
            ) : (
              <Icon name="company-logo-placeholder" />
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <h2 className="typo-title uppercase">{participant.name}</h2>
              {participant.website && (
                <a
                  href={participant.website}
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit typo-link-2 hover:opacity-70"
                >
                  {participant.websiteLabel ?? participant.website}
                </a>
              )}
            </div>

            <address className="flex flex-col typo-text-7 not-italic">
              {participant.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>

            {(participant.country || participant.distributionTerritory) && (
              <div className="flex flex-col typo-text-7">
                {participant.country && (
                  <span>
                    {labels.country} — {participant.country}
                  </span>
                )}
                {participant.distributionTerritory && (
                  <span>
                    {labels.territory} — {participant.distributionTerritory}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <Person
          name={participant.contact.name}
          position={participant.contact.position}
          email={participant.contact.email}
          photoUrl={participant.contact.photo?.url}
          className="lg:pt-45"
        />
      </div>

      <p className="max-w-[920px] typo-text-6">{participant.about}</p>

      {participant.achievements && (
        <section className="flex max-w-[920px] flex-col gap-2">
          <h3 className="typo-button">{labels.achievements}</h3>
          <p className="typo-text-6">{participant.achievements}</p>
        </section>
      )}

      <section className="flex flex-col gap-5">
        <h3 className="typo-button">{labels.contentTypes}</h3>
        <ul className="flex flex-wrap gap-2">
          {participant.contentTypes.map((type) => (
            <li key={type}>
              <Tag>{contentTypeLabels[type] ?? type}</Tag>
            </li>
          ))}
        </ul>
      </section>

      {projectsSlot && (
        <section className="flex flex-col gap-5">
          <h3 className="typo-button">{labels.projects}</h3>
          {projectsSlot}
        </section>
      )}
    </div>
  );
}
