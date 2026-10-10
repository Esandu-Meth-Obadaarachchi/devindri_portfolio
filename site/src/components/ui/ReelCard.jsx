import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { EyeIcon, PlayIcon } from "@phosphor-icons/react";

/** A reel, shown as itself. No device chrome: the screenshots came off a deck at
 *  mixed crops, and wrapping those in a phone bezel reads as a fake phone. With a
 *  video it plays muted while on screen and pauses the moment it leaves.
 *
 *  `fill` makes the card fixed height with its width set by the image, so a rail of
 *  mixed crops lines up without stretching anything. */
export function ReelCard({
  reel,
  onOpen,
  className = "",
  label,
  eager = false,
  fill = false,
  tone = "light",
}) {
  const wrap = useRef(null);
  const video = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(wrap, { amount: 0.55 });
  // A playing video replaces the screenshot, so baked badges only count for stills.
  const baked = reel.video ? [] : reel.baked ?? [];
  const edge = tone === "light" ? "ring-paper/15" : "ring-ink/10";

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (inView && !reduce) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [inView, reduce]);

  return (
    <button
      ref={wrap}
      type="button"
      onClick={onOpen}
      data-cursor="play"
      aria-label={`Play ${label ?? reel.title}, ${reel.views} views`}
      className={`group relative block shrink-0 overflow-hidden bg-ink text-left ring-1 ${edge} transition-transform duration-200 ease-[var(--ease-out)] active:scale-[0.98] ${className}`}
    >
      {reel.video ? (
        <video
          ref={video}
          src={reel.video}
          poster={reel.poster}
          muted
          loop
          playsInline
          preload="none"
          className={fill ? "h-full w-auto max-w-none object-cover" : "h-full w-full object-cover"}
        />
      ) : (
        <img
          src={reel.poster}
          alt=""
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className={`transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.05] ${
            fill ? "h-full w-auto max-w-none object-cover" : "h-full w-full object-cover"
          }`}
        />
      )}

      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/85 via-ink/35 to-transparent"
        aria-hidden="true"
      />

      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 text-paper md:p-4">
        {baked.includes("views") ? (
          <span />
        ) : (
          <span className="flex items-baseline gap-1.5">
            <EyeIcon weight="bold" className="h-4 w-4 translate-y-0.5" />
            <span className="u-display text-xl leading-none tracking-tight md:text-2xl">
              {reel.views}
            </span>
          </span>
        )}
        {baked.includes("play") ? null : (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper/20 backdrop-blur-[2px] transition-colors duration-200 group-hover:bg-rose">
            <PlayIcon weight="fill" className="h-4 w-4" />
          </span>
        )}
      </span>
    </button>
  );
}
