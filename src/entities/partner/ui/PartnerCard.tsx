import Image from 'next/image';
import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui';
import type { Partner } from '../model/schema';

export function PartnerCard({ partner, className }: { partner: Partner; className?: string }) {
  return (
    <article
      className={cn(
        'flex flex-col gap-15 bg-white p-10 md:flex-row md:items-start md:gap-10',
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
            className="h-auto max-h-65 w-full object-contain md:max-h-[220px] md:max-w-[257px]"
          />
        ) : (
          <Icon name="company-logo-placeholder" className="size-[150px] text-black" />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-10 text-black md:gap-7.5">
        <div className="flex flex-col gap-3 md:gap-2">
          <h3 className="max-w-[32rem] typo-title uppercase">{partner.name}</h3>
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
