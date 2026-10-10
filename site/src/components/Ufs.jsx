import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import { caseStudy } from "../data/site";
import { useDetachedProgress } from "../lib/useDetachedProgress";
import { Counter } from "./ui/Counter";
import { Reveal, RevealLines } from "./ui/Reveal";
import { ReelRail } from "./ui/ReelRail";
import { TrophyIcon } from "@phosphor-icons/react";
import { useReelViewer } from "../lib/reelViewer";

const EASE = [0.23, 1, 0.32, 1];

/** Each letter rides its own rate, so the word assembles as the section arrives. */
function Letter({ char, progress, from }) {
  const reduce = useReducedMotion();
  const y = useTransform(progress, [0, 1], [from, 0]);
  const transform = useMotionTemplate`translate3d(0, ${y}%, 0)`;
  return (
    <motion.span
      aria-hidden="true"
      className="block"
      style={reduce ? undefined : { transform }}
    >
      {char}
    </motion.span>
  );
}

function SalesChart() {
  const reduce = useReducedMotion();
  const peak = Math.max(...caseStudy.sales.map((m) => m.units));

  return (
    <div className="mt-10">
      <div className="flex h-56 items-end gap-1.5 sm:gap-3 md:h-72">
        {caseStudy.sales.map((month, i) => (
          <div key={month.month} className="group flex h-full flex-1 flex-col justify-end gap-2">
            <span className="text-center text-[11px] font-semibold tabular-nums text-paper/60 transition-colors duration-200 group-hover:text-paper sm:text-xs">
              {month.units}
            </span>
            <motion.div
              className={`w-full origin-bottom transition-colors duration-200 ${
                month.units === peak ? "bg-blush" : "bg-paper/85 group-hover:bg-paper"
              }`}
              style={{ height: `${(month.units / peak) * 100}%` }}
              initial={reduce ? false : { transform: "scaleY(0)" }}
              whileInView={{ transform: "scaleY(1)" }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, delay: i * 0.05, ease: EASE }}
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-1.5 border-t border-paper/25 pt-3 sm:gap-3">
        {caseStudy.sales.map((month) => (
          <span key={month.month} className="flex-1 text-center text-[10px] text-paper/60 sm:text-xs">
            {month.month}
          </span>
        ))}
      </div>
      <p className="u-mono mt-5 text-paper/55">Vehicles sold per month</p>
    </div>
  );
}

function PlatformSplit() {
  const reduce = useReducedMotion();
  const total = caseStudy.platforms.reduce((sum, p) => sum + p.share, 0);
  const tones = ["bg-paper", "bg-blush", "bg-rose"];

  return (
    <div className="mt-8">
      <div className="flex h-3 w-full gap-1 overflow-hidden">
        {caseStudy.platforms.map((platform, i) => (
          <motion.span
            key={platform.name}
            className={`block h-full origin-left ${tones[i]}`}
            style={{ width: `${(platform.share / total) * 100}%` }}
            initial={reduce ? false : { transform: "scaleX(0)" }}
            whileInView={{ transform: "scaleX(1)" }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE }}
          />
        ))}
      </div>
      <div className="mt-8 space-y-6">
        {caseStudy.platforms.map((platform, i) => (
          <Reveal key={platform.name} delay={i * 0.07}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="flex items-center gap-3 text-base font-semibold">
                <span className={`h-2.5 w-2.5 ${tones[i]}`} aria-hidden="true" />
                {platform.name}
              </span>
              <span className="u-display text-[9vw] leading-none sm:text-4xl md:text-[calc(var(--shell)*0.022)]">
                {platform.views}
              </span>
            </div>
            <p className="u-mono mt-2 text-paper/55">
              {platform.interactions} interactions, {platform.follows} follows
            </p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/** The award, with the night it was won. Photos open in the same viewer as the reels. */
function Award() {
  const { open } = useReelViewer();
  const { award } = caseStudy;
  const items = award.photos.map((photo, i) => ({
    id: `award-${i}`,
    poster: photo.src,
    title: `${award.level}, ${award.show}`,
  }));
  // Offsets give the strip a staggered rhythm on wide screens only.
  const offsets = ["lg:mt-0", "lg:mt-16", "lg:-mt-6"];

  return (
    <div className="mt-20 grid gap-10 md:mt-28 lg:grid-cols-12 lg:items-center lg:gap-10">
      <Reveal className="lg:col-span-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#f1eeec] via-[#b9b3b0] to-[#e6e2df] text-plum shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
            <TrophyIcon size={22} weight="fill" />
          </span>
          <span className="u-mono text-paper/70">{award.show}</span>
        </div>
        <h3 className="u-display mt-6 text-[15vw] leading-[0.86] sm:text-7xl md:text-[calc(var(--shell)*0.062)]">
          {award.level}
          <span className="block text-blush">award</span>
          <span className="block text-blush">{award.year}</span>
        </h3>
        <p className="mt-6 max-w-[34ch] text-base leading-relaxed text-paper/75">{award.note}</p>
      </Reveal>

      <Reveal delay={0.1} className="-mx-5 md:mx-0 lg:col-span-8">
        <ul className="u-no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 [scroll-padding-inline:1.25rem] md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0">
          {award.photos.map((photo, i) => (
            <li key={photo.src} className={`w-[46vw] shrink-0 snap-start sm:w-[34vw] lg:w-auto ${offsets[i]}`}>
              <button
                type="button"
                onClick={() => open(items, i)}
                data-cursor="view"
                aria-label={`Open photo: ${photo.alt}`}
                className="group block w-full overflow-hidden bg-plum-deep transition-transform duration-200 ease-[var(--ease-out)] active:scale-[0.98]"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[9/14] w-full object-cover object-[50%_62%] transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]"
                />
              </button>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

export function Ufs() {
  const head = useRef(null);
  const { scrollYProgress } = useScroll({ target: head, offset: ["start end", "start 0.35"] });
  const progress = useDetachedProgress(scrollYProgress);

  return (
    <section id="ufs" className="relative overflow-hidden bg-plum text-paper">
      <div ref={head} className="mx-auto max-w-[1400px] px-5 pt-20 md:px-10 md:pt-28">
        <Reveal className="flex flex-wrap items-center gap-x-3 gap-y-3">
          <span className="rounded-full bg-paper px-3.5 py-1.5 text-xs font-bold tracking-tight text-plum">
            {caseStudy.title}
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-paper/30 px-3.5 py-1.5 text-xs font-semibold tracking-tight">
            <TrophyIcon size={14} weight="fill" className="text-[#d9d4d1]" />
            {caseStudy.award.level}, {caseStudy.award.show}
          </span>
          <span className="u-mono w-full text-paper/60 sm:w-auto sm:pl-2">{caseStudy.window}</span>
        </Reveal>

        <div className="mt-8 grid gap-8 md:mt-10 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-6">
            <h2
              aria-label={`${caseStudy.client}, ${caseStudy.title}`}
              className="u-display flex gap-[0.04em] text-[30vw] leading-[0.78] [font-stretch:125%] [font-weight:900] sm:text-[22vw] lg:text-[calc(var(--shell)*0.145)]"
            >
              <Letter char="U" progress={progress} from={30} />
              <Letter char="F" progress={progress} from={55} />
              <Letter char="S" progress={progress} from={80} />
            </h2>
            <p className="u-mono mt-4 text-paper/70">
              Lanka, {caseStudy.industry.toLowerCase()}, via{" "}
              <span className="font-bold text-blush">{caseStudy.agency}</span>
            </p>
          </div>

          {/* Centred against the wordmark, so the two halves read as one band. */}
          <Reveal className="lg:col-span-6 lg:col-start-7">
            <p className="max-w-[44ch] text-lg leading-snug text-paper/90 md:text-2xl">
              {caseStudy.summary}
            </p>
          </Reveal>
        </div>

        {/* The view count is the whole argument, so it gets the room to say so. */}
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden bg-paper/20 md:mt-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {caseStudy.stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.08}
              className={`flex flex-col justify-end bg-plum px-5 py-8 md:px-7 md:py-10 ${
                i === 0 || i === caseStudy.stats.length - 1 ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              <p
                className={`u-display whitespace-nowrap leading-none ${
                  i === 0
                    ? "text-blush text-[calc(var(--shell)*0.115)] md:text-[calc(var(--shell)*0.082)]"
                    : "text-paper text-[calc(var(--shell)*0.072)] md:text-[calc(var(--shell)*0.045)]"
                }`}
              >
                <Counter
                  value={stat.value}
                  decimals={stat.decimals}
                  prefix={stat.prefix ?? ""}
                  suffix={stat.suffix}
                />
              </p>
              <p className="mt-4 text-sm font-semibold tracking-tight text-paper md:text-base">
                {stat.label}
              </p>
              {stat.note ? (
                <p className="mt-1.5 max-w-[22ch] text-xs leading-snug text-paper/55">{stat.note}</p>
              ) : null}
            </Reveal>
          ))}
        </div>

        <Award />
      </div>

      <div className="mt-20 md:mt-28">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-6 px-5 md:px-10">
          <h3 className="u-display text-[10vw] leading-[0.9] md:text-[calc(var(--shell)*0.045)]">
            <RevealLines lines={["10+ reels", "past a million."]} />
          </h3>
          <Reveal delay={0.1} className="flex flex-wrap gap-x-6 gap-y-2">
            {caseStudy.viewRanges.map((range) => (
              <p key={range.label} className="u-mono text-paper/60">
                <span className="mr-2 text-base font-bold text-paper">{range.count}</span>
                {range.label}
              </p>
            ))}
          </Reveal>
        </div>
        <Reveal delay={0.1} className="mt-10">
          <ReelRail reels={caseStudy.reels} label="UFS Lanka reels" />
        </Reveal>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 pb-20 md:px-10 md:pb-28">
        <div className="mt-20 grid gap-16 md:mt-24 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <h3 className="u-display text-[8vw] leading-none md:text-[calc(var(--shell)*0.026)]">
              One showroom became four
            </h3>
            <SalesChart />
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <h3 className="u-display text-[8vw] leading-none md:text-[calc(var(--shell)*0.026)]">
              Where the views landed
            </h3>
            <PlatformSplit />
          </div>
        </div>
      </div>
    </section>
  );
}
