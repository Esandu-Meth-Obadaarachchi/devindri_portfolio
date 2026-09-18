import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowDownRightIcon } from "@phosphor-icons/react";
import { projects } from "../data/projects";
import { useMediaQuery } from "../lib/useMediaQuery";
import { useDetachedProgress } from "../lib/useDetachedProgress";
import { Counter } from "./ui/Counter";
import { Reveal, RevealLines } from "./ui/Reveal";
import { scrollToSection } from "../lib/smoothScroll";
import { LAYER } from "../lib/layers";

function Panel({ project, index, total, progress, stackable }) {
  const reduce = useReducedMotion();
  const last = index === total - 1;
  const start = index / (total - 1);
  const end = (index + 1) / (total - 1);

  const scale = useTransform(progress, [start, end], [1, 0.93], { clamp: true });
  const dim = useTransform(progress, [start, end], [0, 0.42], { clamp: true });
  const mediaY = useTransform(progress, [start, end], [0, -60], { clamp: true });

  // The receding panel keeps an opaque background. A scrim on top carries the depth,
  // so stacked panels never bleed through each other.
  const stack = stackable && !reduce && !last;
  const stacked = stack ? { scale } : undefined;
  const flip = index % 2 === 1;

  return (
    <div className="relative min-h-[100dvh] md:sticky md:top-0" style={{ zIndex: LAYER.base + index }}>
      <motion.article
        className="relative flex min-h-[100dvh] items-center border-t border-ink/12 bg-paper shadow-[0_-24px_60px_rgba(23,17,15,0.07)] md:h-[100dvh] md:overflow-hidden"
        style={stacked}
      >
        {stack ? (
          <motion.div
            className="pointer-events-none absolute inset-0 bg-ink"
            style={{ opacity: dim }}
            aria-hidden="true"
          />
        ) : null}
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 px-5 py-24 md:grid-cols-12 md:gap-10 md:px-10 md:py-20">
          <div className={`md:col-span-6 ${flip ? "md:order-2 md:col-start-7" : ""}`}>
            <p className="u-mono text-ink-mute">
              {project.industry} <span className="text-rose">/</span> via {project.agency}
            </p>
            <h3 className="u-display mt-3 text-[calc(var(--shell)*0.105)] leading-[0.9] text-ink md:text-[calc(var(--shell)*0.042)]">
              {project.client}
            </h3>

            <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-4">
              <p className="u-display text-[calc(var(--shell)*0.12)] leading-none text-rose md:text-[calc(var(--shell)*0.036)]">
                <Counter
                  value={project.headline.value}
                  decimals={project.headline.value % 1 === 0 ? 0 : 1}
                  suffix={project.headline.suffix}
                />
              </p>
              <p className="max-w-[18ch] pb-1 text-sm leading-snug text-ink-mute">
                {project.headline.label}
              </p>
            </div>

            <dl className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="u-mono text-ink-mute">Goal</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{project.goal}</dd>
              </div>
              <div>
                <dt className="u-mono text-ink-mute">Approach</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{project.approach}</dd>
              </div>
            </dl>

            <ul className="mt-7 flex flex-wrap gap-2">
              {project.deliverables.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-ink/15 px-3.5 py-1.5 text-xs font-medium text-ink-soft"
                >
                  {item}
                </li>
              ))}
            </ul>

            {project.hasCaseStudy ? (
              <button
                type="button"
                onClick={() => scrollToSection("case-study")}
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-rose underline decoration-rose/40 underline-offset-4 transition-colors hover:decoration-rose"
              >
                Read the full case study
                <ArrowDownRightIcon size={16} weight="bold" />
              </button>
            ) : null}
          </div>

          <motion.div
            className={`grid grid-cols-2 gap-3 md:col-span-5 ${
              flip ? "md:order-1 md:col-start-1" : "md:col-start-8"
            }`}
            style={stack ? { y: mediaY } : undefined}
          >
            {project.media.map((media, i) => (
              <div
                key={media.src}
                className={`overflow-hidden bg-paper-2 ${i === 2 ? "col-span-2" : ""}`}
                data-cursor={media.ratio === "9/14" ? "play" : "view"}
              >
                <img
                  src={media.src}
                  alt={media.alt}
                  loading="lazy"
                  decoding="async"
                  className={`w-full object-cover transition-transform duration-700 hover:scale-[1.04] ${
                    i === 2
                      ? "aspect-[16/9] md:aspect-auto md:h-[18vh]"
                      : "aspect-[9/14] md:aspect-auto md:h-[42vh]"
                  }`}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.article>
    </div>
  );
}

export function Work() {
  const ref = useRef(null);
  const stackable = useMediaQuery("(min-width: 768px)");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useDetachedProgress(scrollYProgress);

  return (
    <section id="work" className="relative bg-paper">
      <div className="mx-auto max-w-[1400px] px-5 pt-24 md:px-10 md:pt-32">
        <h2 className="u-display text-[calc(var(--shell)*0.085)] leading-[0.92] md:text-[calc(var(--shell)*0.056)]">
          <RevealLines lines={["Brands grown,", "numbers moved."]} />
        </h2>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[52ch] pb-16 text-base leading-relaxed text-ink-soft md:pb-24 md:text-lg">
            Six accounts across two agencies, from vehicle dealerships to fine jewellery.
          </p>
        </Reveal>
      </div>

      <div ref={ref} className="relative">
        {projects.map((project, i) => (
          <Panel
            key={project.id}
            project={project}
            index={i}
            total={projects.length}
            progress={progress}
            stackable={stackable}
          />
        ))}
      </div>
    </section>
  );
}
