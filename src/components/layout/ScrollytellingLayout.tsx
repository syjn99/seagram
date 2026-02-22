import { useRef } from 'react';
import { useScrollTimeline } from '../../hooks/useScrollTimeline';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { VisualPanel } from '../visuals/VisualPanel';
import { TimelineSection } from '../timeline/TimelineSection';
import { TimelineNav } from '../timeline/TimelineNav';
import type { Phase } from '../../types/timeline';

interface ScrollytellingLayoutProps {
  phases: Phase[];
}

export function ScrollytellingLayout({ phases }: ScrollytellingLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const { activePhaseIndex, phaseProgress } = useScrollTimeline({
    containerRef,
    phaseCount: phases.length,
  });

  return (
    <>
      <TimelineNav phases={phases} activePhaseIndex={activePhaseIndex} />

      <div ref={containerRef} className="relative">
        {isDesktop ? (
          /* Desktop: two-column layout with sticky visual */
          <div className="grid grid-cols-[45%_55%]">
            {/* Sticky visual panel */}
            <div className="sticky top-0 h-screen self-start p-6">
              <VisualPanel
                phases={phases}
                activePhaseIndex={activePhaseIndex}
                phaseProgress={phaseProgress}
              />
            </div>

            {/* Scrolling text column */}
            <div>
              {phases.map((phase) => (
                <TimelineSection key={phase.id} phase={phase} />
              ))}
            </div>
          </div>
        ) : (
          /* Mobile: stacked layout with inline visuals */
          <div>
            {phases.map((phase) => (
              <TimelineSection key={phase.id} phase={phase} showInlineVisual />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
