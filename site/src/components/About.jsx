import { Reveal, RevealLines } from "./ui/Reveal";
import { Counter } from "./ui/Counter";

const traits = ["Strategic", "Creative", "Analytical", "Performance driven"];

// UFS figures live in their own section, so this row covers the whole body of work.
const proof = [
  { value: 6, decimals: 0, suffix: "", label: "brands grown across two agencies" },
  { value: 5, decimals: 0, suffix: "", label: "industries, from cars to fine jewellery" },
  { value: 2, decimals: 0, suffix: "", label: "agencies, Zirateh and Growth Inc." },
];

export function About() {
  return (
    <section id="about" className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <h2 className="u-display text-[11vw] leading-[0.9] md:text-[calc(var(--shell)*0.07)]">
          <RevealLines lines={["Strategy first,", "camera second."]} />
        </h2>

        <div className="mt-14 grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            <Reveal delay={0.1} className="max-w-[52ch] space-y-5 text-base leading-relaxed text-ink-soft md:text-lg">
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

          <Reveal delay={0.15} className="md:col-span-5 md:col-start-8">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[440px] overflow-hidden bg-blush u-arch">
              <img
                src="/media/devindri-portrait-1.webp"
                alt="Devindri De Silva"
                width={1066}
                height={850}
                style={{ objectPosition: "50% 22%" }}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-x-4 border-t border-ink/12 pt-12 md:gap-x-10">
          {proof.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <p className="u-display text-[17vw] leading-none text-rose sm:text-[calc(var(--shell)*0.1)] lg:text-[calc(var(--shell)*0.08)]">
                <Counter value={item.value} decimals={item.decimals} suffix={item.suffix} />
              </p>
              <p className="mt-3 max-w-[22ch] text-xs leading-snug text-ink-mute sm:text-sm">{item.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
