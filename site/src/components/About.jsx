import { Reveal, RevealLines } from "./ui/Reveal";
import { Counter } from "./ui/Counter";

const traits = ["Strategic", "Creative", "Analytical", "Performance driven"];

// Views are the sum of every account on this page, so the floor is honest.
// UFS carries 37.1M of it, the rest comes from Tata, Ceylon Artisans and Infinity.
const proof = [
  { value: 37.5, decimals: 1, suffix: "M+", label: "views generated", lead: true },
  { value: 6, decimals: 0, suffix: "", label: "brands grown" },
  { value: 5, decimals: 0, suffix: "", label: "industries" },
  { value: 2, decimals: 0, suffix: "", label: "agencies" },
];

export function About() {
  return (
    <section id="about" className="relative bg-paper py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <h2 className="u-display text-[8.5vw] leading-[0.95] md:text-[calc(var(--shell)*0.052)]">
          <RevealLines lines={["Strategy first,", "camera second."]} />
        </h2>

        {/* Portrait on the left, words and proof stacked beside it, so the whole
            section lands inside one screen instead of running past the fold. */}
        <div className="mt-10 grid gap-10 md:mt-12 md:grid-cols-12 md:items-stretch md:gap-12">
          <Reveal className="md:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[380px] overflow-hidden bg-blush u-arch md:mx-0 md:aspect-auto md:h-full md:min-h-[26rem] md:max-w-none">
              <img
                src="/media/devindri-portrait-1.webp"
                alt="Devindri De Silva"
                width={1066}
                height={850}
                style={{ objectPosition: "50% 16%" }}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="flex flex-col md:col-span-6 md:col-start-7">
            <Reveal
              delay={0.1}
              className="max-w-[52ch] space-y-4 text-base leading-relaxed text-ink-soft md:text-lg"
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

            <Reveal delay={0.18} className="mt-7 flex flex-wrap gap-2">
              {traits.map((trait) => (
                <span
                  key={trait}
                  className="rounded-full border border-ink/20 px-4 py-2 text-sm font-medium text-ink"
                >
                  {trait}
                </span>
              ))}
            </Reveal>

            <Reveal delay={0.26} className="mt-auto pt-8">
              <p className="u-mono text-ink-mute">The body of work so far</p>
              <dl className="mt-4 grid grid-cols-3 gap-px bg-ink/12">
                {proof.map((item) => (
                  <div
                    key={item.label}
                    className={`flex flex-col justify-end bg-paper px-4 py-4 md:px-5 ${
                      item.lead ? "col-span-3" : ""
                    }`}
                  >
                    <dd
                      className={`u-display leading-none ${
                        item.lead
                          ? "text-rose text-[calc(var(--shell)*0.095)] md:text-[calc(var(--shell)*0.044)]"
                          : "text-ink text-[calc(var(--shell)*0.055)] md:text-[calc(var(--shell)*0.026)]"
                      }`}
                    >
                      <Counter value={item.value} decimals={item.decimals} suffix={item.suffix} />
                    </dd>
                    <dt className="mt-1.5 text-xs font-semibold tracking-tight text-ink-mute">
                      {item.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
