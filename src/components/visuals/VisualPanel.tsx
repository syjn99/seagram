import { AnimatePresence } from 'motion/react';
import { VisualPlaceholder } from './VisualPlaceholder';
import type { Phase } from '../../types/timeline';

interface VisualPanelProps {
  phase: Phase;
  visualSubIndex: number;
}

export function VisualPanel({ phase, visualSubIndex }: VisualPanelProps) {
  const images = phase.visualSequence ?? [phase.visual];
  const clampedIndex = Math.min(visualSubIndex, images.length - 1);
  const currentVisual = images[clampedIndex];
  const visualKey = `${phase.index}-${clampedIndex}`;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <VisualPlaceholder key={visualKey} config={currentVisual} />
      </AnimatePresence>
    </div>
  );
}
