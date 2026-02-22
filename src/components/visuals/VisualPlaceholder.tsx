import { motion } from 'motion/react';
import type { VisualConfig } from '../../types/timeline';

interface VisualPlaceholderProps {
  config: VisualConfig;
}

export function VisualPlaceholder({ config }: VisualPlaceholderProps) {
  const hasImage = !!config.imageSrc;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg"
      style={{
        background: `linear-gradient(to bottom, ${config.gradientFrom}, ${config.gradientTo})`,
      }}
    >
      {/* Real image layer */}
      {hasImage && (
        <img
          src={config.imageSrc}
          alt={config.label}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Subtle grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Caption overlay — only when image is present */}
      {hasImage && (
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
