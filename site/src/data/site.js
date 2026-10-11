export const contact = {
  email: "devindrisds@gmail.com",
  phone: "+94 76 226 9232",
  phoneHref: "+94762269232",
  linkedin: "https://www.linkedin.com/in/devindri-de-silva-0a2303249/",
  linkedinLabel: "linkedin.com/in/devindri-de-silva",
};

export const capabilities = [
  {
    id: "strategy",
    title: "Content strategy",
    body: "Platform specific, audience informed, tied to a business goal. The plan says what gets made, for whom, and what it is supposed to move.",
    month: "One plan, rebuilt against what last month actually did.",
    image: "/media/ufs-scam-or-smart.webp",
    imageAlt: "Educational social post built from a content strategy",
  },
  {
    id: "ideation",
    title: "Ideation and scripting",
    body: "Hooks written to survive the first second. Every reel is scripted before anyone picks up a camera, which is why the format repeats and the results repeat with it.",
    month: "Every reel scripted before a camera comes out.",
    image: "/media/ufs-to-sell-to-me-1-7m.webp",
    imageAlt: "Scripted short form reel for UFS Lanka",
  },
  {
    id: "direction",
    title: "Shoot direction",
    body: "Monthly product, property and lifestyle shoots. On set I run the shot list, the talent and the edit brief, so what comes back is usable.",
    month: "A shoot day, with the shot list and the edit brief attached.",
    image: "/media/tribe-yala-breakfast.webp",
    imageAlt: "Property shoot at Tribe Yala",
  },
  {
    id: "management",
    title: "Social media management",
    body: "Calendars, captions, scheduling and the unglamorous consistency that keeps a page alive between campaigns.",
    month: "A full calendar, captions written, nothing posted late.",
    image: "/media/chocoholics-december-delights.webp",
    imageAlt: "Product launch creative for Chocoholics",
  },
  {
    id: "campaigns",
    title: "Campaigns and creators",
    body: "Phased product launches, contests and influencer partnerships, run from brief to payment to post mortem.",
    month: "Launches phased, contests live, creators briefed and paid.",
    image: "/media/chocoholics-10-days-left.webp",
    imageAlt: "Story competition campaign post",
  },
  {
    id: "reporting",
    title: "Analytics and reporting",
    body: "Monthly reporting against the goal, not against vanity. When a format stops working it gets cut, and the report says why.",
    month: "One report that says what to cut and what to scale.",
    image: "/media/infinity-jaffna-18k.webp",
    imageAlt: "Travel content reel with performance tracked monthly",
  },
];

// Roles as they run on LinkedIn. Brand lists come from the accounts she actually
// carried at each place, so the work below has somewhere to attach.
export const experience = {
  marketing: [
    {
      id: "zirateh",
      company: "Zirateh",
      location: "Colombo, Sri Lanka",
      start: "Aug 2025",
      end: "Present",
      current: true,
      roles: [{ title: "Content Specialist", type: "Full time" }],
      note: "Strategy, scripting and shoot direction across the agency's automotive and fine jewellery accounts. The UFS campaign and its SLIM DIGIS Silver came out of this seat.",
      brands: ["UFS Lanka", "Tata", "XPENG", "Ceylon Artisans"],
    },
    {
      id: "freelance",
      company: "Independent",
      location: "Colombo, remote",
      start: "Aug 2024",
      end: "Present",
      current: true,
      roles: [{ title: "Social Media Strategist", type: "Freelance" }],
      note: "Direct client work. Content, visuals and the digital strategy around them, built to drive growth and engagement.",
      brands: ["Infinity Vacations"],
    },
    {
      id: "growth-inc",
      company: "Growth Inc.",
      location: "Colombo, Sri Lanka",
      start: "Jun 2023",
      end: "Dec 2023",
      current: false,
      roles: [
        { title: "Junior Digital Marketer", type: "Full time, hybrid", window: "Oct 2023 to Dec 2023" },
        { title: "Digital Marketing Intern", type: "Internship", window: "Jun 2023 to Sep 2023" },
      ],
      note: "Where the groundwork went in. Content calendars, product launches and campaign execution for hospitality and food brands.",
      brands: ["Tribe Yala", "Chocoholics"],
    },
  ],
  teaching: [
    {
      id: "ric",
      company: "Royal Institute Campus",
      start: "Sep 2026",
      end: "Present",
      current: true,
      roles: [{ title: "Visiting Lecturer", type: "Part time, on site" }],
      note: "LSE designed undergraduate courses, including Digital Infrastructures for Business and Research Project in Digital Innovation.",
    },
    {
      id: "tutor",
      company: "Self employed",
      start: "Dec 2024",
      end: "Present",
      current: true,
      roles: [{ title: "Academic Tutor", type: "Hybrid" }],
      note: "English, Business, Accounting and Economics, from middle school through to A Levels across the National, Cambridge and Edexcel curriculums.",
    },
  ],
};

const FB = "https://www.facebook.com/reel/";

/** One UFS reel. The id is the Facebook reel id, which also names the video and the
 *  poster on disk, so a file can always be traced back to its post. */
const reel = (id, views, title) => ({
  id: `ufs-${id}`,
  poster: `/media/reels/ufs-${id}.webp`,
  video: `/media/reels/ufs-${id}.mp4`,
  views,
  title,
  href: `${FB}${id}`,
});

export const caseStudy = {
  client: "UFS Lanka",
  agency: "Zirateh",
  industry: "Automotive",
  title: "The $0 Campaign",
  window: "November 2025 to August 2026",
  summary:
    "UFS went from zero market presence to a four showroom expansion in Sri Lanka's most crowded dealership category, with no paid budget behind any of it.",
  award: {
    show: "SLIM DIGIS 2.6",
    level: "Silver",
    year: 2026,
    note: "Recognised by the Sri Lanka Institute of Marketing for the UFS Lanka campaign.",
    photos: [
      { src: "/media/slim-digis-devindri.webp", alt: "Devindri holding her SLIM DIGIS awards", width: 1100, height: 1956 },
      { src: "/media/slim-digis-team-trio.webp", alt: "Devindri with two teammates and their SLIM DIGIS trophies", width: 1100, height: 1956 },
      { src: "/media/slim-digis-team.webp", alt: "The agency team at SLIM DIGIS 2.6 with their trophies", width: 720, height: 1280 },
    ],
  },
  stats: [
    { value: 37.1, suffix: "M+", decimals: 1, label: "organic views", note: "In nine months, zero ad spend" },
    { value: 105.4, suffix: "K", decimals: 1, label: "followers gained", note: "Across all three platforms" },
    { value: 127, suffix: "", decimals: 0, label: "vehicles sold", note: "Traced back to the content" },
    { value: 4, prefix: "1 to ", suffix: "", decimals: 0, label: "showrooms", note: "Expansion driven by demand" },
  ],
  platforms: [
    { name: "Facebook", views: "28.1M", interactions: "506.3K", follows: "84.1K", share: 28.1 },
    { name: "TikTok", views: "6.0M", interactions: "214.5K", follows: "15K", share: 6.0 },
    { name: "Instagram", views: "3.03M", interactions: "125K", follows: "6.3K", share: 3.03 },
  ],
  sales: [
    { month: "Nov", units: 2 },
    { month: "Dec", units: 5 },
    { month: "Jan", units: 16 },
    { month: "Feb", units: 11 },
    { month: "Mar", units: 17 },
    { month: "Apr", units: 10 },
    { month: "May", units: 15 },
    { month: "Jun", units: 12 },
    { month: "Jul", units: 22 },
    { month: "Aug", units: 17 },
  ],
  viewRanges: [
    // The rail below shows 11 reels at 1.2M or more, so 10+ is the honest floor.
    { count: "10+", label: "1M+" },
    { count: 8, label: "500K to 1M" },
    { count: 14, label: "250K to 500K" },
    { count: 36, label: "100K to 250K" },
  ],
  // Each reel plays from its own file in public/media/reels and links back to the
  // post on Facebook. Titles are the post captions. Order is by views, highest first.
  reels: [
    reel("1038711468579977", "2.4M", "Don\u2019t go broke for a car"),
    reel("931812899597960", "2.3M", "Is this the best car brand for Sri Lankan roads?"),
    reel("1580470113519135", "1.9M", "Same car. Same auction. Completely different price tags"),
    reel("1225689079738732", "1.9M", "What\u2019s really stopping this car from being sold right now?"),
    reel("1543939886703174", "1.8M", "When your dream car\u2019s a Ferrari, but reality\u2019s way different"),
    reel("1313488670917487", "1.4M", "Why pay local dealer markups for a Toyota Raize?"),
    reel("2287967028640653", "1.3M", "Absolute plot twist ending!"),
    reel("860878213399018", "1.3M", "Picking up cars on a row, but what does he drive?"),
    reel("1184648413781264", "1.3M", "The right vehicle, the right amount"),
    reel("2050052858932382", "1.1M", "Space, safety, and a price tag that actually makes sense"),
    reel("1800804997750354", "573K", "Is Sri Lanka the most expensive country to buy a car in?"),
  ],
};
