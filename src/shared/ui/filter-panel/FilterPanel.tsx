'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { cn, lockDocumentScroll } from '@/shared/lib';
import { Button } from '../button';
import { Icon } from '../icon';
import { RoundButton } from '../round-button';

export type FilterChip = {
  key: string;
  label: string;
  count?: number;
  active: boolean;
};

export type FilterPanelLabels = {
  title: string;
  open: string;
  apply: string;
  reset: string;
  close: string;
};

type FilterPanelProps = {
  chips: FilterChip[];
  canReset: boolean;
  onReset: () => void;
  labels: FilterPanelLabels;
  children: ReactNode;
  className?: string;
};

function FilterSheet({
  open,
  title,
  applyLabel,
  closeLabel,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  applyLabel: string;
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
    return lockDocumentScroll();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-black/60 p-0 backdrop:bg-transparent"
    >
      <div className="absolute inset-x-0 top-25 bottom-0 flex flex-col overflow-hidden rounded-t-pill bg-apricot text-black">
        <div className="flex items-start justify-between gap-6 px-10 pt-10">
          <h2 id={titleId} className="typo-title uppercase">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="group inline-flex"
          >
            <Icon name="close" className="size-8 group-hover:hidden group-active:hidden" />
            <Icon
              name="close-hover"
              className="hidden size-8 group-hover:inline-block group-active:inline-block"
            />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain px-10 pt-8 pb-16">
          {open && children}
        </div>
        <div className="relative px-5 py-5">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-full h-16 bg-linear-to-b from-peach/0 to-peach/20"
          />
          <Button width="full" onClick={onClose}>
            {applyLabel}
          </Button>
        </div>
      </div>
    </dialog>
  );
}

export function FilterPanel({
  chips,
  canReset,
  onReset,
  labels,
  children,
  className,
}: FilterPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={cn('flex flex-col gap-8 max-lg:hidden', className)}>
        {children}
        {canReset && (
          <RoundButton label={labels.reset} variant="muted" onClick={onReset}>
            <Icon name="reset" />
          </RoundButton>
        )}
      </div>

      <div className="-mx-10 flex [scrollbar-width:none] items-center gap-2 overflow-x-auto px-10 md:-mx-8 md:gap-1 md:px-8 lg:hidden">
        <RoundButton
          label={labels.open}
          variant="muted"
          active={canReset}
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <Icon name="filter" />
        </RoundButton>
        <RoundButton label={labels.reset} variant="muted" disabled={!canReset} onClick={onReset}>
          <Icon name="reset" />
        </RoundButton>
        <span aria-hidden className="h-5 w-px shrink-0 bg-grey md:mx-1 md:h-6" />
        {chips.map((chip) => (
          <button
            key={chip.key}
            type="button"
            aria-haspopup="dialog"
            onClick={() => setOpen(true)}
            className={cn(
              'inline-flex h-10 shrink-0 items-center gap-4 rounded-pill px-6 typo-text-7 whitespace-nowrap transition-colors',
              chip.active
                ? 'bg-dark-grey text-white hover:bg-dark-grey/90'
                : 'bg-grey/50 text-black hover:bg-apricot',
            )}
          >
            <span>{chip.label}</span>
            {chip.count ? <span className="text-peach">{chip.count}</span> : null}
          </button>
        ))}
      </div>

      <FilterSheet
        open={open}
        title={labels.title}
        applyLabel={labels.apply}
        closeLabel={labels.close}
        onClose={() => setOpen(false)}
      >
        <div className="flex flex-col gap-10">{children}</div>
      </FilterSheet>
    </>
  );
}
