interface TimelineNavDotProps {
  phase: { id: string; title: string; dateRange: string };
  isActive: boolean;
  onClick: () => void;
}

export function TimelineNavDot({ phase, isActive, onClick }: TimelineNavDotProps) {
  return (
    <button
      onClick={onClick}
      className="group relative flex items-center gap-3 py-2"
      aria-label={`Go to ${phase.title}`}
    >
      {/* Dot */}
      <div
        className={`h-3 w-3 rounded-full border-2 transition-all duration-300 ${
          isActive
            ? 'border-seagram-bronze bg-seagram-bronze scale-125'
            : 'border-seagram-ink/20 group-hover:border-seagram-bronze/50 bg-transparent'
        }`}
      />

      {/* Label (visible on hover or when active) */}
      <div
        className={`bg-seagram-charcoal pointer-events-none absolute right-6 rounded px-3 py-1.5 text-xs whitespace-nowrap text-white shadow-lg transition-all duration-200 ${
          isActive
            ? 'translate-x-0 opacity-100'
            : 'translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
        }`}
      >
        <span className="text-seagram-bronze-light font-mono">{phase.dateRange}</span>
        <span className="mx-1.5 text-white/30">·</span>
        <span>{phase.title}</span>
      </div>
    </button>
  );
}
