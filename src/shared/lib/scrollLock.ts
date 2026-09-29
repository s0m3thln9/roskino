let activeLocks = 0;

export function lockDocumentScroll(): () => void {
  activeLocks += 1;
  if (activeLocks === 1) document.documentElement.style.overflow = 'hidden';

  let released = false;
  return () => {
    if (released) return;
    released = true;
    activeLocks -= 1;
    if (activeLocks === 0) document.documentElement.style.overflow = '';
  };
}
