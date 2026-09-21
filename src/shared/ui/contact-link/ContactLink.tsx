import type { AnchorHTMLAttributes } from 'react';
import { cn } from '@/shared/lib';
import { Icon, type IconName } from '../icon';

type ContactLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  icon: IconName;
  href: string;
};

export function ContactLink({ icon, className, children, ...props }: ContactLinkProps) {
  return (
    <a
      className={cn(
        'inline-flex items-center gap-5 typo-link-1 decoration-current hover:opacity-70',
        className,
      )}
      {...props}
    >
      <Icon name={icon} />
      <span>{children}</span>
    </a>
  );
}
