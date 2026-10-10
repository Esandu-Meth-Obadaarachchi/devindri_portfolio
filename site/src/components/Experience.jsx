import { experience } from "../data/site";
import { Reveal, RevealLines } from "./ui/Reveal";

function Brands({ brands, className = "" }) {
  if (!brands?.length) return null;
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {brands.map((brand) => (
        <li
          key={brand}
          className="rounded-full border border-rose/35 px-3.5 py-1.5 text-xs font-semibold tracking-tight text-rose"
        >
          {brand}
        </li>
      ))}
    </ul>
  );
}

/** One role on the rail. The year sits on the line, the work sits beside it. */
function Entry({ item, delay }) {
  const lead = item.roles[0];

  return (
    <Reveal delay={delay} className="relative pl-8 lg:pl-0">
      {/* The marker sits on the rail itself, so the eye can follow the years down. */}
      <span
        className={`absolute left-0 top-[0.6rem] h-2.5 w-2.5 -translate-x-[calc(50%+0.5px)] rounded-full lg:hidden ${
          item.current ? "bg-rose" : "bg-ink/25"
        }`}
        aria-hidden="true"
      />

      <div className="grid gap-y-4 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-3 lg:pl-8">
          <span
            className={`absolute left-0 top-[0.6rem] hidden h-2.5 w-2.5 -translate-x-[calc(50%+0.5px)] rounded-full lg:block ${
              item.current ? "bg-rose" : "bg-ink/25"
            }`}
            aria-hidden="true"
          />
          <p className="u-mono text-ink-mute">
            {item.start}
            <span className="mx-1.5 text-ink/30">to</span>
            <span className={item.current ? "text-rose" : undefined}>{item.end}</span>
          </p>
          {item.location ? (
            <p className="mt-2 text-xs text-ink-mute">{item.location}</p>
          ) : null}
        </div>

        <div className="lg:col-span-6">
          <h3 className="u-display text-[calc(var(--shell)*0.062)] leading-[0.94] text-ink md:text-[calc(var(--shell)*0.045)] lg:text-[calc(var(--shell)*0.03)]">
            {lead.title}
          </h3>
          <p className="mt-2 text-base font-semibold tracking-tight text-rose md:text-lg">
            {item.company}
            <span className="ml-3 text-sm font-medium text-ink-mute">{lead.type}</span>
          </p>

          {item.roles.length > 1 ? (
            <ul className="mt-4 space-y-1.5">
              {item.roles.slice(1).map((role) => (
                <li key={role.title} className="text-sm text-ink-soft">
                  <span className="font-semibold text-ink">{role.title}</span>
                  <span className="text-ink-mute">
                    {" "}
                    {role.type}
                    {role.window ? `, ${role.window}` : ""}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-ink-soft">{item.note}</p>
          <Brands brands={item.brands} className="mt-6 lg:hidden" />
        </div>

        {item.brands?.length ? (
          <div className="hidden lg:col-span-3 lg:block">
            <p className="u-mono text-ink-mute">Accounts</p>
            <Brands brands={item.brands} className="mt-4" />
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative bg-paper-2 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <h2 className="u-display text-[calc(var(--shell)*0.085)] leading-[0.92] md:text-[calc(var(--shell)*0.056)]">
          <RevealLines lines={["Where the work", "has happened."]} />
        </h2>

        <div className="relative mt-16 border-l border-ink/15 md:mt-20">
          <div className="space-y-16 md:space-y-20">
            {experience.marketing.map((item, i) => (
              <Entry key={item.id} item={item} delay={i * 0.06} />
            ))}
          </div>
        </div>

        <Reveal className="mt-20 border-t border-ink/15 pt-12 md:mt-24">
          <h3 className="u-mono text-ink-mute">Alongside the marketing work</h3>
          <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
            {experience.teaching.map((item) => (
              <div key={item.id}>
                <p className="u-mono text-ink-mute">
                  {item.start}
                  <span className="mx-1.5 text-ink/30">to</span>
                  <span className={item.current ? "text-rose" : undefined}>{item.end}</span>
                </p>
                <h4 className="mt-3 text-xl font-bold tracking-tight text-ink">
                  {item.roles[0].title}
                </h4>
                <p className="mt-1 text-sm font-semibold text-rose">
                  {item.company}
                  <span className="ml-3 font-medium text-ink-mute">{item.roles[0].type}</span>
                </p>
                <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-ink-soft">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
