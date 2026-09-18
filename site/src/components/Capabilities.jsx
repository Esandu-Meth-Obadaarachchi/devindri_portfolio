import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { capabilities } from "../data/site";
import { Reveal, RevealLines } from "./ui/Reveal";

export function Capabilities() {
  const wrap = useRef(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const px = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const py = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });
  // Sit the preview in the gutter beside the pointer so it never covers the row title.
  const previewX = useTransform(px, (value) => value + 190);

  const handleMove = (event) => {
    if (!wrap.current) return;
    const rect = wrap.current.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  return (
    <section id="services" className="relative bg-paper-2 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <h2 className="u-display max-w-[16ch] text-[calc(var(--shell)*0.12)] leading-[0.88] md:text-[calc(var(--shell)*0.052)]">
          <RevealLines lines={["The whole", "package."]} />
        </h2>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[54ch] text-base leading-relaxed text-ink-soft md:text-lg">
            Six things a brand usually hires four people for. Pick the ones you need, or
            hand over the account.
          </p>
        </Reveal>

        <div
          ref={wrap}
          className="relative mt-14 md:mt-20"
          onPointerMove={handleMove}
          onPointerLeave={() => setActive(null)}
        >
          {capabilities.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05}>
              <div
                className="group grid cursor-default grid-cols-1 items-start gap-4 border-t border-ink/12 py-7 transition-colors duration-300 last:border-b md:grid-cols-12 md:gap-8 md:py-9"
                onPointerEnter={() => setActive(i)}
              >
                <div className="md:col-span-5">
                  <h3 className="u-display text-[calc(var(--shell)*0.08)] leading-none text-ink transition-colors duration-300 group-hover:text-rose md:text-[calc(var(--shell)*0.026)]">
                    {item.title}
                  </h3>
                </div>
                <div className="md:col-span-6 md:col-start-7">
                  <p className="max-w-[56ch] text-sm leading-relaxed text-ink-soft md:text-base">
                    {item.body}
                  </p>
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="mt-5 h-48 w-full object-cover object-top md:hidden"
                  />
                </div>
              </div>
            </Reveal>
          ))}

          {!reduce ? (
            <AnimatePresence>
              {active !== null ? (
                <motion.div
                  key={capabilities[active].id}
                  className="pointer-events-none absolute left-0 top-0 hidden h-[300px] w-[220px] overflow-hidden md:block"
                  style={{ x: previewX, y: py, translateX: "-50%", translateY: "-50%" }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img
                    src={capabilities[active].image}
                    alt=""
                    className="h-full w-full object-cover object-top"
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          ) : null}
        </div>
      </div>
    </section>
  );
}
