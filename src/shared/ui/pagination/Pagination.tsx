import { Link } from '@/shared/i18n';
import { cn, getPaginationItems } from '@/shared/lib';
import { Icon } from '../icon';
import { roundButtonVariants } from '../round-button';

export type PaginationLabels = {
  nav: string;
  previous: string;
  next: string;
  page: (page: number) => string;
};

type PaginationProps = {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
  labels: PaginationLabels;
  className?: string;
};

const numberClassName =
  'typo-numbers inline-flex size-10 items-center justify-center rounded-pill text-black/50';

function ArrowLink({
  href,
  label,
  icon,
}: {
  href: string | null;
  label: string;
  icon: 'arrow-back' | 'arrow-forward';
}) {
  const className = roundButtonVariants({ variant: 'ghost' });

  if (!href) {
    return (
      <span aria-hidden className={cn(className, 'pointer-events-none opacity-40')}>
        <Icon name={icon} />
      </span>
    );
  }

  return (
    <Link href={href} aria-label={label} className={className}>
      <Icon name={icon} />
    </Link>
  );
}

export function Pagination({ page, totalPages, buildHref, labels, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const items = getPaginationItems(page, totalPages);

  return (
    <nav aria-label={labels.nav} className={cn('flex items-center gap-2 md:gap-8', className)}>
      <ArrowLink
        href={page > 1 ? buildHref(page - 1) : null}
        label={labels.previous}
        icon="arrow-back"
      />
      <ul className="flex items-center">
        {items.map((item) =>
          item.type === 'gap' ? (
            <li key={item.key} aria-hidden className={numberClassName}>
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
                  'transition-colors hover:bg-grey hover:text-black',
                  item.page === page && 'bg-grey/50 text-black',
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
        icon="arrow-forward"
      />
    </nav>
  );
}
