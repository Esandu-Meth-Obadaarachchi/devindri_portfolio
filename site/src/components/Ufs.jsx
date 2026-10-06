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

export function Ufs() {
  const head = useRef(null);
  const { scrollYProgress } = useScroll({ target: head, offset: ["start end", "start 0.25"] });
  const progress = useDetachedProgress(scrollYProgress);

  return (
    <section id="ufs" className="relative overflow-hidden bg-plum text-paper">
      <div ref={head} className="mx-auto max-w-[1400px] px-5 pt-24 md:px-10 md:pt-32">
        <Reveal className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <span className="rounded-full bg-paper px-3.5 py-1.5 text-xs font-bold tracking-tight text-plum">
            {caseStudy.title}
          </span>
          <span className="u-mono text-paper/60">{caseStudy.window}</span>
        </Reveal>

        <h2
          aria-label={`${caseStudy.client}, ${caseStudy.title}`}
          className="u-display mt-4 flex justify-between text-[33vw] leading-[0.78] [font-stretch:125%] [font-weight:900] md:mt-2 md:text-[calc(var(--shell)*0.36)]"
        >
          <Letter char="U" progress={progress} from={34} />
          <Letter char="F" progress={progress} from={64} />
          <Letter char="S" progress={progress} from={94} />
        </h2>

        <div className="mt-4 flex items-center justify-between border-t border-paper/25 pt-4 md:mt-6">
          <span className="u-mono text-paper/70">Lanka, {caseStudy.industry.toLowerCase()}</span>
          <span className="u-mono text-paper/70">via {caseStudy.agency}</span>
        </div>

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-5">
            <p className="text-lg leading-relaxed text-paper/85 md:text-2xl md:leading-snug">
              {caseStudy.summary}
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:col-span-6 md:col-start-7">
            {caseStudy.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <p className="u-display whitespace-nowrap text-[10.5vw] leading-none sm:text-6xl md:text-[calc(var(--shell)*0.05)]">
                  <Counter
                    value={stat.value}
                    decimals={stat.decimals}
                    prefix={stat.prefix ?? ""}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="mt-3 text-sm text-paper/60">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24 md:mt-32">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-6 px-5 md:px-10">
          <h3 className="u-display text-[10vw] leading-[0.9] md:text-[calc(var(--shell)*0.045)]">
            <RevealLines lines={["Watch the reels", "that did it."]} />
          </h3>
          <Reveal delay={0.1} className="flex flex-wrap gap-x-7 gap-y-2">
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

      <div className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10 md:pb-32">
        <div className="mt-24 grid gap-12 md:mt-32 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-5">
            <h3 className="u-display text-[8vw] leading-none md:text-[calc(var(--shell)*0.026)]">
              The challenge
            </h3>
            <ul className="mt-6 space-y-3">
              {caseStudy.challenges.map((item) => (
                <li key={item} className="border-l-2 border-blush pl-4 text-base text-paper/85">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-[38ch] text-base italic leading-relaxed text-paper/70">
              Everybody was fighting to be seen. Nobody had heard of UFS.
            </p>
          </Reveal>

          <div className="md:col-span-6 md:col-start-7">
            <h3 className="u-display text-[8vw] leading-none md:text-[calc(var(--shell)*0.026)]">
              The game plan
            </h3>
            <div className="mt-6 space-y-8">
              {caseStudy.plan.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.08}>
                  <h4 className="text-lg font-bold tracking-tight">{step.title}</h4>
                  <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-paper/75">
                    {step.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-16 md:grid-cols-12 md:gap-10">
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

        <Reveal>
          <p className="u-display-soft mt-24 max-w-[22ch] text-[9vw] leading-[1.02] md:text-[calc(var(--shell)*0.036)]">
            Reach earned, not bought, with a measurable business outcome.
          </p>
          <p className="mt-6 max-w-[50ch] text-base leading-relaxed text-paper/70">
            Conversions are limited by sales support capacity, not by demand. The campaign
            brings in more buyer interest than the team can process, which is the reason
            for the expansion now underway.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
