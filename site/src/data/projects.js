// Every figure here comes from Devindri's own portfolio deck and the UFS SLIM DIGIS
// results deck. Nothing is estimated.

const FB = "https://www.facebook.com/reel/";

/** A reel with no video file. It plays from its Facebook post, so the poster is the
 *  post's own thumbnail and the viewer embeds the post when it is opened. */
const linked = (account, id, views, title) => ({
  src: `/media/reels/${account}-${id}.webp`,
  ratio: "9/14",
  views,
  alt: title,
  title,
  href: `${FB}${id}`,
  embed: true,
  video: null,
});

export const projects = [
  {
    id: "ufs",
    client: "UFS Lanka",
    agency: "Zirateh",
    industry: "Automotive",
    goal: "Create brand awareness and boost leads.",
    approach:
      "Performance driven, brand centric content built to earn attention instead of buying it.",
    deliverables: [
      "Complete content strategy",
      "Scripted short form video",
      "Social media posts",
      "Monthly shoots",
    ],
    headline: { value: 37.1, suffix: "M+", label: "organic views in 9 months" },
    support: [
      { value: "105.4K", label: "followers gained" },
      { value: "127", label: "vehicles sold" },
    ],
    media: [
      { src: "/media/ufs-dream-car-1-8m.webp", views: "1.8M", baked: ["views"], alt: "UFS Lanka reel, Dream Car vs Reality", ratio: "9/14", video: null },
      { src: "/media/ufs-to-sell-to-me-1-7m.webp", views: "1.7M", baked: ["views"], alt: "UFS Lanka reel about vehicle pricing", ratio: "9/14", video: null },
      { src: "/media/ufs-scam-or-smart.webp", alt: "UFS Lanka educational post on direct vehicle imports", ratio: "1/1" },
    ],
    hasCaseStudy: true,
  },
  {
    id: "tata",
    client: "Tata",
    agency: "Zirateh",
    industry: "Automotive",
    goal: "Boost brand awareness and drive organic engagement.",
    approach:
      "A focused, lifestyle led content push that puts the vehicle inside a real day.",
    deliverables: [
      "One month content strategy",
      "Lifestyle short form content",
      "Shoot coordination and execution",
    ],
    headline: { value: 290, suffix: "K", label: "views on the launch reel" },
    support: [
      { value: "80K", label: "views on the EV charging cut" },
      { value: "1 month", label: "campaign window" },
    ],
    media: [
      linked("tata", "1060878919598971", "290K", "2026 \u0d85\u0dbd\u0dd4\u0dad\u0dca\u0db8 EV \u0d91\u0d9a!"),
      linked("tata", "2127668714463100", "80K", "GRWM: 135km in 15 minutes edition"),
      linked("tata", "1280606977475440", "328K", "Stop worrying about rising maintenance costs"),
      linked("tata", "1512768526594900", "258K", "First car \u0d91\u0d9a\u0d9a\u0dca \u0d9c\u0db1\u0dca\u0db1 \u0d9a\u0dbd\u0dd2\u0db1\u0dca \u0db8\u0dda video \u0d91\u0d9a \u0d85\u0db1\u0dd2\u0dc0\u0dcf\u0dbb\u0dca\u0dba\u0dba\u0dd9\u0db1\u0dca\u0db8 \u0db6\u0dbd\u0db1\u0dca\u0db1!"),
    ],
  },
  {
    id: "ceylon-artisans",
    client: "Ceylon Artisans",
    agency: "Zirateh",
    industry: "Fine jewellery",
    goal: "Drive sales and generate leads for custom designs.",
    approach:
      "Aspirational and educational content that answers what buyers are quietly wondering about price and craft.",
    deliverables: [
      "Complete content strategy",
      "Scripted short form video",
      "Social media posts",
      "Monthly shoots",
    ],
    headline: { value: 15.7, suffix: "K", label: "views on the engagement ring reel" },
    support: [
      { value: "12K", label: "views on the price comparison reel" },
      { value: "Custom", label: "design enquiries driven" },
    ],
    media: [
      linked("ceylon", "833598159702172", "3.3K", "When ordinary won\u2019t do, choose something as extraordinary as them"),
      linked("ceylon", "906388172106313", "2.7K", "A ring as unique as nature itself?"),
      linked("ceylon", "1853675898669744", "1.7K", "If you were getting engaged\u2026 which ring would you pick?"),
    ],
  },
  {
    id: "infinity-vacations",
    client: "Infinity Vacations",
    agency: "Independent",
    industry: "Travel and tourism",
    goal: "Attract new leads and maintain loyalty.",
    approach:
      "Aspirational content that sells Sri Lanka first and the itinerary second.",
    deliverables: [
      "Strategy and content calendars",
      "Short form video and posts",
      "Regular analytics reporting",
      "Social media copy",
    ],
    headline: { value: 73, suffix: "K", label: "views on the Bomburu Ella reel" },
    support: [
      { value: "18.2K", label: "views on the Jaffna guide" },
      { value: "Monthly", label: "reporting cadence" },
    ],
    media: [
      { src: "/media/infinity-bomburu-ella-73k.webp", views: "73K", baked: ["views"], alt: "Infinity Vacations reel at Bomburu Ella waterfall", ratio: "9/14", video: null },
      { src: "/media/infinity-jaffna-18k.webp", views: "18.2K", baked: ["views"], alt: "Infinity Vacations reel, five must visits in Jaffna", ratio: "9/14", video: null },
      { src: "/media/infinity-hikkaduwa.webp", alt: "Infinity Vacations post about Hikkaduwa", ratio: "1/1" },
    ],
  },
  {
    id: "tribe-yala",
    client: "Tribe Yala",
    agency: "Growth Inc.",
    industry: "Luxury glamping",
    goal: "Gain bookings and promote wildlife conservation through authentic storytelling.",
    approach:
      "Educational and aspirational content that blends luxury glamping with raw wilderness.",
    deliverables: [
      "Comprehensive content calendar",
      "Property shoots",
      "Website blogs",
      "Social media posts",
    ],
    headline: { kind: "scope", text: "Content calendar, property shoots and the blogs that carry the bookings" },
    support: [
      { value: "On site", label: "property shoot direction" },
      { value: "Blogs", label: "long form written for the site" },
    ],
    media: [
      { src: "/media/tribe-yala-breakfast.webp", alt: "Tribe Yala breakfast setting with a bush view", ratio: "4/3" },
      { src: "/media/tribe-yala-pool-deck.webp", alt: "Tribe Yala pool deck", ratio: "1/1" },
      { src: "/media/tribe-yala-bear-spectacle.webp", alt: "Tribe Yala post about sloth bear sightings", ratio: "1/1" },
    ],
  },
  {
    id: "chocoholics",
    client: "Chocoholics",
    agency: "Growth Inc.",
    industry: "Food and beverage",
    goal: "Generate buzz and drive sales for several new products.",
    approach:
      "A phased launch built on visual storytelling, contests and influencer collaborations.",
    deliverables: [
      "Comprehensive content calendar",
      "Product shoots",
      "Contests and interactive events",
      "Influencer partnerships",
    ],
    headline: { kind: "scope", text: "Three product launches, run from calendar to contest to creator" },
    support: [
      { value: "Contests", label: "interactive campaign mechanics" },
      { value: "Creators", label: "influencer partnerships managed" },
    ],
    media: [
      { src: "/media/chocoholics-december-delights.webp", alt: "Chocoholics December Delights launch creative", ratio: "4/3" },
      { src: "/media/chocoholics-cricket-box.webp", alt: "Chocoholics cricket season snack box post", ratio: "1/1" },
      { src: "/media/chocoholics-10-days-left.webp", alt: "Chocoholics story competition countdown post", ratio: "1/1" },
    ],
  },
];
