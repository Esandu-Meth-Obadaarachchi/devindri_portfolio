import { Reveal, RevealLines } from "./ui/Reveal";
import { Counter } from "./ui/Counter";

const traits = ["Strategic", "Creative", "Analytical", "Performance driven"];

const proof = [
  { value: 37.1, decimals: 1, suffix: "M+", label: "organic views for one client in nine months" },
  { value: 105.4, decimals: 1, suffix: "K+", label: "followers gained across platforms" },
  { value: 6, decimals: 0, suffix: "", label: "brands grown across two agencies" },
  { value: 5, decimals: 0, suffix: "", label: "industries, from cars to fine jewellery" },
];

export function About() {
  return (
    <section id="about" className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <h2 className="u-display text-[calc(var(--shell)*0.09)] leading-[0.9] md:text-[calc(var(--shell)*0.056)]">
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

        <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-10 border-t border-ink/12 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {proof.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <p className="u-display text-[calc(var(--shell)*0.13)] leading-none text-rose sm:text-[calc(var(--shell)*0.07)] lg:text-[calc(var(--shell)*0.034)]">
                <Counter value={item.value} decimals={item.decimals} suffix={item.suffix} />
              </p>
              <p className="mt-3 max-w-[22ch] text-sm leading-snug text-ink-mute">{item.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
