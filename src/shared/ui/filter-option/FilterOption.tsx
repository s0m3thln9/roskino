import type { ChangeEvent, MouseEvent } from 'react';
import { cn } from '@/shared/lib';
import { Icon } from '../icon';

type FilterOptionProps = {
  type: 'checkbox' | 'radio';
  name: string;
  value: string;
  label: string;
  checked: boolean;
  dimmed?: boolean;
  clearLabel?: string;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
};

function OptionMark({
  type,
  checked,
  dimmed,
}: Pick<FilterOptionProps, 'type' | 'checked'> & { dimmed: boolean }) {
  const hoverTone = dimmed ? 'bg-current' : 'bg-dark-grey';
  if (type === 'radio') {
    return (
      <span className="relative inline-flex">
        <Icon name="radio" />
        {checked ? (
          <span className="absolute inset-0 m-auto size-1.5 rounded-full bg-red" />
        ) : (
          <span
            className={cn(
              'absolute inset-0 m-auto hidden size-1.5 rounded-full group-hover:block',
              hoverTone,
            )}
          />
        )}
      </span>
    );
  }
  if (checked) return <Icon name="check-checked" className="text-red" />;
  return (
    <span className="inline-flex size-3 items-center justify-center">
      <span className="h-0.5 w-3 bg-current group-hover:hidden" />
      <Icon
        name="check-checked"
        className={cn('hidden group-hover:inline-block', !dimmed && 'text-dark-grey')}
      />
    </span>
  );
}

export function FilterOption({
  type,
  name,
  value,
  label,
  checked,
  dimmed = false,
  clearLabel,
  onCheckedChange,
  className,
}: FilterOptionProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onCheckedChange(event.target.checked);
  };

  const handleClick = (event: MouseEvent<HTMLInputElement>) => {
    if (type === 'radio' && checked) {
      event.preventDefault();
      onCheckedChange(false);
    }
  };

  return (
    <label
      className={cn(
        'group flex min-w-25 cursor-pointer items-start gap-3 typo-filter text-black transition-colors',
        dimmed && !checked && 'text-black/20 hover:text-black/50',
        className,
      )}
    >
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        onClick={handleClick}
        className="peer sr-only"
      />
      <span className="flex pt-1 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-turquoise">
        <OptionMark type={type} checked={checked} dimmed={dimmed && !checked} />
      </span>
      <span className="flex-1">{label}</span>
      {checked && (
        <span
          className="flex pt-1 opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden={clearLabel ? undefined : true}
          title={clearLabel}
        >
          <Icon name="clear" />
        </span>
      )}
    </label>
  );
}
