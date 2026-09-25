import Image from 'next/image';
import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui';
import type { Partner } from '../model/schema';

export function PartnerCard({ partner, className }: { partner: Partner; className?: string }) {
  return (
    <article
      className={cn(
        'flex flex-col gap-6 bg-white p-5 md:flex-row md:items-start md:gap-10 md:p-10',
        className,
      )}
    >
      <div className="flex w-full shrink-0 items-center justify-center md:w-[257px] md:self-stretch">
        {partner.logo ? (
          <Image
            src={partner.logo.url}
            alt={partner.logo.alt || partner.name}
            width={partner.logo.width ?? 150}
            height={partner.logo.height ?? 150}
            unoptimized={partner.logo.url.endsWith('.svg')}
            className="h-auto max-h-[150px] w-auto max-w-[200px] object-contain"
          />
        ) : (
          <Icon name="company-logo-default" className="size-25 text-black md:size-[150px]" />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-5 text-black">
        <div className="flex flex-col gap-2">
          <h3 className="typo-title uppercase">{partner.name}</h3>
          <a
            href={partner.website}
            target="_blank"
            rel="noreferrer"
            className="w-fit typo-link-1 hover:opacity-70"
          >
            {partner.websiteLabel}
          </a>
        </div>
        <p className="typo-text-4">{partner.description}</p>
      </div>
    </article>
  );
}
