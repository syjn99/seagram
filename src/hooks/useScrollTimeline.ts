import { useRef, useState, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from '../utils/gsapSetup';

interface UseScrollTimelineOptions {
  containerRef: React.RefObject<HTMLDivElement | null>;
  phaseCount: number;
}

interface ScrollTimelineState {
  activePhaseIndex: number;
  phaseProgress: number;
}

export function useScrollTimeline({
  containerRef,
  phaseCount,
}: UseScrollTimelineOptions): ScrollTimelineState {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const phaseProgressRef = useRef(0);
  const [phaseProgress, setPhaseProgress] = useState(0);

  // Throttle phase progress updates to avoid excessive re-renders
  const lastProgressUpdate = useRef(0);
  const updatePhaseProgress = useCallback((progress: number) => {
    phaseProgressRef.current = progress;
    const now = Date.now();
    // Only update React state every 100ms for sequence-based transitions
    if (now - lastProgressUpdate.current > 100) {
      lastProgressUpdate.current = now;
      setPhaseProgress(progress);
    }
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const sections = containerRef.current.querySelectorAll<HTMLElement>('[data-phase-index]');

      if (sections.length === 0) return;

      // Create a ScrollTrigger for each phase section
      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActivePhaseIndex(index),
          onEnterBack: () => setActivePhaseIndex(index),
          onUpdate: (self) => updatePhaseProgress(self.progress),
        });
      });
    },
    { scope: containerRef, dependencies: [phaseCount] },
  );

  return { activePhaseIndex, phaseProgress };
}
