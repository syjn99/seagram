import { useEffect, useRef } from 'react';

export function ProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!barRef.current) return;

      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;

      barRef.current.style.width = `${progress * 100}%`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-50 w-full"
      style={{ height: '3px' }}
    >
      <div
        ref={barRef}
        className="bg-seagram-bronze h-full w-0"
        style={{ willChange: 'width' }}
      />
    </div>
  );
}