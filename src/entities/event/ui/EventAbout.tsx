import { cn } from '@/shared/lib';
import type { MarketEvent } from '../model/schema';

export function EventAbout({
  about,
  className,
}: {
  about: MarketEvent['about'];
  className?: string;
}) {
  return (
    <section className={cn('flex max-w-text flex-col gap-6 text-black', className)}>
      <h2 className="typo-title uppercase">{about.title}</h2>
      <p className="typo-text-4">
        {about.body.map((segment, index) =>
          segment.href ? (
            <a
              key={index}
              href={segment.href}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-from-font hover:opacity-70"
            >
              {segment.text}
            </a>
          ) : (
            <span key={index}>{segment.text}</span>
          ),
        )}
      </p>
    </section>
  );
}
