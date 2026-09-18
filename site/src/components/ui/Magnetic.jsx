import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/** Pointer physics on the primary actions. Motion values only, so the React tree
 *  never re-renders while the pointer moves. */
export function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.6 });

  const handleMove = (event) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={reduce ? undefined : { x: sx, y: sy }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}
