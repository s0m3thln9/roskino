'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from '@/shared/i18n';
import { Hyphenated } from '@/shared/ui';

const DEFAULT_TITLE_LINES = 3;

type NewsCardTextProps = {
  href: string;
  title: string;
  excerpt: string;
  totalLines: number;
};

export function NewsCardText({ href, title, excerpt, totalLines }: NewsCardTextProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleLines, setTitleLines] = useState(DEFAULT_TITLE_LINES);

  useEffect(() => {
    const element = titleRef.current;
    if (!element) return;
    const update = () => {
      const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
      if (!lineHeight) return;
      setTitleLines(Math.max(1, Math.round(element.getBoundingClientRect().height / lineHeight)));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const excerptLines = Math.max(0, totalLines - titleLines);

  return (
    <>
      <h3
        ref={titleRef}
        className="line-clamp-(--title-lines) typo-title uppercase"
        style={{ '--title-lines': totalLines } as CSSProperties}
      >
        <Link href={href} className="before:absolute before:inset-0">
          <Hyphenated text={title} />
        </Link>
      </h3>
      <p
        className="line-clamp-(--excerpt-lines) typo-text-3 text-black"
        style={{ '--excerpt-lines': excerptLines } as CSSProperties}
        hidden={excerptLines === 0}
      >
        {excerpt}
      </p>
    </>
  );
}
