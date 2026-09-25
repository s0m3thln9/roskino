'use client';

import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { useAddToFavoritesMutation } from '../api/favoritesApi';

type AddToFavoritesButtonProps = {
  projectId: string;
  isFavorite: boolean;
  labels: { add: string; added: string; error: string };
  className?: string;
};

export function AddToFavoritesButton({
  projectId,
  isFavorite,
  labels,
  className,
}: AddToFavoritesButtonProps) {
  const [addToFavorites, { isLoading, isError, isSuccess }] = useAddToFavoritesMutation();
  const added = isFavorite || isSuccess;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Button
        variant="primary"
        width="fixed"
        disabled={added || isLoading}
        onClick={() => addToFavorites(projectId)}
        className="border-2 border-black"
      >
        {added ? labels.added : labels.add}
      </Button>
      {isError && <span className="typo-text-7 text-violet">{labels.error}</span>}
    </div>
  );
}
