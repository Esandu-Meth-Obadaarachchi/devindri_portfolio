import { useRef } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { useReelViewer } from "../../lib/reelViewer";
import { PhoneFrame } from "./PhoneFrame";

/** A row of phones. Touch gets native momentum and snap. A mouse can drag the row,
 *  and a drag never counts as a tap on the phone underneath it. */
export function ReelRail({ reels, label }) {
  const rail = useRef(null);
  const drag = useRef(null);
  const { open } = useReelViewer();

  const onPointerDown = (event) => {
    if (event.pointerType !== "mouse" || !rail.current) return;
    drag.current = { x: event.clientX, left: rail.current.scrollLeft, moved: false };
  };

  const onPointerMove = (event) => {
    const d = drag.current;
    if (!d || !rail.current) return;
    const dx = event.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      rail.current.style.scrollSnapType = "none";
      rail.current.setPointerCapture(event.pointerId);
    }
    if (d.moved) rail.current.scrollLeft = d.left - dx;
  };

  const endDrag = () => {
    if (!rail.current) return;
    rail.current.style.scrollSnapType = "";
    // Leave the flag up until the click that follows this pointerup has been eaten.
    window.setTimeout(() => {
      drag.current = null;
    }, 0);
  };

  const swallowClick = (event) => {
    if (drag.current?.moved) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const step = (dir) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={rail}
        role="list"
        aria-label={label}
        data-cursor="drag"
        className="u-no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-6 pt-2 [scroll-padding-inline:1.25rem] md:gap-6 md:px-[max(2.5rem,calc((100vw-1400px)/2+2.5rem))] md:[scroll-padding-inline:max(2.5rem,calc((100vw-1400px)/2+2.5rem))]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={swallowClick}
      >
        {reels.map((reel, i) => (
          <div key={reel.id} role="listitem" className="snap-start">
            <PhoneFrame
              reel={reel}
              label={reel.title}
              onOpen={() => open(reels, i)}
              className="w-[44vw] max-w-[15.5rem] sm:w-[30vw] md:w-[14rem] lg:w-[15.5rem]"
            />
          </div>
        ))}
      </div>

      <div className="mx-auto hidden max-w-[1400px] justify-end gap-2 px-10 md:flex">
        <button
          type="button"
          onClick={() => step(-1)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/30 transition-colors duration-200 hover:bg-paper hover:text-plum"
          aria-label="Scroll reels back"
        >
          <ArrowLeftIcon size={18} weight="bold" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/30 transition-colors duration-200 hover:bg-paper hover:text-plum"
          aria-label="Scroll reels forward"
        >
          <ArrowRightIcon size={18} weight="bold" />
        </button>
      </div>
    </div>
  );
}
