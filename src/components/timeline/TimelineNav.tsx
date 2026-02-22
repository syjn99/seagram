import { TimelineNavDot } from './TimelineNavDot';
import type { Phase } from '../../types/timeline';

interface TimelineNavProps {
  phases: Phase[];
  activePhaseIndex: number;
}

export function TimelineNav({ phases, activePhaseIndex }: TimelineNavProps) {
  const scrollToPhase = (index: number) => {
    const section = document.querySelector(`[data-phase-index="${index}"]`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <nav
      className="fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 flex-col items-end lg:flex"
      aria-label="Timeline navigation"
    >
      {/* Connecting line */}
      <div className="absolute top-3 right-[5px] bottom-3 w-px bg-seagram-ink/10" />

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
