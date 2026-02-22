import type { Phase, VisualConfig } from '../types/timeline';

export interface LightboxImage {
  config: VisualConfig;
  phaseIndex: number;
  subIndex: number;
  globalIndex: number;
  phaseTitle: string;
  phaseDateRange: string;
}

export function buildLightboxImages(phases: Phase[]): LightboxImage[] {
  const images: LightboxImage[] = [];
  let globalIndex = 0;

  for (const phase of phases) {
    const sequence = phase.visualSequence ?? [phase.visual];
    for (let subIndex = 0; subIndex < sequence.length; subIndex++) {
      const config = sequence[subIndex];
      if (config.imageSrc) {
        images.push({
          config,
          phaseIndex: phase.index,
          subIndex,
          globalIndex,
          phaseTitle: phase.title,
          phaseDateRange: phase.dateRange,
        });
        globalIndex++;
      }
    }
  }

  return images;
}

export function toGlobalIndex(
  images: LightboxImage[],
  phaseIndex: number,
  subIndex: number,
): number {
  const match = images.find(
    (img) => img.phaseIndex === phaseIndex && img.subIndex === subIndex,
  );
  return match?.globalIndex ?? 0;
}
