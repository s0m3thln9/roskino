import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui';
import type { EventDetail } from '../model/schema';

export function EventDetailCard({
  detail,
  className,
}: {
  detail: EventDetail;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2.5 border-l-2 border-black pt-1.5 pl-5 md:pl-10',
        className,
      )}
    >
      <Icon name={detail.icon} className="h-9 w-18 md:h-12 md:w-24" />
      <div className="flex flex-col typo-title">
        <span className="typo-text-3 font-normal text-black/50">{detail.label}</span>
        {detail.lines.map((line) => (
          <span key={line} className="uppercase">
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}
