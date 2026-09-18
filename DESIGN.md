# Devindri De Silva - Portfolio Site: Design Direction

## Design read

Reading this as: a personal portfolio for a social media strategist, aimed at brand owners
and agency hiring managers who scan on a phone, with a kinetic-editorial language, leaning
toward native CSS + Motion scroll choreography and a single strong accent.

The old HTML build read "soft blush stationery". This one reads **operator**: she scripts,
directs shoots, and moves numbers. Pink stays, but as a signal colour on a near-black and
paper base, not as the mood of the page.

Dials: `DESIGN_VARIANCE 8` / `MOTION_INTENSITY 8` / `VISUAL_DENSITY 4`.
Motion is dialled high on explicit request ("go crazy with the animations"), so every
section has to actually move, and every motion has to be motivated.

## Positioning

One line: **she makes content that people watch, and the watching turns into business.**
The proof is 37.1M organic views in 9 months for UFS Lanka, 105.4K followers gained,
127 vehicles sold, one showroom becoming four. That case study is the spine of the site.

## Palette (locked)

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#17110F` | text, dark blocks |
| `--ink-soft` | `#3A2E2B` | secondary text on paper |
| `--paper` | `#F5F2EF` | page base |
| `--paper-2` | `#EAE4DF` | alternate surface, hairlines |
| `--rose` | `#C42A52` | the single accent: numbers, underlines, CTA fill |
| `--plum` | `#4E1226` | the one dark colour block (case study, contact) |
| `--blush` | `#E9D4DA` | tint only, never a full section background |

One accent for the whole page. The UFS deck's cobalt and yellow are deliberately **not**
imported: the colour lock matters more than matching the client deck.

Page theme: light, locked. One deliberate colour-block switch to `--plum` for the case
study and contact, treated as a composition device, not a theme flip.

## Type

- Display and body: **Archivo Variable** (weight 100-900, width 62-125). Hierarchy comes
  from the width axis, not from mixing families. Headlines run expanded and heavy; body
  runs normal width.
- Data: **JetBrains Mono Variable**, small, for stat labels and figures only.
- No serif. "Creative brief equals serif" is the tell this site avoids, and her own deck
  is already a geometric sans.

## Shape system

- Surfaces, cards, media: **0px radius**. Sharp.
- Interactive controls (buttons, pills, cursor): **full pill**.
- One exception, used as a motif: **the arch** on portraits (`border-radius: 50% 50% 0 0 /
  35% 35% 0 0`), carried over from her existing brand deck.

## Sections and layout families

1. **Preloader** - counter plus curtain wipe, covers font load.
2. **Nav** - 64px, monogram left, three links plus one CTA right, scroll progress hairline.
3. **Hero** - full-bleed portrait right, kinetic name stack left. On scroll the hero
   **closes from both sides like an aperture** (clip-path inset driven by scroll progress)
   while the name tracks out and the next section rises underneath.
4. **Ticker** - one marquee, the only one on the page: capabilities as a kinetic strip.
5. **About** - asymmetric two column, arch portrait, trait row, four proof counters.
6. **Capabilities** - interactive hover list, image preview follows the cursor.
7. **Work** - sticky-stack panels, one project pinned at a time, six clients.
8. **Case study** - plum colour block: The $0 Campaign, animated monthly-sales chart,
   platform split, the wall of 1M+ reels.
9. **Contact** - plum block, oversized mailto CTA, form UI with real validation states,
   email, phone and LinkedIn.
10. **Footer** - minimal, contact links repeated, back to top.

Layout families used: full-bleed hero, marquee, asymmetric split, hover list, sticky stack,
data block, centred statement. No family repeats.

## Motion inventory (each one justified)

| Motion | Why it earns its place |
|---|---|
| Preloader wipe | covers font swap, sets the tempo |
| Hero name mask reveal | hierarchy, name first |
| Hero aperture close | requested, and it hands the scroll to the work |
| Ticker marquee | breadth of services without a list |
| Count-up stats | the numbers are the argument |
| Sticky-stack work panels | one client at a time, no card-grid mush |
| Chart draw | shows growth as growth |
| Magnetic CTA plus custom cursor | requested, plus pointer feedback |
| Reel parallax and tilt | depth on static screenshots |

All of it collapses to static under `prefers-reduced-motion`. The custom cursor only
mounts on fine pointers, never on touch, and never hides the native caret on form fields.

## Assets

19 images recovered from the old bundle, 4 more pulled from the new Canva deck (TATA),
plus the new studio portrait. Everything converted to webp and served from `public/media`.
Reel screenshots keep their native view-count badges: that is real proof, not decoration.

## Stack

Vite + React 19, Tailwind v4, `motion`, `lenis` for smooth scroll, `@phosphor-icons/react`,
fonts self-hosted through `@fontsource-variable/*`. No backend, no database, static deploy.
