import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import { ArrowDownRightIcon } from "@phosphor-icons/react";
import { scrollToSection } from "../lib/smoothScroll";
import { useDetachedProgress } from "../lib/useDetachedProgress";
import { Button } from "./ui/Button";
import { KineticWord } from "./ui/KineticWord";

const EASE = [0.23, 1, 0.32, 1];

/** Name, portrait, name. The first line sits behind the arch and the second in
 *  front of it, so the photo lives inside the type instead of next to it. On scroll
 *  the two lines pull apart and the portrait sinks back. */
export function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const progress = useDetachedProgress(scrollYProgress);

  const lineA = useTransform(progress, [0, 1], [0, -38]);
  const lineB = useTransform(progress, [0, 1], [0, 38]);
  const lift = useTransform(progress, [0, 1], [0, 18]);
  const sink = useTransform(progress, [0, 1], [1, 0.82]);
  const fade = useTransform(progress, [0, 0.45], [1, 0]);

  const lineAStyle = useMotionTemplate`translate3d(${lineA}%, 0, 0)`;
  const lineBStyle = useMotionTemplate`translate3d(${lineB}%, 0, 0)`;
  const portraitStyle = useMotionTemplate`translate3d(-50%, ${lift}%, 0) scale(${sink})`;

  return (
    <section id="top" ref={ref} className="relative h-[165svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-paper">
        <div className="mx-auto flex h-full max-w-[1400px] flex-col px-5 pb-6 pt-20 md:px-10 md:pb-10 md:pt-24">
          <motion.p
            className="u-mono flex justify-between text-ink-mute"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            style={reduce ? undefined : { opacity: fade }}
          >
            <span>Social media strategist</span>
            <span>Content creator</span>
          </motion.p>

          <h1 className="relative mt-3 flex min-h-0 flex-1 flex-col justify-between md:mt-4">
            <motion.span
              className="relative z-0 block"
              style={reduce ? undefined : { transform: lineAStyle }}
            >
              <KineticWord
                text="Devindri"
                delay={0.15}
                className="u-display text-left text-[16.4vw] leading-[0.8] text-ink md:text-[calc(var(--shell)*0.158)]"
              />
            </motion.span>

            <motion.div
              className="absolute left-1/2 top-[6%] z-10 h-[90%] max-w-[78vw] origin-bottom md:top-[9%] md:h-[89%]"
              style={reduce ? { transform: "translateX(-50%)" } : { transform: portraitStyle }}
            >
              <motion.div
                className="u-arch h-full overflow-hidden bg-blush"
                initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{ duration: 1.25, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
              >
                <motion.img
                  src="/media/devindri-studio-portrait.webp"
                  alt="Devindri De Silva at her desk"
                  width={1086}
                  height={1448}
                  className="aspect-[3/4] h-full w-auto max-w-none object-cover"
                  fetchPriority="high"
                  decoding="async"
                  initial={reduce ? false : { transform: "scale(1.25)" }}
                  animate={{ transform: "scale(1)" }}
                  transition={{ duration: 1.8, delay: 0.3, ease: EASE }}
                />
              </motion.div>
            </motion.div>

            <motion.span
              className="relative z-20 block"
              style={reduce ? undefined : { transform: lineBStyle }}
            >
              <KineticWord
                text="De Silva"
                delay={0.32}
                className="u-display text-right text-[16.4vw] leading-[0.8] text-rose md:text-[calc(var(--shell)*0.158)]"
              />
            </motion.span>
          </h1>

          <motion.div
            className="mt-5 grid items-end gap-5 md:mt-8 md:grid-cols-12 md:gap-8"
            initial={reduce ? false : { opacity: 0, transform: "translateY(16px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
          >
            <motion.p
              className="max-w-[44ch] text-[15px] leading-relaxed text-ink-soft md:col-span-5 md:text-lg"
              style={reduce ? undefined : { opacity: fade }}
            >
              I build content people choose to watch, then turn that attention into
              sales for the brand paying for it.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-3 md:col-span-7 md:justify-end"
              style={reduce ? undefined : { opacity: fade }}
            >
              <button
                type="button"
                onClick={() => scrollToSection("ufs")}
                className="group mr-auto hidden items-center gap-2 text-left text-sm text-ink-soft lg:mr-4 lg:flex"
              >
                <span className="u-display text-2xl text-ink">37.1M</span>
                <span className="leading-tight">
                  organic views,
                  <br />
                  zero ad spend
                </span>
                <ArrowDownRightIcon
                  size={18}
                  weight="bold"
                  className="text-rose transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </button>
              <Button as="button" type="button" onClick={() => scrollToSection("ufs")}>
                See the work
              </Button>
              <Button as="button" type="button" variant="outline" onClick={() => scrollToSection("contact")}>
                Work with me
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
