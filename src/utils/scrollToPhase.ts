export function scrollToPhase(index: number): void {
  const gallery = document.querySelector(`[data-phase-gallery="${index}"]`);
  if (gallery) {
    gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
