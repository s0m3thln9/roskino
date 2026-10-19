'use client';

import { useRef, useState, type CSSProperties } from 'react';
import { cn } from '@/shared/lib';
import { Icon, RoundButton } from '@/shared/ui';
import type { NewsQuote } from '../model/schema';

type QuoteSliderProps = {
  quotes: NewsQuote[];
  labels: { previous: string; next: string };
};

const MOBILE_GAP = 40;

export function QuoteSlider({ quotes, labels }: QuoteSliderProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const last = quotes.length - 1;
  const multiple = last > 0;

  const go = (next: number) => {
    const target = Math.min(last, Math.max(0, next));
    setIndex(target);
    const list = listRef.current;
    if (list && getComputedStyle(list).overflowX === 'auto') {
      list.scrollTo({ left: target * (list.clientWidth + MOBILE_GAP), behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    const list = listRef.current;
    if (!list || getComputedStyle(list).overflowX !== 'auto') return;
    setIndex(Math.round(list.scrollLeft / (list.clientWidth + MOBILE_GAP)));
  };

  const arrows = (className: string, previousClassName?: string, nextClassName?: string) => (
    <>
      <RoundButton
        label={labels.previous}
        disabled={index === 0}
        onClick={() => go(index - 1)}
        className={cn(className, previousClassName)}
      >
        <Icon name="arrow-back" />
      </RoundButton>
      <RoundButton
        label={labels.next}
        disabled={index === last}
        onClick={() => go(index + 1)}
        className={cn(className, nextClassName)}
      >
        <Icon name="arrow-forward" />
      </RoundButton>
    </>
  );

  return (
    <figure className="relative flex flex-col gap-5">
      <div className="flex items-start justify-between gap-6 lg:contents">
        <Icon
          name="quote"
          className="h-16 w-24 shrink-0 text-peach lg:absolute lg:top-2 lg:right-[calc(100%+1.25rem)]"
        />
        {multiple && <div className="flex gap-3 lg:hidden">{arrows('')}</div>}
      </div>

      <div className="relative">
        <div className="lg:[clip-path:inset(0_-100vw_0_0)]">
          <ul
            ref={listRef}
            onScroll={multiple ? handleScroll : undefined}
            style={{ '--quote-index': index } as CSSProperties}
            className="flex snap-x snap-mandatory [scrollbar-width:none] gap-10 overflow-x-auto lg:translate-x-[calc(var(--quote-index)*(-100%_-_3.75rem))] lg:snap-none lg:gap-15 lg:overflow-visible lg:transition-transform lg:duration-500"
          >
            {quotes.map((quote, quoteIndex) => (
              <li
                key={quoteIndex}
                aria-hidden={multiple && quoteIndex !== index ? true : undefined}
                className="flex w-full shrink-0 snap-start flex-col gap-5"
              >
                <blockquote className="text-xl leading-10 font-semibold text-red italic md:text-2xl md:text-black">
                  {quote.text}
                </blockquote>
                <div className="flex flex-col">
                  <span className="typo-text-5 md:text-red">{quote.author}</span>
                  {quote.position && (
                    <span className="typo-text-3 opacity-50">{quote.position}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {multiple &&
          arrows(
            'absolute top-33 max-lg:hidden',
            'right-[calc(100%+4.5rem)]',
            'left-[calc(100%+4.5rem)]',
          )}
      </div>
    </figure>
  );
}
