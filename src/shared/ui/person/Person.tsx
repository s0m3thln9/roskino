import Image from 'next/image';
import { cn } from '@/shared/lib';

type PersonProps = {
  name: string;
  position?: string;
  email?: string;
  photoUrl?: string | null;
  className?: string;
};

export function Person({ name, position, email, photoUrl, className }: PersonProps) {
  return (
    <div className={cn('flex items-start gap-5 md:gap-8', className)}>
      <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-current md:size-20">
        {photoUrl && <Image src={photoUrl} alt="" fill sizes="80px" className="object-cover" />}
      </div>
      <div className="flex min-w-0 flex-col gap-1">
        <p className="typo-button">{name}</p>
        {(position || email) && (
          <div className="flex flex-col">
            {position && <p className="typo-text-7">{position}</p>}
            {email && (
              <a href={`mailto:${email}`} className="typo-link-2 break-all hover:opacity-70">
                {email}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
