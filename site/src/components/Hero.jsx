import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import { scrollToSection } from "../lib/smoothScroll";
import { useDetachedProgress } from "../lib/useDetachedProgress";
import { Button } from "./ui/Button";

const EASE = [0.16, 1, 0.3, 1];

export function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const progress = useDetachedProgress(scrollYProgress);

  // The hero closes from both sides as you scroll, handing the page to the work.
  const inset = useTransform(progress, [0, 1], ["0%", "50%"]);
  const clipPath = useMotionTemplate`inset(0% ${inset} 0% ${inset})`;
  const stageScale = useTransform(progress, [0, 1], [1, 1.12]);
  const textX = useTransform(progress, [0, 1], [0, -160]);
  const photoX = useTransform(progress, [0, 1], [0, 160]);
  const contentOpacity = useTransform(progress, [0, 0.3], [1, 0]);
  const photoOpacity = useTransform(progress, [0.55, 0.92], [1, 0]);
  const photoY = useTransform(progress, [0, 1], [0, 90]);

  const stageStyle = reduce ? undefined : { clipPath, scale: stageScale };

  return (
    <section id="top" ref={ref} className="relative h-[210vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-ink">
        <motion.div
          className="absolute inset-0 bg-paper"
          style={stageStyle}
        >
          <div className="mx-auto grid h-full max-w-[1400px] grid-rows-[1fr_auto] gap-0 px-5 pt-20 md:grid-cols-12 md:grid-rows-1 md:items-center md:gap-8 md:px-10 md:pt-16">
            <motion.div
              className="order-2 md:order-1 md:col-span-7 md:pb-0"
              style={reduce ? undefined : { x: textX, opacity: contentOpacity }}
            >
              <motion.p
                className="u-mono text-ink-mute"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
              >
                Social media strategist<span className="hidden sm:inline"> and content creator</span>
              </motion.p>

              <h1 className="mt-4 md:mt-6">
                {["Devindri", "De Silva"].map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-[0.05em]">
                    <motion.span
                      className={`u-display block text-[calc(var(--shell)*0.145)] leading-[0.84] md:text-[calc(var(--shell)*0.084)] ${
                        i === 1 ? "text-rose" : "text-ink"
                      }`}
                      initial={reduce ? false : { y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 1, delay: 0.25 + i * 0.09, ease: EASE }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                className="mt-5 max-w-[46ch] text-base leading-relaxed text-ink-soft md:mt-7 md:text-lg"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
              >
                I build content that earns attention on its own merit, then turns that
                attention into sales for the brand paying for it.
              </motion.p>

              <motion.div
                className="mt-7 flex flex-wrap items-center gap-3 md:mt-9"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.62, ease: EASE }}
              >
                <Button as="button" type="button" onClick={() => scrollToSection("work")}>
                  See the work
                </Button>
                <Button
                  as="button"
                  type="button"
                  variant="outline"
                  onClick={() => scrollToSection("contact")}
                >
                  Work with me
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="order-1 flex h-full items-end justify-center md:order-2 md:col-span-5 md:items-center"
              style={reduce ? undefined : { x: photoX, y: photoY, opacity: photoOpacity }}
            >
              <motion.div
                className="relative w-[68vw] max-w-[420px] overflow-hidden bg-blush u-arch md:w-full"
                initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{ duration: 1.2, delay: 0.35, ease: EASE }}
              >
                <img
                  src="/media/devindri-studio-portrait.webp"
                  alt="Devindri De Silva at her desk"
                  width={1086}
                  height={1448}
                  className="h-full w-full object-cover"
                  fetchPriority="high"
                  decoding="async"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
