import { AnimatePresence } from 'motion/react';
import { VisualPlaceholder } from './VisualPlaceholder';
import type { Phase } from '../../types/timeline';

interface VisualPanelProps {
  phases: Phase[];
  activePhaseIndex: number;
  phaseProgress: number;
}

export function VisualPanel({ phases, activePhaseIndex, phaseProgress }: VisualPanelProps) {
  const phase = phases[activePhaseIndex];
  if (!phase) return null;

  // Handle phases with a visual sequence (sub-transitions within a single phase)
  let currentVisual = phase.visual;
  let visualKey = `${activePhaseIndex}`;

  if (phase.visualSequence && phase.visualSequence.length > 1) {
    const segmentSize = 1 / phase.visualSequence.length;
    const visualIndex = Math.min(
      Math.floor(phaseProgress / segmentSize),
      phase.visualSequence.length - 1,
    );
    currentVisual = phase.visualSequence[visualIndex];
    visualKey = `${activePhaseIndex}-${visualIndex}`;
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg">
      <AnimatePresence mode="wait">
        <VisualPlaceholder key={visualKey} config={currentVisual} />
      </AnimatePresence>
    </div>
  );
}
