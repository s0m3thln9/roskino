'use client';

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { cn } from '@/shared/lib';
import { Icon } from '../icon';
import { RoundButton } from '../round-button';

const MIN_ITEMS_FOR_ARROWS = 4;

type CarouselProps = {
  labels: { previous: string; next: string };
  arrowsClassName: string;
  scrollOnItemClick?: boolean;
  children: ReactNode;
  className?: string;
};

export function Carousel({
  labels,
  arrowsClassName,
  scrollOnItemClick = false,
  children,
  className,
}: CarouselProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });
  const withArrows = Children.count(children) >= MIN_ITEMS_FOR_ARROWS;

  const updateEdges = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    setEdges({
      start: list.scrollLeft <= 1,
      end: list.scrollLeft + list.clientWidth >= list.scrollWidth - 1,
    });
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener('resize', updateEdges);
    return () => window.removeEventListener('resize', updateEdges);
  }, [updateEdges]);

  const clickToScroll = scrollOnItemClick && !withArrows;

  const handleItemClick = (event: MouseEvent<HTMLUListElement>) => {
    const list = listRef.current;
    const first = list?.firstElementChild;
    const item = (event.target as HTMLElement).closest('li');
    if (!list || !(first instanceof HTMLElement) || !item || item.parentElement !== list) return;
    list.scrollTo({ left: item.offsetLeft - first.offsetLeft, behavior: 'smooth' });
  };

  const scroll = (direction: 1 | -1) => {
    const list = listRef.current;
    const item = list?.firstElementChild;
    if (!list || !(item instanceof HTMLElement)) return;
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    list.scrollBy({ left: direction * (item.offsetWidth + gap), behavior: 'smooth' });
  };

  return (
    <div className={cn('relative -mr-5 md:-mr-10', className)}>
      <ul
        ref={listRef}
        onScroll={updateEdges}
        onClick={clickToScroll ? handleItemClick : undefined}
        className={cn(
          'flex snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto pr-5 md:pr-10',
          clickToScroll && !(edges.start && edges.end) && '[&>li]:cursor-pointer',
        )}
      >
        {children}
      </ul>
      {withArrows && !(edges.start && edges.end) && (
        <>
          <RoundButton
            label={labels.previous}
            variant="glass"
            disabled={edges.start}
            onClick={() => scroll(-1)}
            className={cn('absolute left-0 -translate-x-1/2 -translate-y-1/2', arrowsClassName)}
          >
            <Icon name="arrow-back" />
          </RoundButton>
          <RoundButton
            label={labels.next}
            variant="glass"
            disabled={edges.end}
            onClick={() => scroll(1)}
            className={cn(
              'absolute right-5 translate-x-1/2 -translate-y-1/2 md:right-10',
              arrowsClassName,
            )}
          >
            <Icon name="arrow-forward" />
          </RoundButton>
        </>
      )}
    </div>
  );
}
