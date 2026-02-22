import { useEffect, useRef, useState } from 'react';
import { scrollToPhase } from '../../utils/scrollToPhase';
import type { Phase } from '../../types/timeline';

interface MobileTimelineBarProps {
  phases: Phase[];
  activePhaseIndex: number;
}

function getShortLabel(dateRange: string): string {
  return dateRange.includes('–') ? dateRange.split('–')[0] : 'Now';
}

export function MobileTimelineBar({ phases, activePhaseIndex }: MobileTimelineBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const scrollTimeout = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(false);
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = window.setTimeout(() => {
        setIsVisible(true);
      }, 800);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 lg:hidden ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-label="Timeline navigation"
    >
      <div className="border-seagram-ink/10 bg-seagram-cream/90 border-t backdrop-blur-md">
        <div className="flex items-center justify-around px-4 pt-2 pb-[env(safe-area-inset-bottom,8px)]">
          {phases.map((phase, index) => {
            const isActive = index === activePhaseIndex;
            return (
              <button
                key={phase.id}
                onClick={() => scrollToPhase(index)}
                className="flex min-w-[60px] flex-col items-center gap-1 px-3 py-2"
                aria-label={`Go to ${phase.title}`}
                aria-current={isActive ? 'step' : undefined}
              >
                <div
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-seagram-bronze scale-150' : 'bg-seagram-ink/20'
                  }`}
                />
                <span
                  className={`font-mono text-[10px] tracking-wide transition-colors duration-300 ${
                    isActive ? 'text-seagram-bronze font-medium' : 'text-seagram-ink/40'
                  }`}
                >
                  {getShortLabel(phase.dateRange)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
