import Image from 'next/image';
import { ROUTES } from '@/shared/config';
import { Link } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import { Hyphenated, Icon } from '@/shared/ui';
import type { ParticipantPreview } from '../model/schema';

type ParticipantCardProps = {
  participant: ParticipantPreview;
  href?: string;
  className?: string;
};

export function ParticipantCard({ participant, href, className }: ParticipantCardProps) {
  return (
    <article
      className={cn(
        'group relative flex min-h-80 flex-col items-center justify-start gap-8 bg-grey/50 p-10 backdrop-blur-panel transition-colors hover:bg-white md:aspect-square md:min-h-min md:justify-center',
        className,
      )}
    >
      <div className="flex min-h-[140px] w-full shrink-0 items-center justify-center">
        {participant.logo ? (
          <Image
            src={participant.logo.url}
            alt={participant.logo.alt || participant.name}
            width={participant.logo.width ?? 140}
            height={participant.logo.height ?? 140}
            unoptimized={!participant.logo.width || participant.logo.url.endsWith('.svg')}
            style={{
              width: participant.logo.width ?? 'auto',
              height: participant.logo.width ? 'auto' : (participant.logo.height ?? 'auto'),
            }}
            className="max-w-full object-contain"
          />
        ) : (
          <Icon name="company-logo-placeholder" className="size-35" />
        )}
      </div>

      <div className="flex flex-col items-center text-center">
        <h3 className="typo-title uppercase">
          <Link
            href={href ?? ROUTES.participant(participant.id)}
            scroll={false}
            className="before:absolute before:inset-0"
          >
            <Hyphenated text={participant.name} />
          </Link>
        </h3>
        {participant.websiteLabel && (
          <span className="typo-link-2 leading-8">{participant.websiteLabel}</span>
        )}
      </div>
    </article>
  );
}
