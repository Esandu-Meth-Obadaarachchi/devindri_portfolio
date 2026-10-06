import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import { PlayIcon, ArrowUpRightIcon, ArrowsHorizontalIcon } from "@phosphor-icons/react";
import { LAYER } from "../lib/layers";

// The blob is drawn once at full size and scaled, so the cursor never animates
// width or height. Blend difference inverts whatever it passes over.
const BLOB = 120;
const SCALE = { idle: 12 / BLOB, action: 64 / BLOB, text: 1, hidden: 0.0001 };
const LABEL = {
  play: { text: "Play", Icon: PlayIcon },
  drag: { text: "Drag", Icon: ArrowsHorizontalIcon },
  view: { text: "View", Icon: ArrowUpRightIcon },
};

function resolve(target) {
  const el = target instanceof Element ? target : null;
  const tagged = el?.closest("[data-cursor]");
  if (tagged) return tagged.getAttribute("data-cursor") || "idle";
  if (el?.closest("input, textarea, select")) return "hidden";
  if (el?.closest("a, button, label")) return "action";
  if (el?.closest("h1, h2")) return "text";
  return "idle";
}

/** Fine pointers only. One inverted blob that swells over headlines and links, and a
 *  labelled pill over the phones and the reel rail. Pointer moves only touch motion
 *  values; React re-renders when the state actually changes. */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState("idle");
  const [visible, setVisible] = useState(false);
  const last = useRef("idle");

  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const sx = useSpring(x, { stiffness: 700, damping: 48, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 700, damping: 48, mass: 0.35 });
  const lx = useSpring(x, { stiffness: 380, damping: 34, mass: 0.5 });
  const ly = useSpring(y, { stiffness: 380, damping: 34, mass: 0.5 });
  const blobTransform = useMotionTemplate`translate3d(calc(${sx}px - 50%), calc(${sy}px - 50%), 0)`;
  const labelTransform = useMotionTemplate`translate3d(calc(${lx}px - 50%), calc(${ly}px - 50%), 0)`;

  useEffect(() => {
    if (reduce) return undefined;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
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
      const next = resolve(event.target);
      if (next !== last.current) {
        last.current = next;
        setState(next);
      }
    };
    const onLeave = () => setVisible(false);
    const onDown = () => document.body.setAttribute("data-pressed", "");
    const onUp = () => document.body.removeAttribute("data-pressed");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.body.removeAttribute("data-pointer");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const label = LABEL[state];
  const scale = label ? SCALE.hidden : SCALE[state] ?? SCALE.idle;

  return (
    <div className="pointer-events-none fixed inset-0" style={{ zIndex: LAYER.cursor }} aria-hidden="true">
      <motion.div
        className="absolute left-0 top-0 mix-blend-difference"
        style={{ transform: blobTransform, width: BLOB, height: BLOB }}
      >
        <motion.div
          className="h-full w-full rounded-full bg-paper"
          initial={false}
          animate={{ transform: `scale(${visible ? scale : SCALE.hidden})` }}
          transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
        />
      </motion.div>

      <motion.div className="absolute left-0 top-0" style={{ transform: labelTransform }}>
        <AnimatePresence>
          {label && visible ? (
            <motion.div
              key={state}
              className="flex h-[88px] w-[88px] flex-col items-center justify-center gap-1 rounded-full bg-rose text-paper shadow-[0_12px_32px_-8px_rgba(78,18,38,0.55)]"
              initial={{ opacity: 0, transform: "scale(0.6)" }}
              animate={{ opacity: 1, transform: "scale(1)" }}
              exit={{ opacity: 0, transform: "scale(0.6)" }}
              transition={{ type: "spring", duration: 0.35, bounce: 0.2 }}
            >
              <label.Icon size={18} weight={state === "play" ? "fill" : "bold"} />
              <span className="u-mono text-[10px]">{label.text}</span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
