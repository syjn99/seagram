export interface VisualConfig {
  gradientFrom: string;
  gradientTo: string;
  label: string;
  sublabel: string;
  imageSrc?: string;
}

export interface Phase {
  id: string;
  index: number;
  title: string;
  dateRange: string;
  paragraphs: string[];
  pullQuote?: {
    text: string;
    attribution: string;
  };
  visual: VisualConfig;
  visualSequence?: VisualConfig[];
}

export interface TimelineData {
  metadata: {
    siteTitle: string;
    siteSubtitle: string;
    introText: string;
  };
  phases: Phase[];
}
