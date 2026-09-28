import { Link } from '@/shared/i18n';
import { cn, getPaginationItems } from '@/shared/lib';
import { Icon, type IconName } from '../icon';
import { roundButtonVariants } from '../round-button';

export type PaginationLabels = {
  nav: string;
  previous: string;
  next: string;
  page: (page: number) => string;
};

type PaginationTone = 'light' | 'dark';

type PaginationProps = {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
  labels: PaginationLabels;
  tone?: PaginationTone;
  className?: string;
};

const numberClassName =
  'typo-numbers inline-flex size-10 items-center justify-center rounded-pill transition-colors';

const toneClassNames: Record<
  PaginationTone,
  { number: string; link: string; current: string; arrow: string }
> = {
  light: {
    number: 'text-black/50',
    link: 'hover:bg-grey hover:text-black',
    current: 'bg-grey/50 text-black',
    arrow: roundButtonVariants({ variant: 'ghost' }),
  },
  dark: {
    number: 'text-white/50',
    link: 'hover:text-white',
    current: 'bg-grey/50 text-white',
    arrow:
      'inline-flex size-10 items-center justify-center text-white transition-opacity hover:opacity-70',
  },
};

const ARROW_ICONS = {
  light: { previous: 'arrow-back', next: 'arrow-forward', size: undefined },
  dark: { previous: 'triangle-left', next: 'triangle-right', size: 32 },
} as const;

function ArrowLink({
  href,
  label,
  icon,
  iconSize,
  className,
}: {
  href: string | null;
  label: string;
  icon: IconName;
  iconSize?: number;
  className: string;
}) {
  if (!href) {
    return (
      <span aria-hidden className={cn(className, 'pointer-events-none opacity-40')}>
        <Icon name={icon} size={iconSize} />
      </span>
    );
  }

  return (
    <Link href={href} aria-label={label} className={className}>
      <Icon name={icon} size={iconSize} />
    </Link>
  );
}

export function Pagination({
  page,
  totalPages,
  buildHref,
  labels,
  tone = 'light',
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const items = getPaginationItems(page, totalPages);
  const styles = toneClassNames[tone];
  const icons = ARROW_ICONS[tone];

  return (
    <nav aria-label={labels.nav} className={cn('flex items-center gap-2 md:gap-8', className)}>
      <ArrowLink
        href={page > 1 ? buildHref(page - 1) : null}
        label={labels.previous}
        icon={icons.previous}
        iconSize={icons.size}
        className={styles.arrow}
      />
      <ul className="flex items-center">
        {items.map((item) =>
          item.type === 'gap' ? (
            <li key={item.key} aria-hidden className={cn(numberClassName, styles.number)}>
              ...
            </li>
          ) : (
            <li key={item.page}>
              <Link
                href={buildHref(item.page)}
                aria-label={labels.page(item.page)}
                aria-current={item.page === page ? 'page' : undefined}
                className={cn(
                  numberClassName,
                  item.page === page ? styles.current : [styles.number, styles.link],
                )}
              >
                {item.page}
              </Link>
            </li>
          ),
        )}
      </ul>
      <ArrowLink
        href={page < totalPages ? buildHref(page + 1) : null}
        label={labels.next}
        icon={icons.next}
        iconSize={icons.size}
        className={styles.arrow}
      />
    </nav>
  );
}
