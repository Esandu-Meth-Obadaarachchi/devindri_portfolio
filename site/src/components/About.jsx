import { Reveal, RevealLines } from "./ui/Reveal";
import { Counter } from "./ui/Counter";

const traits = ["Strategic", "Creative", "Analytical", "Performance driven"];

// Views are the sum of every account on this page, so the floor is honest.
// UFS carries 37.1M of it, the rest comes from Tata, Ceylon Artisans and Infinity.
const proof = [
  {
    value: 37.5,
    decimals: 1,
    suffix: "M+",
    label: "views generated",
    note: "Across every account, earned not bought",
    lead: true,
  },
  { value: 6, decimals: 0, suffix: "", label: "brands grown", note: "Cars, jewellery, travel, food" },
  { value: 5, decimals: 0, suffix: "", label: "industries", note: "Each with its own rulebook" },
  { value: 2, decimals: 0, suffix: "", label: "agencies", note: "Zirateh and Growth Inc." },
];

export function About() {
  return (
    <section id="about" className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <h2 className="u-display text-[11vw] leading-[0.9] md:text-[calc(var(--shell)*0.07)]">
          <RevealLines lines={["Strategy first,", "camera second."]} />
        </h2>

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:items-center md:gap-12">
          <Reveal className="md:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden bg-blush u-arch md:mx-0 md:max-w-none">
              <img
                src="/media/devindri-portrait-1.webp"
                alt="Devindri De Silva"
                width={1066}
                height={850}
                style={{ objectPosition: "50% 18%" }}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal
              delay={0.1}
              className="max-w-[52ch] space-y-5 text-base leading-relaxed text-ink-soft md:text-lg"
            >
              <p>
                I am a social media strategist specialising in high impact digital
                strategies. My core strengths are content development, strategic planning
                and product launches that land.
              </p>
              <p>
                I have worked across automotive, fine jewellery, luxury travel, wildlife
                tourism and food. Every strategy starts in the data, gets shaped by
                creative, and is judged on what it moved.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-9 flex flex-wrap gap-2">
              {traits.map((trait) => (
                <span
                  key={trait}
                  className="rounded-full border border-ink/20 px-4 py-2 text-sm font-medium text-ink"
                >
                  {trait}
                </span>
              ))}
            </Reveal>
          </div>
        </div>

        {/* The headline figure gets its own column width, the rest line up beside it. */}
        <div className="mt-20 md:mt-28">
          <Reveal>
            <p className="u-mono text-ink-mute">The body of work so far</p>
          </Reveal>
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden bg-ink/12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
            {proof.map((item, i) => (
              <Reveal
                key={item.label}
                delay={i * 0.07}
                className="group flex flex-col justify-end bg-paper px-5 py-8 transition-colors duration-300 hover:bg-paper-2 md:px-7 md:py-10"
              >
                <dd
                  className={`u-display leading-none ${
                    item.lead
                      ? "text-rose text-[calc(var(--shell)*0.13)] md:text-[calc(var(--shell)*0.075)]"
                      : "text-ink text-[calc(var(--shell)*0.1)] md:text-[calc(var(--shell)*0.05)]"
                  }`}
                >
                  <Counter value={item.value} decimals={item.decimals} suffix={item.suffix} />
                </dd>
                <dt className="mt-4 text-sm font-semibold tracking-tight text-ink md:text-base">
                  {item.label}
                </dt>
                <p className="mt-1.5 max-w-[24ch] text-xs leading-snug text-ink-mute">
                  {item.note}
                </p>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
