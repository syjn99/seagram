import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from '../../utils/gsapSetup';
import { GALLERY_SCROLL_PER_IMAGE_VH } from '../../utils/constants';
import { VisualPanel } from './VisualPanel';
import { VisualPlaceholder } from './VisualPlaceholder';
import { GalleryProgress } from './GalleryProgress';
import { FadeInSection } from '../ui/FadeInSection';
import { useLightbox } from '../../context/LightboxContext';
import type { Phase } from '../../types/timeline';

interface PinnedGalleryProps {
  phase: Phase;
  phaseIndex: number;
  isDesktop: boolean;
  onPhaseEnter: (index: number) => void;
}

export function PinnedGallery({ phase, phaseIndex, isDesktop, onPhaseEnter }: PinnedGalleryProps) {
  const pinRef = useRef<HTMLDivElement>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const { openByPhase } = useLightbox();

  const images = phase.visualSequence ?? [phase.visual];
  const imageCount = images.length;

  useGSAP(
    () => {
      if (!isDesktop || !pinRef.current) return;

      ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: () => `+=${imageCount * window.innerHeight * GALLERY_SCROLL_PER_IMAGE_VH}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: () => onPhaseEnter(phaseIndex),
        onEnterBack: () => onPhaseEnter(phaseIndex),
        onUpdate: (self) => {
          const newIndex = Math.min(Math.floor(self.progress * imageCount), imageCount - 1);
          if (newIndex !== currentIndexRef.current) {
            currentIndexRef.current = newIndex;
            setImageIndex(newIndex);
          }
        },
      });
    },
    {
      scope: pinRef,
      dependencies: [isDesktop, imageCount, phaseIndex],
    },
  );

  // Mobile: track active phase via IntersectionObserver
  useEffect(() => {
    if (isDesktop || !pinRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onPhaseEnter(phaseIndex);
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(pinRef.current);
    return () => observer.disconnect();
  }, [isDesktop, phaseIndex, onPhaseEnter]);

  // Mobile: single image card with tap-to-cycle + text below
  if (!isDesktop) {
    const goToImage = (i: number) => {
      currentIndexRef.current = i;
      setImageIndex(i);
    };

    return (
      <div ref={pinRef} data-phase-index={phaseIndex} data-phase-gallery={phaseIndex}>
        {/* Image card with overlaid title */}
        <div className="relative h-[40vh] w-full overflow-hidden">
          <VisualPlaceholder
            config={images[imageIndex]}
            onImageClick={() => openByPhase(phaseIndex, imageIndex)}
            hideCaption
            priority={phaseIndex === 0 && imageIndex === 0}
          />

          {/* Tap zones: left/right to cycle images */}
          {imageCount > 1 && (
            <>
              <button
                className="absolute top-0 left-0 z-10 h-full w-1/3"
                onClick={() => goToImage((imageIndex - 1 + imageCount) % imageCount)}
                aria-label="Previous image"
              />
              <button
                className="absolute top-0 right-0 z-10 h-full w-1/3"
                onClick={() => goToImage((imageIndex + 1) % imageCount)}
                aria-label="Next image"
              />
            </>
          )}

          {/* Title overlay at bottom of image */}
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/80 via-black/40 to-transparent px-6 pt-16 pb-5">
            <span className="mb-1 inline-block font-mono text-xs font-medium tracking-widest text-white/60 uppercase">
              {phase.dateRange}
            </span>
            <h2 className="font-display text-2xl leading-tight font-bold text-white">
              {phase.title}
            </h2>
          </div>
        </div>

        {/* Image dots below image */}
        {imageCount > 1 && (
          <div className="flex items-center justify-center gap-3 py-3">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goToImage(i)}
                className="flex h-8 items-center justify-center px-1"
                aria-label={`View image ${i + 1} of ${imageCount}`}
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === imageIndex ? 'bg-seagram-bronze w-6' : 'bg-seagram-ink/20 w-1.5'
                  }`}
                />
              </button>
            ))}
          </div>
        )}

        {/* Text content */}
        <div className="px-6 pb-8">
          {phase.paragraphs.map((p, i) => (
            <p key={i} className="text-seagram-ink/80 mb-6 max-w-prose text-base leading-relaxed">
              {p}
            </p>
          ))}
          {phase.pullQuote && (
            <blockquote className="border-seagram-bronze my-10 border-l-4 pl-6">
              <p className="font-display text-seagram-ink text-2xl leading-tight font-bold italic">
                {phase.pullQuote.text}
              </p>
              <cite className="text-seagram-ink/50 mt-4 block text-sm font-normal tracking-wide not-italic">
                — {phase.pullQuote.attribution}
              </cite>
            </blockquote>
          )}
        </div>
      </div>
    );
  }

  // Desktop: two-column pinned section (image left, text right)
  return (
    <div
      ref={pinRef}
      data-phase-index={phaseIndex}
      data-phase-gallery={phaseIndex}
      className="grid h-screen grid-cols-[45%_55%]"
    >
      {/* Left: visual panel */}
      <div className="bg-seagram-charcoal relative">
        <VisualPanel phase={phase} visualSubIndex={imageIndex} onImageClick={(subIndex) => openByPhase(phaseIndex, subIndex)} priority={phaseIndex === 0} />
        <GalleryProgress current={imageIndex} total={imageCount} />
      </div>

      {/* Right: text content */}
      <div className="flex flex-col justify-center overflow-hidden px-8 py-[clamp(1rem,3vh,2rem)] lg:px-12">
        <FadeInSection>
          <span className="text-seagram-bronze mb-[clamp(0.5rem,1.5vh,1rem)] inline-block font-mono text-[clamp(0.75rem,1.4vh,0.875rem)] font-medium tracking-widest uppercase">
            {phase.dateRange}
          </span>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <h2 className="font-display text-seagram-ink mb-[clamp(1rem,3vh,2rem)] text-[clamp(1.75rem,4.5vh,3rem)] leading-tight font-bold">
            {phase.title}
          </h2>
        </FadeInSection>

        {phase.paragraphs.map((p, i) => (
          <FadeInSection key={i} delay={0.15 + i * 0.08}>
            <p className="text-seagram-ink/80 mb-[clamp(0.75rem,2vh,1.5rem)] max-w-prose text-[clamp(0.875rem,1.8vh,1.125rem)] leading-relaxed">
              {p}
            </p>
          </FadeInSection>
        ))}

        {phase.pullQuote && (
          <FadeInSection delay={0.3} className="my-[clamp(1rem,3vh,2.5rem)]">
            <blockquote className="border-seagram-bronze border-l-4 pl-6 lg:pl-8">
              <p className="font-display text-seagram-ink text-[clamp(1.25rem,3vh,2.25rem)] leading-tight font-bold italic">
                {phase.pullQuote.text}
              </p>
              <cite className="text-seagram-ink/50 mt-[clamp(0.5rem,1.5vh,1rem)] block text-[clamp(0.75rem,1.3vh,0.875rem)] font-normal tracking-wide not-italic">
                — {phase.pullQuote.attribution}
              </cite>
            </blockquote>
          </FadeInSection>
        )}
      </div>
    </div>
  );
}
