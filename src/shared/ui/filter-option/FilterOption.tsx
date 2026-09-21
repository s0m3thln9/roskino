import type { ChangeEvent, MouseEvent } from 'react';
import { cn } from '@/shared/lib';
import { Icon, type IconName } from '../icon';

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

function resolveIcon(type: FilterOptionProps['type'], checked: boolean): IconName {
  if (type === 'radio') return checked ? 'radio-active' : 'radio';
  return checked ? 'check-checked' : 'check';
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
        dimmed && !checked && 'text-black/20 hover:text-black',
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
      <span className="flex pt-1 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-violet">
        <Icon name={resolveIcon(type, checked)} />
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
