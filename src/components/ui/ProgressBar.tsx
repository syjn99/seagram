import { useEffect, useRef } from 'react';
import { ScrollTrigger } from '../../utils/gsapSetup';

export function ProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (barRef.current) {
          barRef.current.style.width = `${self.progress * 100}%`;
        }
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 h-[3px] w-full">
      <div ref={barRef} className="bg-seagram-bronze h-full w-0" style={{ willChange: 'width' }} />
    </div>
  );
}
