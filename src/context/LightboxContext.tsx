import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Phase } from '../types/timeline';
import { buildLightboxImages, toGlobalIndex } from '../utils/lightboxUtils';
import type { LightboxImage } from '../utils/lightboxUtils';

interface LightboxState {
  isOpen: boolean;
  currentIndex: number;
  images: LightboxImage[];
  open: (globalIndex: number) => void;
  openByPhase: (phaseIndex: number, subIndex: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
}

const LightboxContext = createContext<LightboxState | null>(null);

export function LightboxProvider({
  phases,
  children,
}: {
  phases: Phase[];
  children: ReactNode;
}) {
  const images = useMemo(() => buildLightboxImages(phases), [phases]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const open = useCallback((globalIndex: number) => {
    setCurrentIndex(globalIndex);
    setIsOpen(true);
  }, []);

  const openByPhase = useCallback(
    (phaseIndex: number, subIndex: number) => {
      open(toGlobalIndex(images, phaseIndex, subIndex));
    },
    [images, open],
  );

  const close = useCallback(() => setIsOpen(false), []);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const value = useMemo(
    () => ({ isOpen, currentIndex, images, open, openByPhase, close, next, prev }),
    [isOpen, currentIndex, images, open, openByPhase, close, next, prev],
  );

  return (
    <LightboxContext.Provider value={value}>{children}</LightboxContext.Provider>
  );
}

export function useLightbox(): LightboxState {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error('useLightbox must be used within LightboxProvider');
  return ctx;
}
