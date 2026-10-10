import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { projects as allProjects } from "../data/projects";
import { useMediaQuery } from "../lib/useMediaQuery";
import { useDetachedProgress } from "../lib/useDetachedProgress";
import { Counter } from "./ui/Counter";
import { Reveal, RevealLines } from "./ui/Reveal";
import { useReelViewer } from "../lib/reelViewer";
import { ReelPhone } from "./ui/ReelPhone";
import { ReelLink } from "./ui/ReelLink";
import { LAYER } from "../lib/layers";

// UFS has its own section above, so it stays out of the stack.
const projects = allProjects.filter((p) => !p.hasCaseStudy);

// Two reels sit side by side and stagger. Three or four share the column as a grid, and
// on a phone they become a row you swipe through, so none of them shrinks to a sliver.
const COLS = { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" };

function Media({ project, reels, onOpen, parallax }) {
  if (reels.length) {
    const crowd = reels.length > 2;

    return (
      <motion.div
        className={
          crowd
            ? `u-no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scroll-padding-inline:1.25rem] lg:mx-0 lg:grid lg:overflow-visible lg:px-0 lg:pb-0 ${COLS[reels.length] ?? "lg:grid-cols-4"}`
            : "flex items-end justify-center gap-4 lg:gap-6"
        }
        style={parallax}
      >
        {reels.map((reel, i) => (
          <div
            key={reel.id}
            className={
              crowd
                ? "w-[40vw] max-w-[11.5rem] shrink-0 snap-start lg:mx-auto lg:w-[min(100%,22vh)] lg:max-w-none"
                : `w-[38vw] max-w-[12.5rem] lg:w-[min(13rem,22vh)] ${i === 1 ? "lg:translate-y-[-7%]" : ""}`
            }
          >
            <ReelPhone
              reel={reel}
              label={`${project.client} reel`}
              onOpen={() => onOpen(i)}
              className="w-full"
            />
            <ReelLink href={reel.href} tone="light" />
          </div>
        ))}
      </motion.div>
    );
  }

  // Accounts shot as stills get a row instead, lead image widest. One row keeps the
  // panel inside a single viewport, which the sticky stack depends on.
  return (
    <motion.div
      className="grid grid-cols-2 gap-3 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-4"
      style={parallax}
    >
      {project.media.map((media, i) => (
        <div
          key={media.src}
          className={`overflow-hidden bg-paper-2 ${i === 0 ? "col-span-2 lg:col-span-1" : ""}`}
        >
          <img
            src={media.src}
            alt={media.alt}
            loading="lazy"
            decoding="async"
            className={`w-full object-cover transition-transform duration-700 ease-[var(--ease-out)] hover:scale-[1.04] lg:aspect-auto lg:h-[32vh] ${
              i === 0 ? "aspect-[16/10]" : "aspect-square"
            }`}
          />
        </div>
      ))}
    </motion.div>
  );
}

function Panel({ project, index, total, progress, stackable }) {
  const reduce = useReducedMotion();
  const last = index === total - 1;
  const start = index / (total - 1);
  const end = (index + 1) / (total - 1);

  const scale = useTransform(progress, [start, end], [1, 0.93], {
    clamp: true,
  });
  const dim = useTransform(progress, [start, end], [0, 0.42], { clamp: true });
  const mediaY = useTransform(progress, [start, end], [0, -60], {
    clamp: true,
  });

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
      title: m.title ?? m.alt,
      href: m.href,
      embed: m.embed,
    }));
  const scopeLed = project.headline.kind === "scope";

  return (
    <div
      className={`relative min-h-[100dvh] ${stackable ? "lg:sticky lg:top-0" : ""}`}
      style={{ zIndex: LAYER.base + index }}
    >
      <motion.article
        className={`relative flex min-h-[100dvh] flex-col justify-center border-t border-ink/12 bg-paper shadow-[0_-24px_60px_rgba(23,17,15,0.07)] ${
          stackable ? "lg:h-[100dvh] lg:overflow-hidden" : ""
        }`}
        style={stacked}
      >
        {stack ? (
          <motion.div
            className="pointer-events-none absolute inset-0 bg-ink"
            style={{ opacity: dim }}
            aria-hidden="true"
          />
        ) : null}

        <div
          className={`mx-auto w-full max-w-[1400px] px-5 py-24 lg:px-10 lg:pt-16 ${
            stackable ? "lg:pb-32" : "lg:pb-16"
          }`}
        >
          {/* The name gets the full width, so a long one never runs under the media. */}
          <header>
            <p className="u-mono text-ink-mute">
              {project.industry} <span className="text-rose">/</span> via{" "}
              {project.agency}
            </p>
            <h3 className="u-display mt-4 text-[calc(var(--shell)*0.088)] leading-[0.88] text-ink lg:text-[calc(var(--shell)*0.07)]">
              {project.client}
            </h3>
          </header>

          <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:mt-8 lg:grid-cols-12 lg:gap-10">
            <div
              className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}
            >
              {scopeLed ? (
                <p className="max-w-[22ch] text-xl font-semibold leading-tight tracking-tight text-ink lg:text-3xl lg:leading-[1.15]">
                  {project.headline.text}
                </p>
              ) : (
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                  <p className="u-display text-[calc(var(--shell)*0.13)] leading-none text-rose lg:text-[calc(var(--shell)*0.058)]">
                    <Counter
                      value={project.headline.value}
                      decimals={project.headline.value % 1 === 0 ? 0 : 1}
                      suffix={project.headline.suffix}
                    />
                  </p>
                  <p className="max-w-[16ch] text-base leading-snug text-ink-mute lg:text-lg">
                    {project.headline.label}
                  </p>
                </div>
              )}

              <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-ink-soft lg:text-lg">
                {project.approach}
              </p>

              {project.support?.length ? (
                <dl className="mt-8 grid max-w-[30rem] grid-cols-2 gap-x-6 border-t border-ink/12 pt-5">
                  {project.support.map((item) => (
                    <div key={item.label}>
                      <dd className="u-display text-xl leading-none text-ink lg:text-2xl">
                        {item.value}
                      </dd>
                      <dt className="mt-2 max-w-[18ch] text-xs leading-snug text-ink-mute lg:text-sm">
                        {item.label}
                      </dt>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>

            <div
              className={`lg:col-span-6 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}
            >
              <Media
                project={project}
                reels={reels}
                onOpen={(i) => open(reels, i)}
                parallax={stack ? { y: mediaY } : undefined}
              />
            </div>
          </div>
        </div>

        {/* A footer band carries the brief, so the panel reads full rather than floating. */}
        <div
          className={`border-t border-ink/12 ${
            stackable ? "lg:absolute lg:inset-x-0 lg:bottom-0" : ""
          }`}
        >
          <div className="mx-auto grid max-w-[1400px] gap-6 px-5 py-7 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-10 lg:py-8">
            <div className="lg:col-span-4">
              <p className="u-mono text-ink-mute">The brief</p>
              <p className="mt-2 max-w-[38ch] text-sm leading-relaxed text-ink-soft lg:text-base">
                {project.goal}
              </p>
            </div>
            <ul className="flex flex-wrap gap-2 lg:col-span-7 lg:col-start-6 lg:justify-end">
              {project.deliverables.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-ink/15 px-3.5 py-1.5 text-xs font-medium text-ink-soft lg:text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export function Work() {
  const ref = useRef(null);
  // The stack pins a panel to the viewport, so it only runs where a panel actually
  // fits one. Short windows get the same content flowing normally instead of clipped.
  const stackable = useMediaQuery("(min-width: 1024px) and (min-height: 820px)");
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
            Five more accounts across two agencies, from electric cars to fine
            jewellery, glamping and chocolate.
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
