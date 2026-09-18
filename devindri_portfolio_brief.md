# Devindri De Silva — Personal Portfolio Website Brief

## Project Overview

Build a **single-page React portfolio website** for Devindri De Silva, a Social Media Strategist & Content Creator based in Sri Lanka. The site needs to feel warm, editorial, and confident — the kind that potential clients land on and immediately trust. Think creative agency meets personal brand. All data hardcoded. No backend.

Target audience: Brands and businesses looking to hire a social media strategist, content agency clients, and potential employer agencies.

---

## Tech Stack & Setup Requirements

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Load via Google Fonts — pair a bold display font (e.g. Playfair Display or DM Serif Display) with a clean sans-serif body (e.g. DM Sans or Plus Jakarta Sans)
- **No backend, no API calls, no auth**
- **Fully responsive** — mobile-first (most clients will view on phone)

---

## Design Direction

**Aesthetic**: Warm, editorial, feminine-confident. Think a polished creative agency — clean layouts with personality. NOT corporate, NOT dark, NOT techy.

**Mood board words**: Dusty rose. Cream. Mauve. Bold. Warm white. Strategic sophistication.

**Colors**:
```
--bg-primary: #fdf8f5         /* warm off-white / cream */
--bg-section-alt: #f5ece8     /* soft blush section dividers */
--accent-primary: #7d3346     /* deep maroon / burgundy — primary brand color */
--accent-rose: #c4848e        /* dusty rose — secondary */
--accent-mauve: #b08090       /* muted mauve — tertiary */
--text-primary: #2d1a20       /* near-black with warm undertone */
--text-muted: #8a6b72         /* muted warm grey */
--border-subtle: rgba(125,51,70,0.12)
--card-bg: #ffffff
--card-shadow: 0 4px 24px rgba(125,51,70,0.08)
```

**Typography**:
- Headings: Playfair Display or DM Serif Display (italic for emphasis words)
- Body: DM Sans or Plus Jakarta Sans
- Stats/Numbers: Bold DM Sans, oversized

**Layout feel**:
- Generous white space
- Arched or rounded photo containers (matches her existing brand)
- Cards with subtle rose-tinted shadows
- Stats displayed large and proud — these are her proof points
- Section dividers using soft blush backgrounds (alternating white / blush)

**Animations** (Framer Motion, tasteful):
- Fade-up on scroll for every section (y: 30 → 0, opacity: 0 → 1)
- Stats count-up when in view
- Project cards: slight scale + shadow lift on hover
- Hero: staggered fade-in for name, role, paragraph, CTA
- Navbar: border appears after scroll

**No particles, no dark mode, no aggressive effects.** This should feel like flipping through a beautifully designed magazine.

---

## Site Sections (in order)

### 1. Navbar

- Fixed top, transparent → white with subtle bottom border on scroll
- Left: "D.D.S" monogram or "Devindri" wordmark
- Nav links: About | Work | Services | Contact
- CTA button: "Work With Me" (scrolls to contact) — styled in maroon
- Mobile: hamburger menu

---

### 2. Hero Section

**Full viewport height.**

**Layout**: Split — left side text content, right side photo in an arched frame (matching her portfolio aesthetic).

**Name**: DEVINDRI DE SILVA
(Large, bold, Playfair Display. "DEVINDRI" in maroon, "DE SILVA" in lighter weight)

**Role line** (typewriter cycling through):
- "Social Media Strategist"
- "Content Creator"
- "Brand Storyteller"
- "Performance-Driven Creator"

**Paragraph**:
> I help brands grow through high-impact digital strategies, creative content, and storytelling that actually converts. From automotive to fine jewellery to luxury travel — I bring the numbers.

**CTAs**:
- "See My Work" (primary, maroon filled) — scrolls to projects
- "Let's Connect" (secondary, outlined) — scrolls to contact

**Photo**: Arched frame container (border-radius top: 50% to create arch effect), profile photo placeholder with maroon border ring. The arch shape is a key part of her visual identity from her existing portfolio.

**Background**: Clean warm cream. Small abstract organic shapes or a very subtle watercolor-wash texture in the background for depth (SVG-based, lightweight).

---

### 3. About Section

**Background**: Blush (#f5ece8)

**Layout**: Left text, right portrait photo (square with rounded corners)

**Heading**: ABOUT ME

**Content**:
> I'm a dedicated Social Media Strategist specialising in crafting and executing high-impact digital strategies. My core strengths lie in content development, strategic planning, and successful social media product launches.

> I've worked across industries — automotive, fine jewellery, luxury travel, wildlife tourism, and food — building content that doesn't just look good but performs. Every strategy I build is rooted in data, shaped by creativity, and designed for real results.

**Trait pills** (4 badges in a row, maroon-outlined rounded pills):
- Strategic
- Creative
- Analytical
- Performance-Driven

**Mini stat bar** (animated count-up, below traits):
- 14M+ Views Generated
- 5+ Industries Served
- 4 Agency Clients
- 2 Agencies (Zirateh & Growth Inc.)

---

### 4. Work / Projects Section

**Background**: White

**Heading**: MY WORK

**Subheading**: Brands I've grown. Results I've delivered.

**Layout**: Grid of project cards — 2 columns on desktop, 1 on mobile. Each card is large, image-forward, with hover state revealing the approach + deliverables.

---

#### Project Card Structure:
Each card has:
- Client name (large, bold)
- Agency tag (e.g. "via Zirateh" or "via Growth Inc.")
- Industry tag pill
- Goal (one line)
- Key metric(s) — displayed big
- Deliverables list (bullet)
- Sample content placeholder image area (mockup-style, aspect-ratio box in blush/mauve)

---

#### PROJECT 1: UFS Lanka
Agency: Zirateh
Industry: Automotive
Goal: Create brand awareness and boost leads

Results (displayed BIG):
- 14.1M Views (↑1,400%)
- 1.9M Views (↑175.2%)
- Individual reels: 1.8M views, 1.7M views

My Approach: Performance-driven, brand-centric content designed to boost awareness.

Key Deliverables:
- Complete content strategy
- Scripted creative short-form video content
- Visually striking social media posts
- Monthly shoots

---

#### PROJECT 2: Ceylon Artisans
Agency: Zirateh
Industry: Fine Jewellery
Goal: Drive sales and generate leads for custom designs

Results:
- 15.7K views, 12K views on key reels
- Sales-focused content driving custom jewellery enquiries

My Approach: Performance-driven, aspirational and educational content suited for the fine jewellery industry.

Key Deliverables:
- Complete content strategy
- Scripted creative short-form video content
- Visually striking social media posts
- Monthly shoots

---

#### PROJECT 3: Infinity Vacations
Agency: Independent
Industry: Travel & Tourism (Sri Lanka)
Goal: Attract new leads and maintain customer loyalty

Results:
- 73K views, 18.2K views on destination content
- Aspirational travel content showcasing Sri Lanka

My Approach: Aspirational and engaging content showcasing Sri Lanka and the team.

Key Deliverables:
- Complete content strategy and content calendars
- Short-form video content and posts
- Regular analytics reporting
- Social media copy

---

#### PROJECT 4: Tribe Yala
Agency: Growth Inc.
Industry: Luxury Glamping / Wildlife Tourism
Goal: Gain more bookings and promote wildlife conservation through authentic storytelling

My Approach: Educational and aspirational content blending luxury glamping with raw wilderness.

Key Deliverables:
- Comprehensive Content Calendar
- Property shoots
- Engaging website blogs
- Visually striking social media posts

---

#### PROJECT 5: Chocoholics
Agency: Growth Inc.
Industry: Food & Beverage
Goal: Generate buzz and drive sales for several new products

My Approach: Phased launch strategy focused on visual storytelling, contests, and influencer collaborations.

Key Deliverables:
- Comprehensive Content Calendar
- Product shoots
- Social media contests and interactive events
- Influencer partnerships

---

### 5. Services Section

**Background**: Blush (#f5ece8)

**Heading**: WHAT I DO

**Layout**: 3-column icon cards on desktop

**Services**:

**Content Strategy**
Icon: lightbulb or map
Every brand needs a plan. I build full content strategies — platform-specific, audience-informed, and goal-driven — that give your social media a clear direction.

**Short-Form Video Content**
Icon: play button or video camera
Scripted, shot, and directed reels and TikToks that stop the scroll. From automotive to jewellery to tourism — I know how to make content that performs.

**Social Media Management**
Icon: bar chart or calendar
Content calendars, captions, scheduling, and consistency. I keep your channels active, on-brand, and growing while you focus on your business.

**Photography & Shoots**
Icon: camera
Monthly product, property, and lifestyle shoots. Visual content that actually looks like your brand — not just stock photos.

**Analytics & Reporting**
Icon: trending up
Regular performance reporting, audience insights, and data-driven decisions. You'll always know what's working and why.

**Influencer & Campaign Management**
Icon: users
Influencer partnerships, interactive contests, and campaign execution. Building community around your brand the right way.

---

### 6. Contact Section

**Background**: Maroon (#7d3346) — full bleed, light text on dark

**Heading**: LET'S CONNECT!
(Large, cream/white, Playfair Display)

**Body**:
> Ready to grow your brand? Let's talk strategy.

**Contact details** (with icons, in cream):
- Email: devindrisds@gmail.com
- Phone: +94 76 226 9232

**Simple contact form** (frontend only, no submission — UI only):
- Name field
- Email field
- Message textarea
- "Send Message" button (cream button, maroon text)

---

### 7. Footer

**Background**: Dark maroon (#5a2535) — one shade darker than contact section

- "© 2025 Devindri De Silva"
- "Social Media Strategist & Content Creator"
- Back to top arrow button

---

## Animation Specifications

All via **Framer Motion**. Keep it smooth and organic — not bouncy or mechanical.

- **Hero**: Name fades in first (0.3s), then role typewriter starts (0.8s delay), then paragraph (1s), then CTAs (1.2s)
- **Scroll reveals**: `whileInView`, `once: true`, `y: 30 → 0`, `opacity: 0 → 1`, `duration: 0.6s`, stagger children by 0.1s
- **Stats**: `useCountUp` or manual counter that triggers on viewport entry
- **Project cards**: `whileHover: { scale: 1.02, boxShadow: "0 8px 40px rgba(125,51,70,0.15)" }`
- **Service cards**: `whileHover: { y: -4 }` with transition `spring`
- **Navbar**: `animate` backdrop-filter and border opacity based on scroll Y

---

## Component Structure

```
src/
  components/
    Navbar.jsx
    Hero.jsx
    About.jsx
    Projects.jsx
    Services.jsx
    Contact.jsx
    Footer.jsx
    ui/
      ProjectCard.jsx
      ServiceCard.jsx
      StatCounter.jsx
      ArchPhoto.jsx        ← reusable arched photo container
  data/
    projects.js
    services.js
  App.jsx
  main.jsx
  index.css
```

---

## Key Design Details to Get Right

1. **The arch photo shape** — This is part of her personal brand from her existing portfolio. Use `border-radius: 50% 50% 0 0 / 60% 60% 0 0` on the photo container or similar to create a true arch top. Add a maroon ring border.

2. **The numbers need to be the hero of each project card** — 14.1M, 1.9M, 73K — these are her proof points. Display them large, bold, maroon. Don't bury them.

3. **The alternating section backgrounds** (white → blush → white → blush) should feel like page turns — each section has its own breathing room.

4. **Typography contrast** — The headings use weight and size to create hierarchy. "ABOUT" or "MY WORK" in bold maroon large, subtext in muted warm grey. Never use pure black text.

5. **Mobile priority** — Her clients are brands. They'll often view this on a phone. Project cards should stack cleanly. The hero should still look great at 375px.

6. **No stock photo illustrations** — Use solid-color placeholder boxes (in blush/mauve tones) styled as content mockups where images would go. The design should look complete even without real images.

---

## Packages to Install

```bash
npm create vite@latest devindri-portfolio -- --template react
cd devindri-portfolio
npm install tailwindcss @tailwindcss/vite framer-motion lucide-react react-intersection-observer
```

---

## Deliverable

A single-page React app that:
- Loads fast and feels premium
- Works beautifully on mobile (priority)
- Leads with her results — the numbers come first
- Reflects her warm, strategic, creative brand identity
- Is ready to deploy on Vercel or Netlify with zero configuration
