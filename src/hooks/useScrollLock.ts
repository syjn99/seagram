import { useEffect } from 'react';
import { ScrollTrigger } from '../utils/gsapSetup';

export function useScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) return;

    const scrollY = window.scrollY;

    ScrollTrigger.getAll().forEach((st) => st.disable(false));

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';

      window.scrollTo(0, scrollY);

      ScrollTrigger.getAll().forEach((st) => st.enable(false));
      ScrollTrigger.refresh();
    };
  }, [isLocked]);
}
