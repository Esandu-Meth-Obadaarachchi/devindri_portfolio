import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { EyeIcon, PlayIcon } from "@phosphor-icons/react";
import { Phone } from "./Phone";

/** A reel inside the phone. Portrait posters fill the screen. The UFS crops came off
 *  a deck in landscape, so those sit centred over a blurred fill, which is how a
 *  landscape video actually appears in a reel rather than stretched to fit. */
export function ReelPhone({ reel, onOpen, className = "", label, eager = false }) {
  const wrap = useRef(null);
  const video = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(wrap, { amount: 0.4 });
  const [wide, setWide] = useState(false);
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
      className={`group block shrink-0 text-left transition-transform duration-200 ease-[var(--ease-out)] active:scale-[0.98] ${className}`}
    >
      <Phone>
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
          <>
            {wide ? (
              <img
                src={reel.poster}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-125 object-cover blur-xl"
              />
            ) : null}
            <img
              src={reel.poster}
              alt=""
              loading={eager ? "eager" : "lazy"}
              decoding="async"
              onLoad={(event) => {
                const el = event.currentTarget;
                if (el.naturalWidth > el.naturalHeight) setWide(true);
              }}
              className={`absolute inset-0 h-full w-full transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04] ${
                wide ? "object-contain" : "object-cover"
              }`}
            />
          </>
        )}

        <span
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-black/80 to-transparent"
          aria-hidden="true"
        />

        <span className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-[4cqw] px-[6cqw] pb-[7cqw] text-paper">
          {baked.includes("views") ? (
            <span />
          ) : (
            <span className="flex items-baseline gap-[2cqw]">
              <EyeIcon weight="bold" className="h-[6cqw] w-[6cqw] translate-y-[1cqw]" />
              <span className="u-display text-[11cqw] leading-none tracking-tight">
                {reel.views}
              </span>
            </span>
          )}
          {baked.includes("play") ? null : (
            <span className="flex h-[16cqw] w-[16cqw] shrink-0 items-center justify-center rounded-full bg-paper/25 backdrop-blur-[2px] transition-colors duration-200 group-hover:bg-rose">
              <PlayIcon weight="fill" className="h-[7cqw] w-[7cqw]" />
            </span>
          )}
        </span>
      </Phone>
    </button>
  );
}
