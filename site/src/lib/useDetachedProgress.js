import { useMotionValue, useMotionValueEvent } from "motion/react";

/** Motion will hand a style driven straight off useScroll to a native scroll timeline.
 *  That timeline is bound to the element being styled, not to the scroll target, so any
 *  value passed down to a child element freezes. Relaying through a plain motion value
 *  keeps the animation on the main thread where the mapping is the one we asked for. */
export function useDetachedProgress(source) {
  const progress = useMotionValue(source.get());
  useMotionValueEvent(source, "change", (value) => progress.set(value));
  return progress;
}
