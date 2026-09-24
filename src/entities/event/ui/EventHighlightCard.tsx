import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui';
import type { EventHighlight } from '../model/schema';

export function EventHighlightCard({
  highlight,
  className,
}: {
  highlight: EventHighlight;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col justify-between gap-5 border-l-2 border-black pt-3.5 pb-5 pl-5 text-black md:pb-10 md:pl-10',
        className,
      )}
    >
      <div className="flex flex-col">
        {highlight.kind === 'number' ? (
          <span className="typo-headline-1 leading-none">{highlight.value}</span>
        ) : (
          <Icon name={highlight.icon} className="mb-2.5 h-9 w-18 md:h-12 md:w-24" />
        )}
        <span className="typo-title uppercase">{highlight.caption}</span>
      </div>
      <p className="typo-text-2">{highlight.text}</p>
    </div>
  );
}
