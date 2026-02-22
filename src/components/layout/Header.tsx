import { motion } from 'motion/react';
import type { TimelineData } from '../../types/timeline';

interface HeaderProps {
  metadata: TimelineData['metadata'];
}

export function Header({ metadata }: HeaderProps) {
  return (
    <header className="bg-seagram-charcoal relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Background gradient accent */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(139, 105, 20, 0.4) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl">
        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-seagram-bronze-light mb-6 font-mono text-xs font-medium tracking-[0.3em] uppercase"
        >
          375 Park Avenue, New York
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mb-6 text-5xl leading-[1.1] font-bold text-white md:text-6xl lg:text-7xl"
        >
          {metadata.siteTitle}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-seagram-granite mb-8 text-xl italic md:text-2xl"
        >
          {metadata.siteSubtitle}
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="bg-seagram-bronze mx-auto mb-8 h-px w-24 origin-center"
        />

        {/* Intro text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mx-auto max-w-lg text-base leading-relaxed text-white/60"
        >
          {metadata.introText}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest text-white/40 uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="h-6 w-[1px] bg-white/30"
        />
      </motion.div>
    </header>
  );
}
