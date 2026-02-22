import { useRef, useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { PinnedGallery } from '../visuals/PinnedGallery';
import { TimelineNav } from '../timeline/TimelineNav';
import type { Phase } from '../../types/timeline';

interface ScrollytellingLayoutProps {
  phases: Phase[];
}

export function ScrollytellingLayout({ phases }: ScrollytellingLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  return (
    <>
      <TimelineNav phases={phases} activePhaseIndex={activePhaseIndex} />

      <div ref={containerRef} className="relative">
        {phases.map((phase) => (
          <PinnedGallery
            key={phase.id}
            phase={phase}
            phaseIndex={phase.index}
            isDesktop={isDesktop}
            onPhaseEnter={setActivePhaseIndex}
          />
        ))}
      </div>
    </>
  );
}
