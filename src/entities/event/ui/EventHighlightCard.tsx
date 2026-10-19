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
        '-ml-5 flex flex-col justify-between gap-8 border-l-10 border-current pt-3.5 pr-5 pb-3 pl-7.5 md:ml-0 md:gap-5 md:border-l-2 md:pt-6 md:pr-0 md:pb-10 md:pl-10',
        className,
      )}
    >
      <div className="flex flex-col">
        {highlight.kind === 'number' ? (
          <span className="typo-headline-1 leading-none max-md:-mt-1.5 max-md:mb-1 max-md:text-[4rem]">
            {highlight.value}
          </span>
        ) : (
          <Icon name={highlight.icon} className="mb-2.5 h-12 w-24 max-md:hidden" />
        )}
        <span className="w-min typo-title uppercase">{highlight.caption}</span>
      </div>
      <p className="typo-text-2">{highlight.text}</p>
    </div>
  );
}
