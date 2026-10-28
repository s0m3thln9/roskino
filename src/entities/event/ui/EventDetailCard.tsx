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
        '-ml-5 flex flex-col gap-8 border-l-10 border-current pt-1.5 pl-7.5 md:ml-0 md:gap-6 md:border-l-2 md:pb-7.5 md:pl-10',
        className,
      )}
    >
      <Icon name={detail.icon} className="h-12 w-24" />
      <div className="flex flex-col typo-title">
        <span className="font-sans typo-text-3 font-normal opacity-50 max-md:leading-8">
          {detail.label}
        </span>
        {detail.lines.map((line, index) => (
          <span key={line} className="uppercase">
            {index < detail.lines.length - 1 ? `${line};` : line}
          </span>
        ))}
      </div>
    </div>
  );
}
