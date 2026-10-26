'use client';

import { Button } from '@/shared/ui';

export function ReloadButton({ label }: { label: string }) {
  return (
    <Button variant="dark-outline" width="full" onClick={() => window.location.reload()}>
      {label}
    </Button>
  );
}
