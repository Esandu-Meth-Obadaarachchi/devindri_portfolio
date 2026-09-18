import { motion, useReducedMotion } from "motion/react";

const items = [
  "Content strategy",
  "Ideation",
  "Scripting",
  "Shoot direction",
  "Social management",
  "Campaigns",
  "Reporting",
];

/** The one marquee on the page. It carries the range of the job without a list. */
export function Ticker() {
  const reduce = useReducedMotion();
  const row = [...items, ...items];

  return (
    <div className="relative overflow-hidden bg-ink py-5">
      <motion.div
        className="flex w-max items-center gap-10 whitespace-nowrap"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 34, ease: "linear", repeat: Infinity }}
      >
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10">
            <span className="u-display text-[calc(var(--shell)*0.06)] text-paper md:text-[calc(var(--shell)*0.026)]">{item}</span>
            <span className="u-display text-[calc(var(--shell)*0.06)] text-rose md:text-[calc(var(--shell)*0.026)]">/</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
