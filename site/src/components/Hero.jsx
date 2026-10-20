import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { ArrowDownRightIcon } from "@phosphor-icons/react";
import { scrollToSection } from "../lib/smoothScroll";
import { useDetachedProgress } from "../lib/useDetachedProgress";
import { useMediaQuery } from "../lib/useMediaQuery";
import { Button } from "./ui/Button";
import { KineticWord } from "./ui/KineticWord";

const EASE = [0.23, 1, 0.32, 1];

/** Name, portrait, name. The first line sits behind the arch and the second in
 *  front of it, so the photo lives inside the type instead of next to it. On scroll
 *  the two lines pull apart and the portrait sinks back. */
export function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  // The pull apart is a desktop move. On a phone the lines would slide past the edge
  // of the screen, so the hero just scrolls away like any other section.
  const wide = useMediaQuery("(min-width: 768px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const progress = useDetachedProgress(scrollYProgress);

  // Motion binds a style at mount, so swapping style objects when the window crosses
  // the breakpoint leaves the old transform stuck on. Every transform is scaled by
  // this one value instead: 1 at desktop width, 0 on a phone, so the bound styles
  // always describe the current width.
  const desk = useMotionValue(wide ? 1 : 0);
  useEffect(() => desk.set(wide ? 1 : 0), [wide, desk]);

  const lineA = useTransform([progress, desk], ([p, d]) => p * -38 * d);
  const lineB = useTransform([progress, desk], ([p, d]) => p * 38 * d);
  const lift = useTransform([progress, desk], ([p, d]) => p * 18 * d);
  const sink = useTransform([progress, desk], ([p, d]) => 1 - 0.18 * p * d);
  const shift = useTransform(desk, (d) => -50 * d);
  const fade = useTransform([progress, desk], ([p, d]) => 1 - Math.min(1, p / 0.45) * d);

  const lineAStyle = useMotionTemplate`translate(${lineA}%, 0)`;
  const lineBStyle = useMotionTemplate`translate(${lineB}%, 0)`;
  const portraitStyle = useMotionTemplate`translate3d(${shift}%, ${lift}%, 0) scale(${sink})`;

  return (
    <section id="top" ref={ref} className="relative h-[100svh] md:h-[165svh]">
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
            <span className="hidden min-[380px]:inline">Content creator</span>
          </motion.p>

          <h1 className="relative mt-3 flex min-h-0 flex-1 flex-col justify-center md:mt-4 md:justify-between">
            <motion.span
              className="relative z-0 block"
              style={reduce ? undefined : { transform: lineAStyle }}
            >
              <KineticWord
                text="Devindri"
                delay={0.15}
                className="u-display text-left text-[15.6vw] leading-[0.8] text-ink md:text-[calc(var(--shell)*0.158)]"
              />
            </motion.span>

            {/* Phones stack the hero: name, arch, name, with the arch sized to what the
                screen has left so it always keeps its 3:4 shape. Desktop lays the arch
                across the full height of the type instead. */}
            <motion.div
              className={`relative z-10 mx-auto -mb-[7vw] -mt-[4vw] aspect-[3/4] w-[min(74vw,calc((100svh-340px)*0.75))] min-w-[52vw] origin-bottom md:absolute md:left-1/2 md:top-[9%] md:m-0 md:h-[89%] md:w-auto md:min-w-0 md:max-w-[78vw] ${reduce ? "md:-translate-x-1/2" : ""}`}
              style={reduce ? undefined : { transform: portraitStyle }}
            >
              <motion.div
                className="u-arch relative h-full overflow-hidden bg-blush"
                initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{ duration: 1.25, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
              >
                <motion.img
                  src="/media/devindri-awards-photo.webp"
                  alt="Devindri De Silva holding her two SLIM DIGIS awards"
                  width={1125}
                  height={1500}
                  className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
                  fetchPriority="high"
                  decoding="async"
                  initial={reduce ? false : { transform: "scale(1.25)" }}
                  animate={{ transform: "scale(1)" }}
                  transition={{ duration: 1.8, delay: 0.3, ease: EASE }}
                />
                {/* The photo's top is the near white sponsor panel, which dissolves into the
                    page. A fine inner outline keeps the arch's shape. Inset, so the reveal
                    clip never trims it. */}
                <span
                  aria-hidden="true"
                  className="u-arch pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1.5px_rgba(23,17,15,0.18)]"
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
                className="u-display text-right text-[15.6vw] leading-[0.8] text-rose md:text-[calc(var(--shell)*0.158)]"
              />
            </motion.span>
          </h1>

          <motion.div
            className="mt-5 grid grid-cols-1 items-end gap-5 md:mt-8 md:grid-cols-12 md:gap-8"
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
              <Button as="button" type="button" onClick={() => scrollToSection("work")}>
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
