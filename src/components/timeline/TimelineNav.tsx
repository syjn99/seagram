import { TimelineNavDot } from './TimelineNavDot';
import { scrollToPhase } from '../../utils/scrollToPhase';
import type { Phase } from '../../types/timeline';

interface TimelineNavProps {
  phases: Phase[];
  activePhaseIndex: number;
}

export function TimelineNav({ phases, activePhaseIndex }: TimelineNavProps) {
  return (
    <nav
      className="fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 flex-col items-end lg:flex"
      aria-label="Timeline navigation"
    >
      {/* Connecting line */}
      <div className="bg-seagram-ink/10 absolute top-3 right-[5px] bottom-3 w-px" />

      {phases.map((phase, index) => (
        <TimelineNavDot
          key={phase.id}
          phase={phase}
          isActive={index === activePhaseIndex}
          onClick={() => scrollToPhase(index)}
        />
      ))}
    </nav>
  );
}
