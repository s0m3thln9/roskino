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
    <div className={cn('flex max-w-[774px] flex-col gap-6 typo-text-4 md:gap-3', className)}>
      {about.map((paragraph, paragraphIndex) => (
        <p key={paragraphIndex}>
          {paragraph.map((segment, index) =>
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
      ))}
    </div>
  );
}
