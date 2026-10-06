import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { EyeIcon, PlayIcon } from "@phosphor-icons/react";

/** A reel inside an iPhone bezel. With a video it plays muted while on screen and
 *  pauses the moment it leaves, so a rail of phones never decodes more than it shows.
 *  Without one it shows the poster. Either way a tap opens the full screen viewer. */
export function PhoneFrame({ reel, onOpen, className = "", label, eager = false }) {
  const wrap = useRef(null);
  const video = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(wrap, { amount: 0.55 });
  // A playing video replaces the screenshot, so baked badges only count for stills.
  const baked = reel.video ? [] : reel.baked ?? [];

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
      className={`group block shrink-0 text-left transition-transform duration-200 ease-[var(--ease-out)] active:scale-[0.97] ${className}`}
    >
      <div className="u-phone">
        <div className="u-phone-screen">
          <span className="u-island" aria-hidden="true" />
          {reel.video ? (
            <video
              ref={video}
              src={reel.video}
              poster={reel.poster}
              muted
              loop
              playsInline
              preload="none"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <img
              src={reel.poster}
              alt=""
              loading={eager ? "eager" : "lazy"}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]"
            />
          )}

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-1/3 bg-gradient-to-t from-black/70 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 z-[2] flex items-center justify-between px-[1.1em] pb-[1.2em] text-paper">
            {baked.includes("views") ? (
              <span />
            ) : (
              <span className="flex items-center gap-[0.4em] text-[1.25em] font-bold tracking-tight">
                <EyeIcon weight="bold" className="h-[1.1em] w-[1.1em]" />
                {reel.views}
              </span>
            )}
            {baked.includes("play") ? null : (
              <span className="flex h-[2.6em] w-[2.6em] items-center justify-center rounded-full bg-paper/20 transition-colors duration-200 group-hover:bg-rose">
                <PlayIcon weight="fill" className="h-[1.1em] w-[1.1em]" />
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
