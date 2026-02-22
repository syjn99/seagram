import { motion } from 'motion/react';
import type { VisualConfig } from '../../types/timeline';

interface VisualPlaceholderProps {
  config: VisualConfig;
  onImageClick?: () => void;
  hideCaption?: boolean;
  /** When true, loads eagerly with high fetch priority (use for first visible image) */
  priority?: boolean;
}

/** Derive responsive WebP source paths from the original JPEG path */
function getResponsiveSources(imageSrc: string) {
  const base = imageSrc.replace(/\.(jpe?g|png)$/, '');
  return {
    srcSet: `${base}-640w.webp 640w, ${base}-1024w.webp 1024w, ${base}.webp 1920w`,
    sizes: '(min-width: 1024px) 45vw, 100vw',
  };
}

export function VisualPlaceholder({ config, onImageClick, hideCaption, priority }: VisualPlaceholderProps) {
  const hasImage = !!config.imageSrc;
  const isClickable = hasImage && !!onImageClick;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg ${isClickable ? 'cursor-zoom-in' : ''}`}
      style={{
        background: `linear-gradient(to bottom, ${config.gradientFrom}, ${config.gradientTo})`,
      }}
      onClick={isClickable ? onImageClick : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={isClickable ? `View full size: ${config.label}` : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onImageClick();
              }
            }
          : undefined
      }
    >
      {/* Real image layer */}
      {hasImage && (() => {
        const { srcSet, sizes } = getResponsiveSources(config.imageSrc!);
        return (
          <picture>
            <source type="image/webp" srcSet={srcSet} sizes={sizes} />
            <img
              src={config.imageSrc}
              alt={config.label}
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority ? 'high' : 'auto'}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>
        );
      })()}

      {/* Subtle grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Caption overlay — only when image is present and not suppressed */}
      {hasImage && !hideCaption && (
        <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/70 to-transparent px-5 pt-10 pb-5">
          <p className="font-display text-sm leading-snug font-semibold text-white/90">
            {config.label}
          </p>
          <p className="mt-0.5 text-xs text-white/50">{config.sublabel}</p>
        </div>
      )}

      {/* Gradient-only placeholder content — no image */}
      {!hasImage && (
        <div className="relative z-10 max-w-xs px-8 text-center">
          <div className="mb-3 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wider text-white/80 uppercase backdrop-blur-sm">
            Visual Placeholder
          </div>
          <h3 className="font-display mb-2 text-lg leading-snug font-semibold text-white">
            {config.label}
          </h3>
          <p className="text-sm leading-relaxed text-white/60">{config.sublabel}</p>
        </div>
      )}

      {/* Corner accents — only for gradient placeholders */}
      {!hasImage && (
        <>
          <div className="absolute top-4 left-4 h-8 w-8 border-t border-l border-white/20" />
          <div className="absolute right-4 bottom-4 h-8 w-8 border-r border-b border-white/20" />
        </>
      )}
    </motion.div>
  );
}
