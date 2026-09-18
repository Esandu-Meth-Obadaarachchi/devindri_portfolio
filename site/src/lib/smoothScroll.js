import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance = null;

/** Smooth scroll for the whole document. Lenis drives window scroll, so
 *  Motion's useScroll keeps working without any bridging. */
export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisInstance = lenis;

    let frame = 0;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [enabled]);
}

export function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: 0, duration: 1.2 });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { duration: 1.2 });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
