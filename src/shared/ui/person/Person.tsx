import Image from 'next/image';
import { cn } from '@/shared/lib';

type PersonProps = {
  name: string;
  position?: string;
  email?: string;
  emails?: string[];
  photoUrl?: string | null;
  className?: string;
};

export function Person({ name, position, email, emails, photoUrl, className }: PersonProps) {
  const addresses = emails ?? (email ? [email] : []);
  return (
    <div className={cn('flex flex-col items-start gap-5 md:flex-row md:gap-8', className)}>
      <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-current">
        {photoUrl && <Image src={photoUrl} alt="" fill sizes="80px" className="object-cover" />}
      </div>
      <div className="flex min-w-0 flex-col gap-1">
        <p className="typo-button">{name}</p>
        {(position || addresses.length > 0) && (
          <div className="flex flex-col">
            {position && <p className="typo-text-7">{position}</p>}
            {addresses.map((address, index) => (
              <a
                key={`${address}-${index}`}
                href={`mailto:${address}`}
                className="typo-link-2 break-all hover:opacity-70"
              >
                {address}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
