'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { insertSoftHyphens } from '@/shared/lib';

function findBlock(element: HTMLElement): HTMLElement {
  let current: HTMLElement | null = element.parentElement;
  while (current && getComputedStyle(current).display === 'inline') {
    current = current.parentElement;
  }
  return current ?? element;
}

function sameSet(a: Set<number>, b: Set<number>) {
  return a.size === b.size && [...a].every((item) => b.has(item));
}

export function Hyphenated({ text }: { text: string }) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const [longWords, setLongWords] = useState<Set<number>>(() => new Set());
  const words = text.split(' ');

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const block = findBlock(root);

    const update = () => {
      const style = getComputedStyle(block);
      const width =
        block.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      const next = new Set<number>();
      root.querySelectorAll<HTMLElement>('[data-word]').forEach((word, index) => {
        word.style.whiteSpace = 'nowrap';
        word.style.hyphens = 'manual';
        if (word.getBoundingClientRect().width > width + 0.5) next.add(index);
        word.style.whiteSpace = '';
        word.style.hyphens = '';
      });
      setLongWords((previous) => (sameSet(previous, next) ? previous : next));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(block);
    observer.observe(root);
    return () => observer.disconnect();
  }, [text]);

  return (
    <span ref={rootRef}>
      {words.map((word, index) => (
        <Fragment key={index}>
          {index > 0 && ' '}
          {longWords.has(index) ? (
            <span data-word className="hyphens-auto">
              {insertSoftHyphens(word)}
            </span>
          ) : (
            <span data-word>{word}</span>
          )}
        </Fragment>
      ))}
    </span>
  );
}
