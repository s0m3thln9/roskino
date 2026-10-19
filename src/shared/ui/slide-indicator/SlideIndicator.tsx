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
  const isVertical = orientation === 'vertical';

  return (
    <div
      className={cn(
        'z-10 flex text-white',
        isVertical ? 'flex-col items-end justify-between' : 'items-center gap-4',
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
            className={cn('group flex', isVertical ? 'w-25 justify-end py-3' : 'py-3')}
          >
            {isVertical ? (
              <>
                <Icon name={base} className="group-hover:hidden" />
                <Icon name={`${base}-hover`} className="hidden group-hover:inline-block" />
              </>
            ) : (
              <span
                className={cn(
                  'block h-2 rounded-full bg-current transition-[width,opacity]',
                  isActive ? 'w-12.5' : 'w-2 group-hover:opacity-70',
                )}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
