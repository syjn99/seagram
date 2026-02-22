interface LightboxControlsProps {
  onPrev: () => void;
  onNext: () => void;
}

export function LightboxControls({ onPrev, onNext }: LightboxControlsProps) {
  const buttonClass =
    'absolute top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-seagram-bronze';

  return (
    <>
      <button
        onClick={onPrev}
        className={`${buttonClass} left-4`}
        aria-label="Previous image"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <polyline points="12,4 6,10 12,16" />
        </svg>
      </button>
      <button
        onClick={onNext}
        className={`${buttonClass} right-4`}
        aria-label="Next image"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <polyline points="8,4 14,10 8,16" />
        </svg>
      </button>
    </>
  );
}
