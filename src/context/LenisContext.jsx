import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";

/**
 * gourmethouse.com scroll feel (indexed from their theme):
 * - GSAP ScrollSmoother: smooth 1.8, normalizeScroll, effects/parallax, smoothTouch: false
 * - Full-viewport sections + scroll-triggered GSAP reveals
 *
 * We use Lenis (free equivalent): low lerp = heavy inertia, smoothWheel on desktop,
 * native touch scroll on mobile (matches their smoothTouch: false).
 */
const LenisContext = createContext(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null);
  const lenisRef = useRef(null);
  const lockCountRef = useRef(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktopPointer = window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;
    // gourmethouse.com: smoothTouch false — native fast scroll on mobile, heavy inertia on desktop
    if (prefersReducedMotion || !isDesktopPointer) return;

    const instance = new Lenis({
      lerp: 0.075,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.85,
      autoRaf: true,
    });

    lenisRef.current = instance;
    setLenis(instance);

    return () => {
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  const lockScroll = useCallback(() => {
    lockCountRef.current += 1;
    lenisRef.current?.stop();
  }, []);

  const unlockScroll = useCallback(() => {
    lockCountRef.current = Math.max(0, lockCountRef.current - 1);
    if (lockCountRef.current === 0) {
      lenisRef.current?.start();
    }
  }, []);

  const value = useMemo(
    () => ({ lenis, lockScroll, unlockScroll }),
    [lenis, lockScroll, unlockScroll]
  );

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}

export function useScrollLock(active) {
  const ctx = useContext(LenisContext);

  useEffect(() => {
    if (!ctx || !active) return;
    ctx.lockScroll();
    return () => ctx.unlockScroll();
  }, [active, ctx]);
}
