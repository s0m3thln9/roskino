import Image from 'next/image';
import { ROUTES } from '@/shared/config';
import { Link } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui';
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
        'group relative flex aspect-square flex-col items-center justify-center gap-8 bg-grey/50 p-6 backdrop-blur-panel transition-colors hover:bg-white md:p-10',
        className,
      )}
    >
      <div className="flex h-[100px] items-center justify-center md:h-[140px]">
        {participant.logo ? (
          <Image
            src={participant.logo.url}
            alt={participant.logo.alt || participant.name}
            width={participant.logo.width ?? 140}
            height={participant.logo.height ?? 140}
            unoptimized={participant.logo.url.endsWith('.svg')}
            className="h-auto max-h-[100px] w-auto object-contain md:max-h-[140px]"
          />
        ) : (
          <Icon name="company-logo-placeholder" className="size-25 md:size-35" />
        )}
      </div>

      <div className="flex flex-col items-center text-center">
        <h3 className="typo-title uppercase">
          <Link
            href={href ?? ROUTES.participant(participant.id)}
            className="before:absolute before:inset-0"
          >
            {participant.name}
          </Link>
        </h3>
        {participant.websiteLabel && (
          <span className="typo-link-2 leading-8">{participant.websiteLabel}</span>
        )}
      </div>
    </article>
  );
}
