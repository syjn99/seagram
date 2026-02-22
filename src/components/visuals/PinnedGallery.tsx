import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from '../../utils/gsapSetup';
import { GALLERY_SCROLL_PER_IMAGE_VH } from '../../utils/constants';
import { VisualPanel } from './VisualPanel';
import { VisualPlaceholder } from './VisualPlaceholder';
import { GalleryProgress } from './GalleryProgress';
import { FadeInSection } from '../ui/FadeInSection';
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

  // Mobile: stacked images + text
  if (!isDesktop) {
    return (
      <div data-phase-index={phaseIndex} data-phase-gallery={phaseIndex}>
        {images.map((visual, i) => (
          <FadeInSection key={i} className="aspect-[4/3] w-full">
            <VisualPlaceholder config={visual} />
          </FadeInSection>
        ))}
        <div className="px-6 py-24">
          <span className="text-seagram-bronze mb-4 inline-block font-mono text-sm font-medium tracking-widest uppercase">
            {phase.dateRange}
          </span>
          <h2 className="font-display text-seagram-ink mb-8 text-3xl leading-tight font-bold">
            {phase.title}
          </h2>
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
        <VisualPanel phase={phase} visualSubIndex={imageIndex} />
        <GalleryProgress current={imageIndex} total={imageCount} />
      </div>

      {/* Right: text content */}
      <div className="flex flex-col justify-center overflow-hidden px-8 py-8 lg:px-12">
        <FadeInSection>
          <span className="text-seagram-bronze mb-4 inline-block font-mono text-sm font-medium tracking-widest uppercase">
            {phase.dateRange}
          </span>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <h2 className="font-display text-seagram-ink mb-8 text-3xl leading-tight font-bold lg:text-4xl xl:text-5xl">
            {phase.title}
          </h2>
        </FadeInSection>

        {phase.paragraphs.map((p, i) => (
          <FadeInSection key={i} delay={0.15 + i * 0.08}>
            <p className="text-seagram-ink/80 mb-6 max-w-prose text-base leading-relaxed lg:text-lg lg:leading-relaxed">
              {p}
            </p>
          </FadeInSection>
        ))}

        {phase.pullQuote && (
          <FadeInSection delay={0.3} className="my-10">
            <blockquote className="border-seagram-bronze border-l-4 pl-6 lg:pl-8">
              <p className="font-display text-seagram-ink text-2xl leading-tight font-bold italic lg:text-3xl xl:text-4xl">
                {phase.pullQuote.text}
              </p>
              <cite className="text-seagram-ink/50 mt-4 block text-sm font-normal tracking-wide not-italic">
                — {phase.pullQuote.attribution}
              </cite>
            </blockquote>
          </FadeInSection>
        )}
      </div>
    </div>
  );
}
