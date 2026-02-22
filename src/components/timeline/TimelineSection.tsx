import { forwardRef } from 'react';
import { FadeInSection } from '../ui/FadeInSection';
import { VisualPlaceholder } from '../visuals/VisualPlaceholder';
import type { Phase } from '../../types/timeline';

interface TimelineSectionProps {
  phase: Phase;
  showInlineVisual?: boolean;
}

export const TimelineSection = forwardRef<HTMLElement, TimelineSectionProps>(
  function TimelineSection({ phase, showInlineVisual = false }, ref) {
    return (
      <section
        ref={ref}
        data-phase-index={phase.index}
        className="flex min-h-screen flex-col justify-center px-6 py-24 lg:px-12"
      >
        {/* Inline visual for mobile layout */}
        {showInlineVisual && (
          <FadeInSection className="mb-10 aspect-[4/3] w-full">
            <VisualPlaceholder config={phase.visual} />
          </FadeInSection>
        )}

        {/* Date range badge */}
        <FadeInSection>
          <span className="text-seagram-bronze mb-4 inline-block font-mono text-sm font-medium tracking-widest uppercase">
            {phase.dateRange}
          </span>
        </FadeInSection>

        {/* Phase title */}
        <FadeInSection delay={0.1}>
          <h2 className="font-display text-seagram-ink mb-8 text-3xl leading-tight font-bold lg:text-4xl xl:text-5xl">
            {phase.title}
          </h2>
        </FadeInSection>

        {/* Paragraphs */}
        {phase.paragraphs.map((paragraph, i) => (
          <FadeInSection key={i} delay={0.15 + i * 0.08}>
            <p className="text-seagram-ink/80 mb-6 max-w-prose text-base leading-relaxed lg:text-lg lg:leading-relaxed">
              {paragraph}
            </p>
          </FadeInSection>
        ))}

        {/* Pull quote */}
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
      </section>
    );
  },
);
