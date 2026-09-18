import { motion, useReducedMotion } from "motion/react";
import { caseStudy } from "../data/site";
import { Counter } from "./ui/Counter";
import { Reveal, RevealLines } from "./ui/Reveal";

const EASE = [0.16, 1, 0.3, 1];

function SalesChart() {
  const reduce = useReducedMotion();
  const peak = Math.max(...caseStudy.sales.map((m) => m.units));

  return (
    <div className="mt-10">
      <div className="flex h-56 items-end gap-1.5 sm:gap-3 md:h-72">
        {caseStudy.sales.map((month, i) => (
          <div key={month.month} className="flex h-full flex-1 flex-col justify-end gap-2">
            <span className="text-center text-[10px] font-semibold text-paper/70 sm:text-xs">
              {month.units}
            </span>
            <motion.div
              className="w-full bg-paper"
              style={{ height: `${(month.units / peak) * 100}%`, transformOrigin: "bottom" }}
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: i * 0.06, ease: EASE }}
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-1.5 border-t border-paper/25 pt-3 sm:gap-3">
        {caseStudy.sales.map((month) => (
          <span
            key={month.month}
            className="flex-1 text-center text-[10px] text-paper/60 sm:text-xs"
          >
            {month.month}
          </span>
        ))}
      </div>
      <p className="u-mono mt-5 text-paper/60">
        Vehicles sold per month, November 2025 to August 2026
      </p>
    </div>
  );
}

export function CaseStudy() {
  return (
    <section id="case-study" className="relative bg-plum py-24 text-paper md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <p className="u-mono text-paper/60">
          {caseStudy.client} <span className="text-blush">/</span> {caseStudy.window}
        </p>

        <h2 className="u-display mt-5 text-[calc(var(--shell)*0.13)] leading-[0.86] md:text-[calc(var(--shell)*0.08)]">
          <RevealLines lines={["The $0", "Campaign"]} />
        </h2>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-[58ch] text-base leading-relaxed text-paper/85 md:text-xl">
            {caseStudy.summary}
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-paper/20 pt-12 lg:grid-cols-4">
          {caseStudy.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <p className="u-display text-[calc(var(--shell)*0.1)] leading-none md:text-[calc(var(--shell)*0.036)]">
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

        <div className="mt-20 grid gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-5">
            <h3 className="u-display text-[calc(var(--shell)*0.08)] leading-none md:text-[calc(var(--shell)*0.024)]">The challenge</h3>
            <ul className="mt-6 space-y-3">
              {caseStudy.challenges.map((item) => (
                <li key={item} className="border-l-2 border-blush pl-4 text-base text-paper/85">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-[38ch] text-base italic leading-relaxed text-paper/70">
              Everybody was fighting to be seen. Nobody had even heard of UFS.
            </p>
          </Reveal>

          <div className="md:col-span-6 md:col-start-7">
            <h3 className="u-display text-[calc(var(--shell)*0.08)] leading-none md:text-[calc(var(--shell)*0.024)]">The game plan</h3>
            <div className="mt-6 space-y-8">
              {caseStudy.plan.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.08}>
                  <h4 className="text-lg font-bold tracking-tight">{step.title}</h4>
                  <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-paper/75">
                    {step.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <h3 className="u-display text-[calc(var(--shell)*0.08)] leading-none md:text-[calc(var(--shell)*0.024)]">
              One showroom became four
            </h3>
            <SalesChart />
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <h3 className="u-display text-[calc(var(--shell)*0.08)] leading-none md:text-[calc(var(--shell)*0.024)]">Where the views landed</h3>
            <div className="mt-8 space-y-7">
              {caseStudy.platforms.map((platform, i) => (
                <Reveal key={platform.name} delay={i * 0.07}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-base font-semibold">{platform.name}</span>
                    <span className="u-display text-[calc(var(--shell)*0.07)] leading-none md:text-[calc(var(--shell)*0.02)]">
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
        </div>

        <div className="mt-20 border-t border-paper/20 pt-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h3 className="u-display text-[calc(var(--shell)*0.08)] leading-none md:text-[calc(var(--shell)*0.024)]">
              Nine reels past a million
            </h3>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {caseStudy.viewRanges.map((range) => (
                <p key={range.label} className="u-mono text-paper/60">
                  <span className="mr-2 text-base font-bold text-paper">{range.count}</span>
                  {range.label}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {caseStudy.reels.map((reel, i) => (
              <Reveal key={reel.src} delay={(i % 5) * 0.05}>
                <figure className="group" data-cursor="play">
                  <div className="overflow-hidden bg-plum-deep">
                    <img
                      src={reel.src}
                      alt={`UFS Lanka reel with ${reel.views} views`}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </div>
                  <figcaption className="u-mono mt-2 text-paper/60">{reel.views} views</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <p className="u-display-soft mt-20 max-w-[24ch] text-[calc(var(--shell)*0.09)] leading-[1.02] md:text-[calc(var(--shell)*0.034)]">
            Reach earned, not bought, with a measurable business outcome.
          </p>
          <p className="mt-6 max-w-[50ch] text-base leading-relaxed text-paper/70">
            Conversions are limited by sales support capacity, not by demand. The campaign
            generates more buyer interest than the team can process, which is the direct
            reason for the expansion now underway.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
