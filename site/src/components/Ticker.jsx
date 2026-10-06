import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
  useReducedMotion,
} from "motion/react";

const items = [
  "Content strategy",
  "Ideation",
  "Scripting",
  "Shoot direction",
  "Social management",
  "Campaigns",
  "Reporting",
];

const BASE_SPEED = 3.2; // percent of one copy per second

/** The one marquee on the page. It drifts on its own and leans into the scroll:
 *  faster and skewed while the page moves, and it reverses when you scroll up. */
export function Ticker() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const boost = useTransform(smooth, [-2000, 0, 2000], [-4, 0, 4], { clamp: false });
  const skew = useTransform(smooth, [-2500, 0, 2500], [7, 0, -7]);
  const base = useMotionValue(0);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b < -0.05) direction.current = -1;
    else if (b > 0.05) direction.current = 1;
    let move = direction.current * BASE_SPEED * (delta / 1000);
    move += direction.current * Math.abs(b) * BASE_SPEED * (delta / 1000);
    // One copy is 50% of the track, so wrapping at -50% is seamless.
    let next = base.get() - move;
    if (next <= -50) next += 50;
    if (next > 0) next -= 50;
    base.set(next);
  });

  const transform = useMotionTemplate`translate3d(${base}%, 0, 0) skewX(${skew}deg)`;
  const row = [...items, ...items];

  return (
    <div className="relative overflow-hidden bg-ink py-5 md:py-7" aria-label={items.join(", ")} role="marquee">
      <motion.div
        className="flex w-max items-center whitespace-nowrap will-change-transform"
        style={reduce ? undefined : { transform }}
        aria-hidden="true"
      >
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center">
            <span className="u-display px-6 text-[8vw] text-paper md:px-10 md:text-[calc(var(--shell)*0.034)]">
              {item}
            </span>
            <span className="u-display text-[8vw] text-rose md:text-[calc(var(--shell)*0.034)]">/</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
