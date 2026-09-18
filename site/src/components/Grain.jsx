import { LAYER } from "../lib/layers";

/** Fixed, pointer-events-none, never on a scrolling container. */
export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 opacity-[0.16] mix-blend-multiply"
      style={{
        zIndex: LAYER.grain,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      }}
    />
  );
}
