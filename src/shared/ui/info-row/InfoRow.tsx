import type { ReactNode } from 'react';
import { cn } from '@/shared/lib';

type InfoRowProps = {
  label: string;
  value: ReactNode;
  className?: string;
};

const LEADER = '.'.repeat(300);

export function InfoRow({ label, value, className }: InfoRowProps) {
  return (
    <div className={cn('flex max-h-7 items-start gap-1 typo-text-6', className)}>
      <dt className="min-w-0 flex-1 overflow-hidden whitespace-nowrap text-white/50">
        {label}
        <span aria-hidden>{LEADER}</span>
      </dt>
      <dd className="shrink-0 text-right text-white">{value}</dd>
    </div>
  );
}
