import { motion } from 'motion/react';
import { PHASE_TRANSITION_EASE } from '../../utils/constants';
import type { LightboxImage } from '../../utils/lightboxUtils';

interface LightboxCaptionProps {
  image: LightboxImage;
}

export function LightboxCaption({ image }: LightboxCaptionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15, ease: PHASE_TRANSITION_EASE }}
      className="px-6 py-4"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-display text-sm leading-snug font-semibold text-white/90 sm:text-base">
          {image.config.label}
        </p>
        <p className="mt-1 text-xs text-white/50 sm:text-sm">
          {image.config.sublabel}
        </p>
      </div>
    </motion.div>
  );
}
