import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const REST = { wdth: 112, wght: 800 };
const PEAK = { wdth: 125, wght: 900 };
const LOW = { wdth: 92, wght: 640 };
const RADIUS = 260;

/** A word whose letters stretch toward the pointer on the Archivo width axis.
 *  Every letter writes its own CSS variables from one rAF per pointer move, so React
 *  never re-renders while the type breathes. Touch devices get the load-in only. */
export function KineticWord({ text, className = "", delay = 0, interactive = true }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || reduce || !interactive) return undefined;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return undefined;

    const letters = Array.from(root.querySelectorAll("[data-letter]"));
    let centres = [];
    let frame = 0;
    let pointer = null;

    const measure = () => {
      centres = letters.map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });
    };

    const paint = () => {
      frame = 0;
      if (!pointer) return;
      // A scroll between the move and this frame can clear the cache.
      if (!centres.length) measure();
      letters.forEach((el, i) => {
        const c = centres[i];
        const d = Math.hypot(pointer.x - c.x, (pointer.y - c.y) * 1.4);
        const t = Math.max(0, 1 - d / RADIUS);
        const k = t * t * (3 - 2 * t);
        // Letters near the pointer swell, the rest give a little room back.
        const wdth = k > 0 ? REST.wdth + (PEAK.wdth - REST.wdth) * k : REST.wdth - (REST.wdth - LOW.wdth) * 0.18;
        const wght = k > 0 ? REST.wght + (PEAK.wght - REST.wght) * k : REST.wght - (REST.wght - LOW.wght) * 0.18;
        el.style.setProperty("--wdth", `${wdth.toFixed(1)}%`);
        el.style.setProperty("--wght", wght.toFixed(0));
      });
    };

    const onMove = (event) => {
      pointer = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const reset = () => {
      pointer = null;
      letters.forEach((el) => {
        el.style.removeProperty("--wdth");
        el.style.removeProperty("--wght");
      });
    };

    // Letters stop animating in after ~1.6s. Measure once they are settled, and
    // whenever layout or scroll moves them.
    const settle = window.setTimeout(measure, 1700 + delay * 1000);
    const invalidate = () => {
      centres = [];
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", invalidate);
    window.addEventListener("scroll", invalidate, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);

    return () => {
      window.clearTimeout(settle);
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", invalidate);
      window.removeEventListener("scroll", invalidate);
      document.documentElement.removeEventListener("pointerleave", reset);
    };
  }, [reduce, interactive, delay]);

  return (
    <span ref={ref} className={`block whitespace-nowrap ${className}`} aria-label={text} role="text">
      {Array.from(text).map((char, i) => (
        <span
          key={`${char}-${i}`}
          data-letter
          aria-hidden="true"
          className={`u-kinetic transition-[font-stretch,font-weight] duration-500 ease-[var(--ease-out)] ${
            reduce ? "" : "u-stretch-in"
          }`}
          style={{ "--i": i, "--d": `${delay * 1000}ms` }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}
