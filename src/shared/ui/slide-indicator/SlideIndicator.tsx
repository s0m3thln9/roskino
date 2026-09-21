import { cn } from '@/shared/lib';
import { Icon } from '../icon';

type SlideIndicatorProps = {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  getLabel: (index: number) => string;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
};

export function SlideIndicator({
  count,
  activeIndex,
  onSelect,
  getLabel,
  orientation = 'vertical',
  className,
}: SlideIndicatorProps) {
  return (
    <div
      className={cn(
        'flex text-white',
        orientation === 'vertical' ? 'flex-col items-end justify-between' : 'items-center gap-3',
        className,
      )}
    >
      {Array.from({ length: count }, (_, index) => {
        const isActive = index === activeIndex;
        const base = isActive ? 'carousel-bar' : 'carousel-dot';
        return (
          <button
            key={index}
            type="button"
            aria-label={getLabel(index)}
            aria-current={isActive ? 'true' : undefined}
            onClick={() => onSelect(index)}
            className="group flex py-2"
          >
            <Icon name={base} className="group-hover:hidden" />
            <Icon name={`${base}-hover`} className="hidden group-hover:inline-block" />
          </button>
        );
      })}
    </div>
  );
}
