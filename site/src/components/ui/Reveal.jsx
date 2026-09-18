import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1];

/** Scroll reveal for a block of content. Communicates sequence as a section enters. */
export function Reveal({ children, delay = 0, y = 26, className = "", as = "div" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  return (
    <Tag
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={inView || reduce ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Headline reveal. Each line rises out of its own mask so the words read in order. */
export function RevealLines({ lines, className = "", lineClassName = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useReducedMotion();

  return (
    <span ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClassName}`}
            initial={reduce ? false : { y: "110%" }}
            animate={inView || reduce ? { y: "0%" } : undefined}
            transition={{ duration: 0.9, delay: delay + i * 0.08, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
