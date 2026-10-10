import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CheckIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { capabilities } from "../data/site";
import { Reveal, RevealLines } from "./ui/Reveal";
import { useScope } from "../lib/scope";
import { scrollToSection } from "../lib/smoothScroll";
import { LAYER } from "../lib/layers";

// Six items, uneven spans, so the grid has a rhythm instead of three equal boxes.
// Two up at tablet width, where a six column track leaves the titles no room.
const SPAN = [
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "md:col-span-2 lg:col-span-6",
];
const WIDE = 5;

function Card({ item, index, on, onToggle }) {
  const wide = index === WIDE;

  return (
    <Reveal delay={index * 0.05} className={SPAN[index]}>
      <button
        type="button"
        onClick={() => onToggle(item.id)}
        aria-pressed={on}
        className={`group relative flex h-full w-full flex-col gap-5 border p-5 text-left transition-colors duration-300 md:p-6 ${
          on
            ? "border-rose bg-rose/6"
            : "border-ink/15 bg-paper hover:border-ink/35"
        } ${wide ? "lg:flex-row lg:items-center lg:gap-8" : ""}`}
      >
        <span className="flex items-start justify-between gap-4">
          <span className="flex items-center gap-4">
            <span className="relative h-14 w-14 shrink-0 overflow-hidden bg-paper-2 md:h-16 md:w-16">
              <img
                src={item.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            </span>
            <span
              className={`u-display text-xl leading-[0.95] transition-colors duration-300 md:text-2xl ${
                on ? "text-rose" : "text-ink"
              }`}
            >
              {item.title}
            </span>
          </span>

          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
              on ? "border-rose bg-rose text-paper" : "border-ink/25 text-transparent group-hover:border-ink/50"
            } ${wide ? "lg:hidden" : ""}`}
            aria-hidden="true"
          >
            <CheckIcon size={14} weight="bold" />
          </span>
        </span>

        <span className={wide ? "lg:flex lg:flex-1 lg:items-center lg:gap-10" : ""}>
          <span className="block">
            <span className="block max-w-[52ch] text-sm leading-relaxed text-ink-soft">
              {item.body}
            </span>
            <span className="u-mono mt-4 block text-ink-mute">
              In a month <span className="text-rose">/</span> {item.month}
            </span>
          </span>

          {wide ? (
            <span
              className={`mt-5 hidden h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 lg:mt-0 lg:flex ${
                on ? "border-rose bg-rose text-paper" : "border-ink/25 text-transparent group-hover:border-ink/50"
              }`}
              aria-hidden="true"
            >
              <CheckIcon size={14} weight="bold" />
            </span>
          ) : null}
        </span>
      </button>
    </Reveal>
  );
}

export function Capabilities() {
  const reduce = useReducedMotion();
  const { selected, toggle, clear, send } = useScope();
  const chosen = capabilities.filter((item) => selected.includes(item.id));

  const handleSend = () => {
    send(chosen.map((item) => item.title));
    scrollToSection("contact");
  };

  return (
    <section id="services" className="relative bg-paper-2 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <h2 className="u-display text-[calc(var(--shell)*0.12)] leading-[0.88] md:col-span-7 md:text-[calc(var(--shell)*0.052)]">
            <RevealLines lines={["The whole", "package."]} />
          </h2>
          <Reveal delay={0.1} className="md:col-span-5 md:pb-2">
            <p className="max-w-[44ch] text-base leading-relaxed text-ink-soft md:text-lg">
              Six things a brand usually hires four people for. Tick what you are missing
              and send it over as a brief.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-3 md:mt-16 md:grid-cols-2 md:gap-4 lg:grid-cols-6">
          {capabilities.map((item, i) => (
            <Card
              key={item.id}
              item={item}
              index={i}
              on={selected.includes(item.id)}
              onToggle={toggle}
            />
          ))}
        </div>
      </div>

      {/* The bar only exists once there is something to send. */}
      <AnimatePresence>
        {chosen.length ? (
          <motion.div
            className="sticky bottom-0 left-0 right-0 mt-10 px-5 pb-5 md:px-10"
            style={{ zIndex: LAYER.sticky }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
          >
            <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 bg-ink px-5 py-4 text-paper md:px-7 md:py-5">
              <div className="min-w-0">
                <p className="u-mono text-paper/60" aria-live="polite">
                  {chosen.length} of {capabilities.length} selected
                </p>
                <p className="mt-1.5 truncate text-sm font-semibold tracking-tight md:text-base">
                  {chosen.map((item) => item.title).join(", ")}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={clear}
                  className="rounded-full px-4 py-2.5 text-sm font-medium text-paper/70 transition-colors duration-200 hover:text-paper"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={handleSend}
                  className="flex items-center gap-2 rounded-full bg-rose px-5 py-2.5 text-sm font-semibold text-paper transition-colors duration-200 hover:bg-rose-deep active:scale-[0.98]"
                >
                  Send this scope
                  <ArrowRightIcon size={16} weight="bold" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
