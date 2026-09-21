'use client';

import { useState } from 'react';
import { Button, FilterGroup, FilterOption, Modal, SlideIndicator } from '@/shared/ui';

const ORIGINS = ['Russian', 'International'];
const TYPES = ['Animation', 'Feature Film', 'Series', 'Documentaries'];

export function UiKitInteractive() {
  const [origin, setOrigin] = useState<string | null>('Russian');
  const [types, setTypes] = useState<string[]>(['Animation', 'Series', 'Documentaries']);
  const [slide, setSlide] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <>
      <FilterGroup legend="Filter by category:">
        {ORIGINS.map((value) => (
          <FilterOption
            key={value}
            type="radio"
            name="origin"
            value={value}
            label={value}
            checked={origin === value}
            onCheckedChange={(checked) => setOrigin(checked ? value : null)}
          />
        ))}
      </FilterGroup>
      <FilterGroup legend="Filter by project type:">
        {TYPES.map((value) => (
          <FilterOption
            key={value}
            type="checkbox"
            name="type"
            value={value}
            label={value}
            checked={types.includes(value)}
            dimmed={types.length > 0}
            onCheckedChange={(checked) =>
              setTypes((prev) =>
                checked ? [...prev, value] : prev.filter((item) => item !== value),
              )
            }
          />
        ))}
      </FilterGroup>
      <div className="h-80 bg-black p-4">
        <SlideIndicator
          count={10}
          activeIndex={slide}
          onSelect={setSlide}
          getLabel={(index) => `Slide ${index + 1}`}
          className="h-full"
        />
      </div>
      <div className="bg-black p-4">
        <Button onClick={() => setOpen(true)}>Open modal</Button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} closeLabel="Close">
        <p className="typo-title uppercase">Foreign company</p>
        <p className="mt-10 max-w-230 typo-text-6">
          Nunc fringilla dui diam, vel placerat tortor facilisis vitae. Mauris pellentesque eros ut
          congue condimentum.
        </p>
      </Modal>
    </>
  );
}
