# Saved alternates

Pictures that were tried for the hero and set aside. None of these are used by the site.

| File | What it is |
|---|---|
| `devindri-awards-cutout-blush.webp` | The first version: her lifted off the SLIM DIGIS backdrop and set on the blush used by the hero arch. 1125x1500. This is also the picture now used in the About section. |
| `devindri-awards-original-full.webp` | The full, uncropped original photo with the sponsor wall. 1125 wide. |
| `make-cutout.swift` | The script that made the cutout, using the macOS subject mask. Run with `swiftc -O make-cutout.swift -o lift && ./lift in.jpg out.png mask.png`. The pixel rectangle that clears the gap by her arm is specific to this photo. |

## To put the cutout back in the hero

In `site/src/components/Hero.jsx`, change the image `src` to `/media/devindri-hero-awards.webp`.
In `site/index.html`, change the preload `href` to the same path.
