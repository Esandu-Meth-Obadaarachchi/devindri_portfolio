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

// The ring is drawn once at its largest and scaled down, so nothing animates width
// or height. Nothing here is ever big enough to cover what is underneath it.
const RING = 56;
const SCALE = {
  idle: 26 / RING,
  action: 1,
  hidden: 0.0001,
};
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
  if (el?.closest("a, button, label, [role='button']")) return "action";
  return "idle";
}

/** Fine pointers only. A small dot with a ring that opens over anything clickable,
 *  and a labelled pill over the reels. Pointer moves only touch motion values. */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState("idle");
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const last = useRef("idle");

  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const dx = useSpring(x, { stiffness: 1400, damping: 70, mass: 0.2 });
  const dy = useSpring(y, { stiffness: 1400, damping: 70, mass: 0.2 });
  const rx = useSpring(x, { stiffness: 420, damping: 34, mass: 0.45 });
  const ry = useSpring(y, { stiffness: 420, damping: 34, mass: 0.45 });
  const dotTransform = useMotionTemplate`translate3d(calc(${dx}px - 50%), calc(${dy}px - 50%), 0)`;
  const ringTransform = useMotionTemplate`translate3d(calc(${rx}px - 50%), calc(${ry}px - 50%), 0)`;

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
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

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
  const open = state === "action";
  const ringScale = !visible || label ? SCALE.hidden : (open ? SCALE.action : SCALE.idle) * (pressed ? 0.86 : 1);
  const dotVisible = visible && !label && !open;

  return (
    <div
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: LAYER.cursor }}
      aria-hidden="true"
    >
      <motion.div className="absolute left-0 top-0" style={{ transform: ringTransform }}>
        <motion.div
          className={`rounded-full border transition-colors duration-200 ${
            open ? "border-rose bg-rose/10" : "border-ink/45"
          }`}
          style={{ width: RING, height: RING }}
          initial={false}
          animate={{ transform: `scale(${ringScale})` }}
          transition={{ type: "spring", duration: 0.35, bounce: 0.18 }}
        />
      </motion.div>

      <motion.div className="absolute left-0 top-0" style={{ transform: dotTransform }}>
        <motion.div
          className="h-2 w-2 rounded-full bg-rose"
          initial={false}
          animate={{ transform: `scale(${dotVisible ? 1 : 0.0001})` }}
          transition={{ type: "spring", duration: 0.3, bounce: 0.1 }}
        />
      </motion.div>

      <motion.div className="absolute left-0 top-0" style={{ transform: ringTransform }}>
        <AnimatePresence>
          {label && visible ? (
            <motion.div
              key={state}
              className="flex h-18 w-18 flex-col items-center justify-center gap-1 rounded-full bg-rose text-paper shadow-[0_12px_32px_-10px_rgba(78,18,38,0.6)]"
              initial={{ opacity: 0, transform: "scale(0.6)" }}
              animate={{ opacity: 1, transform: `scale(${pressed ? 0.92 : 1})` }}
              exit={{ opacity: 0, transform: "scale(0.6)" }}
              transition={{ type: "spring", duration: 0.32, bounce: 0.2 }}
            >
              <label.Icon size={16} weight={state === "play" ? "fill" : "bold"} />
              <span className="u-mono text-[9px]">{label.text}</span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
