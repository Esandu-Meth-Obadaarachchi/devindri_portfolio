import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { LAYER } from "../lib/layers";

const EASE = [0.16, 1, 0.3, 1];

/** Covers the font swap and sets the tempo before the hero plays. */
export function Preloader({ onDone }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (reduce) {
      setOpen(false);
      onDone?.();
      return undefined;
    }

    let frame = 0;
    const start = performance.now();
    const run = (now) => {
      const t = Math.min(1, (now - start) / 1100);
      setCount(Math.round(100 * (1 - Math.pow(1 - t, 3))));
      if (t < 1) {
        frame = requestAnimationFrame(run);
      } else {
        setOpen(false);
        onDone?.();
      }
    };
    frame = requestAnimationFrame(run);
    return () => cancelAnimationFrame(frame);
  }, [reduce, onDone]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 flex items-end justify-between bg-ink px-6 pb-8 md:px-10"
          style={{ zIndex: LAYER.preloader }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <span className="u-display text-[calc(var(--shell)*0.13)] leading-[0.8] text-paper md:text-[calc(var(--shell)*0.07)]">
            Devindri
          </span>
          <span className="u-mono text-paper/60">{count}</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
