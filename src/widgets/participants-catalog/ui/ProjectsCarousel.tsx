'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon, RoundButton } from '@/shared/ui';

const SCROLL_STEP = 230;

type ProjectsCarouselProps = {
  labels: { previous: string; next: string };
  children: ReactNode;
};

export function ProjectsCarousel({ labels, children }: ProjectsCarouselProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

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

  const scroll = (direction: 1 | -1) =>
    listRef.current?.scrollBy({ left: direction * SCROLL_STEP, behavior: 'smooth' });

  return (
    <div className="relative -mr-5 md:-mr-10">
      <ul
        ref={listRef}
        onScroll={updateEdges}
        className="flex snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto pr-5 md:pr-10"
      >
        {children}
      </ul>
      {!(edges.start && edges.end) && (
        <>
          <RoundButton
            label={labels.previous}
            variant="glass"
            disabled={edges.start}
            onClick={() => scroll(-1)}
            className="absolute top-35 left-0 -translate-x-1/2 -translate-y-1/2"
          >
            <Icon name="arrow-back" />
          </RoundButton>
          <RoundButton
            label={labels.next}
            variant="glass"
            disabled={edges.end}
            onClick={() => scroll(1)}
            className="absolute top-35 right-5 translate-x-1/2 -translate-y-1/2 md:right-10"
          >
            <Icon name="arrow-forward" />
          </RoundButton>
        </>
      )}
    </div>
  );
}
