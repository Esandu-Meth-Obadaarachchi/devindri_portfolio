import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { PlayIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import { LAYER } from "../lib/layers";

const RING = {
  idle: { size: 34, label: null, icon: null },
  action: { size: 62, label: null, icon: "arrow" },
  view: { size: 96, label: "View", icon: null },
  play: { size: 86, label: null, icon: "play" },
  read: { size: 12, label: null, icon: null },
};

/** Requested custom pointer. It only mounts for fine pointers with motion enabled,
 *  and it leaves the caret alone inside form fields (see index.css). */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState("idle");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const dotX = useSpring(x, { stiffness: 1500, damping: 70, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 1500, damping: 70, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.7 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.7 });

  useEffect(() => {
    if (reduce) return undefined;
    const fine = window.matchMedia("(pointer: fine)");
    const sync = () => setEnabled(fine.matches);
    sync();
    fine.addEventListener("change", sync);
    return () => fine.removeEventListener("change", sync);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) {
      document.body.removeAttribute("data-pointer");
      return undefined;
    }
    document.body.setAttribute("data-pointer", "custom");

    const onMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target instanceof Element ? event.target : null;
      const hit = target?.closest("[data-cursor]");
      if (hit) {
        setState(hit.getAttribute("data-cursor") || "idle");
        return;
      }
      if (target?.closest("a, button, input, textarea, label")) {
        setState("action");
        return;
      }
      setState("idle");
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.body.removeAttribute("data-pointer");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ring = RING[state] ?? RING.idle;

  return (
    <div className="pointer-events-none fixed inset-0" style={{ zIndex: LAYER.cursor }} aria-hidden="true">
      <motion.div
        className="absolute left-0 top-0 rounded-full bg-rose"
        style={{ x: dotX, y: dotY, width: 7, height: 7, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible && state !== "view" && state !== "play" ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-rose/70 backdrop-blur-[1px]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: ring.size,
          height: ring.size,
          opacity: visible ? 1 : 0,
          backgroundColor:
            ring.label || ring.icon === "play"
              ? "rgba(196, 42, 82, 0.92)"
              : "rgba(196, 42, 82, 0)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
      >
        {ring.label ? (
          <span className="u-mono text-[10px] text-paper">{ring.label}</span>
        ) : null}
        {ring.icon === "play" ? <PlayIcon size={22} weight="fill" color="#F5F2EF" /> : null}
        {ring.icon === "arrow" ? <ArrowUpRightIcon size={18} weight="bold" color="#C42A52" /> : null}
      </motion.div>
    </div>
  );
}
