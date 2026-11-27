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
        'group relative flex h-[420px] min-w-0 flex-col items-center justify-between bg-grey/50 px-5 py-10 backdrop-blur-[100px] transition-colors hover:bg-white',
        className,
      )}
    >
      <div className="flex h-[140px] w-full shrink-0 items-center justify-center">
        {participant.logo ? (
          <Image
            src={participant.logo.url}
            alt={participant.logo.alt || participant.name}
            width={participant.logo.width ?? 140}
            height={participant.logo.height ?? 140}
            unoptimized={!participant.logo.width || participant.logo.url.endsWith('.svg')}
            style={{
              width: participant.logo.width ?? 'auto',
              height: participant.logo.height ?? 'auto',
            }}
            className="max-w-none shrink-0 object-contain"
          />
        ) : (
          <Icon name="company-logo-placeholder" className="size-35" />
        )}
      </div>

      <div className="flex w-full flex-col items-center text-center">
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
          <span className="typo-link-2 leading-7">{participant.websiteLabel}</span>
        )}
      </div>
    </article>
  );
}
