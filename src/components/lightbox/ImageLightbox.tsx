import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useLightbox } from '../../context/LightboxContext';
import { useScrollLock } from '../../hooks/useScrollLock';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useZoomPan } from '../../hooks/useZoomPan';
import { PHASE_TRANSITION_EASE } from '../../utils/constants';
import { LightboxCaption } from './LightboxCaption';
import { LightboxControls } from './LightboxControls';
import { LightboxCounter } from './LightboxCounter';

export function ImageLightbox() {
  const { isOpen, currentIndex, images, close, next, prev } = useLightbox();
  const currentImage = images[currentIndex];

  useScrollLock(isOpen);
  const focusTrapRef = useFocusTrap(isOpen);
  const {
    containerRef: zoomContainerRef,
    smoothScale,
    smoothX,
    smoothY,
    scale,
    reset: resetZoom,
    handleClick,
    getDragConstraints,
  } = useZoomPan(isOpen);

  // Reset zoom when image changes
  useEffect(() => {
    resetZoom();
  }, [currentIndex, resetZoom]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      switch (e.key) {
        case 'Escape':
          close();
          break;
        case 'ArrowRight':
          next();
          break;
        case 'ArrowLeft':
          prev();
          break;
      }
    },
    [isOpen, close, next, prev],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const lightboxContent = (
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div
          ref={focusTrapRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: PHASE_TRANSITION_EASE }}
          className="fixed inset-0 z-[60] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={`Image viewer: ${currentImage.config.label}`}
          tabIndex={-1}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black/95"
            onClick={() => {
              if (scale.get() <= 1.01) close();
            }}
          />

          {/* Grid layout: top bar / image / caption — keeps image truly centered */}
          <div className="relative z-10 grid h-full w-full grid-rows-[auto_1fr_auto]">
            {/* Top bar: counter + close */}
            <div className="flex items-center justify-between px-6 py-4">
              <LightboxCounter
                currentImage={currentImage}
                totalImages={images.length}
              />
              <button
                onClick={close}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-seagram-bronze"
                aria-label="Close lightbox"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <line x1="4" y1="4" x2="16" y2="16" />
                  <line x1="16" y1="4" x2="4" y2="16" />
                </svg>
              </button>
            </div>

            {/* Image container with zoom/pan */}
            <div
              ref={zoomContainerRef}
              className="relative flex min-h-0 w-full touch-none items-center justify-center px-4 sm:px-16"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: PHASE_TRANSITION_EASE }}
                  className="relative cursor-zoom-in"
                  style={{
                    scale: smoothScale,
                    x: smoothX,
                    y: smoothY,
                  }}
                  drag
                  dragConstraints={getDragConstraints()}
                  dragElastic={0.1}
                  dragMomentum={false}
                  onPointerDown={handleClick}
                >
                  <img
                    src={currentImage.config.imageSrc}
                    alt={currentImage.config.label}
                    className="max-h-[calc(100vh-120px)] max-w-[90vw] select-none rounded object-contain sm:max-w-[85vw]"
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom caption */}
            <LightboxCaption image={currentImage} />
          </div>

          {/* Navigation arrows (overlay, outside grid) */}
          <LightboxControls onPrev={prev} onNext={next} />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(lightboxContent, document.body);
}
