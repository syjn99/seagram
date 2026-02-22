interface GalleryProgressProps {
  current: number;
  total: number;
}

export function GalleryProgress({ current, total }: GalleryProgressProps) {
  return (
    <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-500 ${
            i === current ? 'bg-seagram-bronze w-8' : 'w-1.5 bg-white/30'
          }`}
        />
      ))}
    </div>
  );
}
