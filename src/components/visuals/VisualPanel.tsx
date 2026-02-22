import { AnimatePresence } from 'motion/react';
import { VisualPlaceholder } from './VisualPlaceholder';
import type { Phase } from '../../types/timeline';

interface VisualPanelProps {
  phase: Phase;
  visualSubIndex: number;
  onImageClick?: (subIndex: number) => void;
}

export function VisualPanel({ phase, visualSubIndex, onImageClick }: VisualPanelProps) {
  const images = phase.visualSequence ?? [phase.visual];
  const clampedIndex = Math.min(visualSubIndex, images.length - 1);
  const currentVisual = images[clampedIndex];
  const visualKey = `${phase.index}-${clampedIndex}`;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <VisualPlaceholder
          key={visualKey}
          config={currentVisual}
          onImageClick={onImageClick ? () => onImageClick(clampedIndex) : undefined}
        />
      </AnimatePresence>
    </div>
  );
}
