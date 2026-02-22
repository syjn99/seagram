import { useCallback, useRef, useEffect } from 'react';
import { useMotionValue, useSpring } from 'motion/react';

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const ZOOM_SENSITIVITY = 0.002;
const SPRING_CONFIG = { stiffness: 300, damping: 30, mass: 0.5 };

export function useZoomPan(isActive: boolean) {
  const scale = useMotionValue(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothScale = useSpring(scale, SPRING_CONFIG);
  const smoothX = useSpring(x, SPRING_CONFIG);
  const smoothY = useSpring(y, SPRING_CONFIG);

  const containerRef = useRef<HTMLDivElement>(null);

  const pinchRef = useRef({
    initialDistance: 0,
    initialScale: 1,
    active: false,
  });

  const clampScale = useCallback((s: number) => {
    return Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));
  }, []);

  const reset = useCallback(() => {
    scale.set(1);
    x.set(0);
    y.set(0);
  }, [scale, x, y]);

  // Double-tap / double-click to toggle zoom
  const lastTapRef = useRef(0);

  const handleDoubleTap = useCallback(() => {
    if (scale.get() > 1.1) {
      reset();
    } else {
      scale.set(2.5);
    }
  }, [scale, reset]);

  const handleClick = useCallback(
    (e: React.PointerEvent) => {
      const now = Date.now();
      if (now - lastTapRef.current < 300) {
        e.preventDefault();
        handleDoubleTap();
      }
      lastTapRef.current = now;
    },
    [handleDoubleTap],
  );

  // Desktop: wheel-to-zoom
  useEffect(() => {
    if (!isActive) return;
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = -e.deltaY * ZOOM_SENSITIVITY;
      const newScale = clampScale(scale.get() + delta);
      scale.set(newScale);

      if (newScale <= 1.01) {
        x.set(0);
        y.set(0);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [isActive, scale, x, y, clampScale]);

  // Mobile: pinch-to-zoom
  useEffect(() => {
    if (!isActive) return;
    const container = containerRef.current;
    if (!container) return;

    const getDistance = (touches: TouchList) => {
      if (touches.length < 2) return 0;
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.hypot(dx, dy);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        pinchRef.current = {
          initialDistance: getDistance(e.touches),
          initialScale: scale.get(),
          active: true,
        };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && pinchRef.current.active) {
        e.preventDefault();
        const dist = getDistance(e.touches);
        const ratio = dist / pinchRef.current.initialDistance;
        const newScale = clampScale(pinchRef.current.initialScale * ratio);
        scale.set(newScale);
      }
    };

    const handleTouchEnd = () => {
      pinchRef.current.active = false;
      if (scale.get() <= 1.01) {
        reset();
      }
    };

    container.addEventListener('touchstart', handleTouchStart, {
      passive: false,
    });
    container.addEventListener('touchmove', handleTouchMove, {
      passive: false,
    });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isActive, scale, clampScale, reset]);

  const getDragConstraints = useCallback(() => {
    if (!containerRef.current || scale.get() <= 1) {
      return { top: 0, right: 0, bottom: 0, left: 0 };
    }
    const rect = containerRef.current.getBoundingClientRect();
    const overflow = (scale.get() - 1) / 2;
    return {
      top: -rect.height * overflow,
      right: rect.width * overflow,
      bottom: rect.height * overflow,
      left: -rect.width * overflow,
    };
  }, [scale]);

  return {
    containerRef,
    smoothScale,
    smoothX,
    smoothY,
    x,
    y,
    scale,
    reset,
    handleClick,
    getDragConstraints,
  };
}
