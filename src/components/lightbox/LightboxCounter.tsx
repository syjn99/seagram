import type { LightboxImage } from '../../utils/lightboxUtils';

interface LightboxCounterProps {
  currentImage: LightboxImage;
  totalImages: number;
}

export function LightboxCounter({
  currentImage,
  totalImages,
}: LightboxCounterProps) {
  return (
    <div className="flex items-center gap-3 text-sm text-white/60">
      <span className="text-seagram-bronze-light font-mono text-xs tracking-widest uppercase">
        {currentImage.phaseDateRange}
      </span>
      <span className="text-white/20">|</span>
      <span className="font-mono text-xs">
        {currentImage.globalIndex + 1} / {totalImages}
      </span>
    </div>
  );
}
