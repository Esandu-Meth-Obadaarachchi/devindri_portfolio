import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { projects as allProjects } from "../data/projects";

// UFS has its own section above, so it stays out of the stack.
const projects = allProjects.filter((p) => !p.hasCaseStudy);
import { useMediaQuery } from "../lib/useMediaQuery";
import { useDetachedProgress } from "../lib/useDetachedProgress";
import { Counter } from "./ui/Counter";
import { Reveal, RevealLines } from "./ui/Reveal";
import { useReelViewer } from "../lib/reelViewer";
import { PhoneFrame } from "./ui/PhoneFrame";
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
  const { open } = useReelViewer();
  const reels = project.media
    .filter((m) => m.ratio === "9/14")
    .map((m, i) => ({
      id: `${project.id}-${i}`,
      poster: m.src,
      video: m.video ?? null,
      views: m.views,
      baked: m.baked,
      title: m.alt,
    }));

  return (
    <div className="relative min-h-[100dvh] lg:sticky lg:top-0" style={{ zIndex: LAYER.base + index }}>
      <motion.article
        className="relative flex min-h-[100dvh] items-center border-t border-ink/12 bg-paper shadow-[0_-24px_60px_rgba(23,17,15,0.07)] lg:h-[100dvh] lg:overflow-hidden"
        style={stacked}
      >
        {stack ? (
          <motion.div
            className="pointer-events-none absolute inset-0 bg-ink"
            style={{ opacity: dim }}
            aria-hidden="true"
          />
        ) : null}
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 px-5 py-24 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-20">
          <div className={`lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}`}>
            <p className="u-mono text-ink-mute">
              {project.industry} <span className="text-rose">/</span> via {project.agency}
            </p>
            <h3 className="u-display mt-3 text-[calc(var(--shell)*0.105)] leading-[0.9] text-ink lg:text-[calc(var(--shell)*0.042)]">
              {project.client}
            </h3>

            <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-4">
              <p className="u-display text-[calc(var(--shell)*0.12)] leading-none text-rose lg:text-[calc(var(--shell)*0.036)]">
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

          </div>

          <motion.div
            className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}
            style={stack ? { y: mediaY } : undefined}
          >
            {reels.length ? (
              <div className="flex items-end justify-center gap-4 lg:gap-6">
                {reels.map((reel, i) => (
                  <PhoneFrame
                    key={reel.id}
                    reel={reel}
                    label={`${project.client} reel`}
                    onOpen={() => open(reels, i)}
                    className={`w-[42vw] max-w-[13.5rem] lg:w-[min(13.5rem,22vh)] ${
                      i === 1 ? "translate-y-[-8%] rotate-[3deg]" : "-rotate-[2deg]"
                    }`}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {project.media.map((media, i) => (
                  <div
                    key={media.src}
                    className={`overflow-hidden bg-paper-2 ${i === 0 ? "col-span-2" : ""}`}
                  >
                    <img
                      src={media.src}
                      alt={media.alt}
                      loading="lazy"
                      decoding="async"
                      className={`w-full object-cover transition-transform duration-700 ease-[var(--ease-out)] hover:scale-[1.04] ${
                        i === 0 ? "aspect-[4/3] lg:aspect-auto lg:h-[38vh]" : "aspect-square lg:aspect-auto lg:h-[24vh]"
                      }`}
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </motion.article>
    </div>
  );
}

export function Work() {
  const ref = useRef(null);
  const stackable = useMediaQuery("(min-width: 1024px)");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useDetachedProgress(scrollYProgress);

  return (
    <section id="work" className="relative bg-paper">
      <div className="mx-auto max-w-[1400px] px-5 pt-24 lg:px-10 lg:pt-32">
        <h2 className="u-display text-[calc(var(--shell)*0.085)] leading-[0.92] lg:text-[calc(var(--shell)*0.056)]">
          <RevealLines lines={["More brands,", "more numbers."]} />
        </h2>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[52ch] pb-16 text-base leading-relaxed text-ink-soft lg:pb-24 lg:text-lg">
            Five more accounts across two agencies, from electric cars to fine jewellery, glamping and chocolate.
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
