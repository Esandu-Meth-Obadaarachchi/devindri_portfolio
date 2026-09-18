# Devindri De Silva, portfolio site

Single page React site. No backend, no database, everything static.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Deploy

Any static host. On Vercel or Netlify, point the project at this folder:

- Build command: `npm run build`
- Output directory: `dist`

No environment variables and nothing to configure.

## Stack

| Piece | What it does |
|---|---|
| Vite + React 19 | app shell |
| Tailwind v4 | styling, tokens live in `src/index.css` under `@theme` |
| Motion | every animation, scroll choreography included |
| Lenis | smooth scrolling |
| Phosphor Icons | icon set |
| Fontsource | Archivo and JetBrains Mono, self hosted, no Google Fonts request |

## Where things live

```
src/
  components/        one file per section, in page order
    ui/              Reveal, Counter, Magnetic, Button
  data/
    projects.js      the six client panels
    site.js          capabilities, UFS case study, contact details
  lib/
    smoothScroll.js  Lenis setup and the scroll-to helpers
    useMediaQuery.js resolves on first render, which Motion needs
    useDetachedProgress.js  see the comment in that file before touching it
public/media/        all imagery, webp
```

## Editing content

Copy, numbers and image paths are all in `src/data`. Nothing in the components needs
touching to swap a client, change a figure, or reorder the work.

To add images: drop a `.webp` into `public/media` and reference it as `/media/name.webp`.
Convert from PNG or JPG with `cwebp -q 82 in.png -o out.webp`. Do not put images in
`src/data`, that folder is for content only. Original PNGs live in `../source-images` and
`../extracted_assets` outside the app, so they never reach the bundle.

## Two things worth knowing

1. **Work panels are a sticky stack.** Each panel must fit inside one viewport at desktop,
   so if you add copy to a panel, check it at 1440x800 before shipping. Below `md` the
   stack turns off and panels simply flow.
3. **Display type sizes off `--shell`, not `vw`.** Containers cap at 1400px; raw `vw`
   sizing keeps growing past that and the headline overflows the column, where the reveal
   mask clips it. `--shell` is `min(100vw, 1400px)`, so type stops growing with the layout.
2. **`useDetachedProgress`.** Motion will hand a scroll driven style off to a native
   scroll timeline bound to the element being styled. Any scroll value passed down to a
   child element freezes at a constant. Relaying it through a plain motion value keeps the
   mapping correct. Hero and Work both depend on this.

## Accessibility and motion

The whole page honours `prefers-reduced-motion`: the preloader, the hero collapse, the
sticky stack, the marquee and the custom pointer all drop to static. The custom pointer
only mounts for fine pointers and never hides the caret inside form fields.
