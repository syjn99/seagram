import type { TimelineData } from '../types/timeline';

export const timelineData: TimelineData = {
  metadata: {
    siteTitle: 'The Seagram Building',
    siteSubtitle: 'A Scrolling Architectural History',
    introText:
      'How a rejected design, a passionate letter, and a radical setback changed the New York City skyline forever.',
  },
  phases: [
    {
      id: 'context-rejection',
      index: 0,
      title: 'The Context & The Rejection',
      dateRange: '1916–1954',
      paragraphs: [
        "In 1916, New York City enacted its first comprehensive zoning resolution — a direct response to the looming shadow of the Equitable Building, which consumed every square inch of its lot. The new law mandated that towers step back as they rose, producing the distinctive 'wedding cake' massing that came to define the Manhattan skyline. For nearly four decades, every significant skyscraper in the city was sculpted by this formula: a dense, pyramidal silhouette clawing upward through setback after setback.",
        "When the Seagram Company set out to build its headquarters on Park Avenue in the early 1950s, the commission went to Pereira & Luckman, a prolific Los Angeles firm known for efficient corporate architecture. Their proposal was a 'Renaissance Modernized' tower — a conventional curtain-wall box dressed in period ornament, indistinguishable from the dozens of speculative office buildings already crowding Midtown.",
        'The design might have been built, were it not for a 27-year-old art student living in Paris. Phyllis Lambert, daughter of Seagram president Samuel Bronfman, learned of the plans and wrote an impassioned eight-page letter to her father. It began with four words that would alter the course of American architecture.',
      ],
      pullQuote: {
        text: 'NO NO NO NO NO',
        attribution: 'Phyllis Lambert, in a letter to her father Samuel Bronfman, 1954',
      },
      visual: {
        gradientFrom: '#8B7355',
        gradientTo: '#2C1810',
        label: '1916 Zoning Massing Diagrams',
        sublabel: "Dense 'wedding cake' setbacks define the skyline",
      },
      visualSequence: [
        {
          gradientFrom: '#8B7355',
          gradientTo: '#2C1810',
          label: '1916 Zoning Massing Diagrams',
          sublabel: "Dense 'wedding cake' setbacks define the skyline",
        },
        {
          gradientFrom: '#A0937D',
          gradientTo: '#4A3728',
          label: 'Rejected Pereira & Luckman Model',
          sublabel: "'Renaissance Modernized' — a conventional curtain wall",
        },
      ],
    },
    {
      id: 'archival-conception',
      index: 1,
      title: 'The Archival Conception',
      dateRange: '1954–1958',
      paragraphs: [
        'Lambert\'s letter did more than halt the existing design — it initiated an extraordinary search for the right architect. After consulting with Philip Johnson and touring the work of leading modernists, Lambert championed Ludwig Mies van der Rohe, the 68-year-old German émigré whose "less is more" philosophy had already redefined structural expression in glass and steel.',
        'Mies approached 375 Park Avenue not as a building problem but as an urbanistic one. His primary concern was the negative space — the plaza. In an era when developers routinely maximized their buildable footprint, consuming every allowable square foot, Mies made the radical decision to voluntarily set the tower back 100 feet from Park Avenue, surrendering roughly half the site to an open granite plaza flanked by shallow reflecting pools.',
        'Archival sketches preserved at MoMA — including the perspective study catalogued as Object Number MR5411.2 — reveal how Mies obsessively refined the proportions of this void. The tower was not designed first and placed on the site; the open space was designed first, and the tower was positioned to serve it. It was architecture by subtraction.',
      ],
      visual: {
        gradientFrom: '#D4C5A9',
        gradientTo: '#6B5B3E',
        label: 'MoMA Archival Sketches',
        sublabel: "Object Number MR5411.2 — Mies's plaza perspective studies",
      },
    },
    {
      id: 'monument-and-law',
      index: 2,
      title: 'The Monument & The Law',
      dateRange: '1958–1961',
      paragraphs: [
        "Completed in 1958 at a cost of $36 million — roughly $375 million today — the Seagram Building rose 38 stories above its 100-foot setback from Park Avenue. The structure was clad not in the aluminum or stainless steel favored by its contemporaries, but in hand-finished bronze and tinted amber glass. Non-structural bronze I-beams ran the full height of the facade, a deliberate expression of the steel skeleton hidden within — Mies's way of making visible what building codes forced him to conceal behind fireproofing.",
        'The tower-in-a-plaza typology was an immediate sensation. Where the 1916 zoning had produced wedding cakes, Mies had produced a freestanding monolith surrounded by civic space — and the city took notice. In 1961, New York adopted a sweeping new Zoning Resolution that replaced the old setback rules with a Floor Area Ratio (FAR) system. Crucially, the new code offered density bonuses to developers who provided Privately Owned Public Spaces — POPS — modeled directly on the Seagram plaza.',
        'The irony was immediate and lasting. The regulation Mies inspired was meant to encourage generous public space, but it instead unleashed a generation of developers who built token, wind-swept plazas to unlock extra floor area. The Seagram Building became both the gold standard and the cautionary tale — proof that great architecture does not automatically produce great policy.',
      ],
      visual: {
        gradientFrom: '#C8956E',
        gradientTo: '#1A0F05',
        label: "Ezra Stoller's 1958 Photography",
        sublabel: 'The glowing bronze tower rising from the granite plaza at dusk',
      },
    },
    {
      id: 'current-weathering',
      index: 3,
      title: 'Current State & Weathering',
      dateRange: 'Present Day',
      paragraphs: [
        "Mies envisioned the bronze cladding maintaining a 'rich golden brown' patina over time — a living surface that would age with dignity. To ensure this, he specified a rigorous annual maintenance program: each of the building's 1,500 bronze mullions and spandrels was to be hand-rubbed with lemon oil and treated with a ferric nitrate solution, a process designed to produce a warm, even oxidation.",
        "For the first decades, this regimen held. But as maintenance budgets fluctuated and New York's air pollution took its toll — decades of sulfur dioxide, nitrogen oxides, and particulate matter — the bronze gradually surrendered its intended warmth. Today, the facade reads as an uneven charcoal gray verging on black, a far cry from the luminous amber that Ezra Stoller captured in 1958.",
        "The weathering is a quiet record of the city itself, etched into the metal grain by grain. Conservation debates continue: should the bronze be restored to Mies's original vision, or does the patina — however unintended — represent an authentic material history? The Seagram Building, landmarked in 1989, remains one of the most important works of modern architecture in the world, its contradictions as instructive as its perfections.",
      ],
      visual: {
        gradientFrom: '#4A4A4A',
        gradientTo: '#1A1A1A',
        label: 'Contemporary Bronze Detail',
        sublabel: 'Weathered to charcoal gray — decades of pollution vs. intended patina',
      },
    },
  ],
};
