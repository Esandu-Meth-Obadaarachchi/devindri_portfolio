import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import {
  XIcon,
  EyeIcon,
  SpeakerHighIcon,
  SpeakerSlashIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react";
import { ReelViewerContext } from "../lib/reelViewer";
import { lockScroll } from "../lib/smoothScroll";
import { useMediaQuery } from "../lib/useMediaQuery";
import { LAYER } from "../lib/layers";

const STILL_SECONDS = 6;
const HOLD_MS = 220;

export function ReelViewerProvider({ children }) {
  const [state, setState] = useState(null);
  const open = useCallback((items, index = 0) => setState({ items, index }), []);
  const close = useCallback(() => setState(null), []);
  const value = useMemo(() => ({ open }), [open]);

  return (
    <ReelViewerContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {state ? (
          <Viewer key="viewer" items={state.items} start={state.index} onClose={close} />
        ) : null}
      </AnimatePresence>
    </ReelViewerContext.Provider>
  );
}

function Bar({ state, progress }) {
  return (
    <span className="h-[3px] flex-1 overflow-hidden rounded-full bg-paper/30">
      {state === "active" ? (
        <motion.span
          className="block h-full origin-left rounded-full bg-paper"
          style={{ scaleX: progress }}
        />
      ) : (
        <span
          className={`block h-full rounded-full bg-paper ${state === "done" ? "" : "opacity-0"}`}
        />
      )}
    </span>
  );
}

/** Stories style viewer. Tap the right side for the next reel, the left for the
 *  previous one, hold anywhere to pause, swipe down or press Escape to close. */
function Viewer({ items, start, onClose }) {
  const reduce = useReducedMotion();
  const framed = useMediaQuery("(min-width: 640px)");
  const [index, setIndex] = useState(start);
  const [muted, setMuted] = useState(true);
  const [wideId, setWideId] = useState(null);
  const progress = useMotionValue(0);
  const timer = useRef(null);
  const video = useRef(null);
  const pressedAt = useRef(0);
  const closeBtn = useRef(null);

  const item = items[index];
  const itemKey = item.id ?? item.poster;
  const wide = wideId === itemKey;

  const next = useCallback(() => {
    setIndex((i) => {
      if (i >= items.length - 1) {
        onClose();
        return i;
      }
      return i + 1;
    });
  }, [items.length, onClose]);

  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);

  // Page stays put behind the viewer, and focus comes back to the phone that opened it.
  useEffect(() => {
    const opener = document.activeElement;
    lockScroll(true);
    closeBtn.current?.focus();
    return () => {
      lockScroll(false);
      if (opener instanceof HTMLElement) opener.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, onClose]);

  // Stills run on a timer. Videos report their own progress and advance on end.
  useEffect(() => {
    progress.set(0);
    if (item.video) return undefined;
    timer.current = animate(progress, 1, {
      duration: STILL_SECONDS,
      ease: "linear",
      onComplete: next,
    });
    return () => timer.current?.stop();
  }, [item, next, progress]);

  const pause = () => {
    pressedAt.current = performance.now();
    timer.current?.pause();
    video.current?.pause();
  };

  const resume = () => {
    timer.current?.play();
    video.current?.play().catch(() => {});
  };

  // A short press navigates, a long one was a hold to pause.
  const tap = (direction) => () => {
    if (performance.now() - pressedAt.current > HOLD_MS) return;
    if (direction === "next") next();
    else prev();
  };

  const pressHandlers = {
    onPointerDown: pause,
    onPointerUp: resume,
    onPointerCancel: resume,
    onPointerLeave: resume,
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Reel viewer"
      className="fixed inset-0 flex items-center justify-center bg-ink/95"
      style={{ zIndex: LAYER.viewer }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.div
        className={framed ? "u-phone" : "h-[100dvh] w-full"}
        style={framed ? { fontSize: "min(1.45vh, 13px)" } : undefined}
        initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(32px) scale(0.94)" }}
        animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(32px) scale(0.94)" }}
        transition={{ type: "spring", duration: 0.45, bounce: 0 }}
        drag={reduce ? false : "y"}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.7 }}
        dragSnapToOrigin
        onDragEnd={(_, info) => {
          if (info.offset.y > 110 || info.velocity.y > 600) onClose();
        }}
      >
        <div
          className={
            framed
              ? "u-phone-screen h-[min(86dvh,800px)]"
              : "relative h-full w-full overflow-hidden bg-[#0f0b0a]"
          }
        >
          {framed ? <span className="u-island" aria-hidden="true" /> : null}

          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={itemKey}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {item.video ? (
                <video
                  ref={video}
                  src={item.video}
                  poster={item.poster}
                  autoPlay
                  playsInline
                  muted={muted}
                  onTimeUpdate={(event) => {
                    const el = event.currentTarget;
                    if (el.duration) progress.set(el.currentTime / el.duration);
                  }}
                  onEnded={next}
                  className="h-full w-full object-cover"
                />
              ) : (
                <>
                  {wide ? (
                    <img
                      src={item.poster}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full scale-125 object-cover opacity-60 blur-2xl"
                    />
                  ) : null}
                  <img
                    src={item.poster}
                    alt={`${item.title}, ${item.views} views`}
                    onLoad={(event) => {
                      const el = event.currentTarget;
                      if (el.naturalWidth > el.naturalHeight) setWideId(itemKey);
                    }}
                    className={`relative h-full w-full ${wide ? "object-contain" : "object-cover"}`}
                  />
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-40 bg-gradient-to-b from-black/60 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-40 bg-gradient-to-t from-black/60 to-transparent" />

          <button
            type="button"
            className="absolute inset-y-0 left-0 z-[3] w-1/3"
            aria-label="Previous reel"
            onClick={tap("prev")}
            {...pressHandlers}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 z-[3] w-2/3"
            aria-label="Next reel"
            onClick={tap("next")}
            {...pressHandlers}
          />

          <div
            className={`absolute inset-x-0 z-[4] px-3 ${
              framed ? "top-[3.4em]" : "top-[max(12px,env(safe-area-inset-top))]"
            }`}
          >
            <div className="flex gap-1">
              {items.map((reel, i) => (
                <Bar
                  key={reel.id ?? reel.poster}
                  state={i < index ? "done" : i === index ? "active" : "todo"}
                  progress={progress}
                />
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between text-paper">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose text-[11px] font-bold">
                  DDS
                </span>
                <span className="text-sm font-semibold leading-tight">
                  {item.title}
                  <span className="flex items-center gap-1 text-xs font-medium text-paper/75">
                    <EyeIcon size={12} weight="bold" /> {item.views} views
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-1">
                {item.video ? (
                  <button
                    type="button"
                    onClick={() => setMuted((m) => !m)}
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                    aria-label={muted ? "Turn sound on" : "Turn sound off"}
                  >
                    {muted ? (
                      <SpeakerSlashIcon size={22} weight="bold" />
                    ) : (
                      <SpeakerHighIcon size={22} weight="bold" />
                    )}
                  </button>
                ) : null}
                <button
                  ref={closeBtn}
                  type="button"
                  onClick={onClose}
                  className="flex h-11 w-11 items-center justify-center rounded-full"
                  aria-label="Close viewer"
                >
                  <XIcon size={24} weight="bold" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {framed ? (
        <>
          <button
            type="button"
            onClick={prev}
            disabled={index === 0}
            className="absolute left-[max(16px,calc(50%-min(86dvh,800px)*0.23-96px))] top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-paper/25 text-paper transition-colors duration-200 hover:bg-paper hover:text-ink disabled:opacity-25"
            aria-label="Previous reel"
          >
            <CaretLeftIcon size={22} weight="bold" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-[max(16px,calc(50%-min(86dvh,800px)*0.23-96px))] top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-paper/25 text-paper transition-colors duration-200 hover:bg-paper hover:text-ink"
            aria-label="Next reel"
          >
            <CaretRightIcon size={22} weight="bold" />
          </button>
        </>
      ) : null}
    </motion.div>
  );
}
