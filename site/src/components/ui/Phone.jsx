/** An iPhone, drawn to the real proportions of a 15/16 Pro: 9:19.5 display, a
 *  titanium rail, a dynamic island 31.8% of the screen wide, and the buttons where
 *  they actually sit. Everything is sized in container query units, so one component
 *  scales from a thumbnail to full screen without a single hardcoded pixel.
 *
 *  `glare` is off for the full screen viewer, where a sheen over real content reads
 *  as a smudge rather than glass. */
export function Phone({ children, className = "", glare = true, screenClassName = "" }) {
  return (
    <div className={`@container relative ${className}`}>
      {/* Volume pair and action button on the left, side button on the right. */}
      <span
        aria-hidden="true"
        className="absolute left-[-0.9cqw] top-[14cqw] h-[7cqw] w-[1.2cqw] rounded-l-[0.6cqw] bg-gradient-to-r from-[#8c8c91] to-[#4a4a4e]"
      />
      <span
        aria-hidden="true"
        className="absolute left-[-0.9cqw] top-[25cqw] h-[11cqw] w-[1.2cqw] rounded-l-[0.6cqw] bg-gradient-to-r from-[#8c8c91] to-[#4a4a4e]"
      />
      <span
        aria-hidden="true"
        className="absolute left-[-0.9cqw] top-[39cqw] h-[11cqw] w-[1.2cqw] rounded-l-[0.6cqw] bg-gradient-to-r from-[#8c8c91] to-[#4a4a4e]"
      />
      <span
        aria-hidden="true"
        className="absolute right-[-0.9cqw] top-[31cqw] h-[18cqw] w-[1.2cqw] rounded-r-[0.6cqw] bg-gradient-to-l from-[#8c8c91] to-[#4a4a4e]"
      />

      {/* Titanium rail. The light edges catch along the sides, as they do on glass. */}
      <div className="relative rounded-[13.5cqw] bg-[linear-gradient(145deg,#8e8e93_0%,#48484c_18%,#2c2c2e_42%,#3a3a3e_62%,#7c7c82_88%,#404045_100%)] p-[1.1cqw] shadow-[0_6cqw_12cqw_-4cqw_rgba(10,8,8,0.55)]">
        {/* The black antenna lip between the rail and the glass. */}
        <div className="rounded-[12.6cqw] bg-[#08080a] p-[1.7cqw]">
          <div
            className={`relative aspect-[9/19.5] overflow-hidden rounded-[11cqw] bg-black ${screenClassName}`}
          >
            {children}

            <span
              aria-hidden="true"
              className="absolute left-1/2 top-[3cqw] z-20 h-[9.4cqw] w-[31.8cqw] -translate-x-1/2 rounded-full bg-black"
            >
              <span className="absolute right-[14%] top-1/2 h-[42%] w-[16%] -translate-y-1/2 rounded-full bg-[#15151a]" />
            </span>

            {glare ? (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(118deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.04)_22%,transparent_38%,transparent_100%)]"
              />
            ) : null}

            {/* The glass sits a hair proud of the rail, so the edge stays visible. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 rounded-[11cqw] shadow-[inset_0_0_0_0.35cqw_rgba(255,255,255,0.09)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
