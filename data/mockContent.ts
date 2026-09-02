// Central content file for the entire site. Every page/component receives its copy
// and image references via typed props sourced from the exported constants below,
// rather than hardcoding text inline — this keeps content editable in one place and
// gives every component a clear prop contract (see each interface).
//
// File is organized in two halves: TypeScript interfaces first, then the actual
// exported content constants that implement them, grouped roughly by page/section.

// ==================== TYPE DEFINITIONS ====================

// Homepage hero section
export interface HeroContent {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCtaText: string;
  secondaryCtaText: string;
}

// About page hero section (heading + playable video)
export interface AboutHeroContent {
  eyebrow: string;
  heading: string;
  subheading: string;
  video: {
    videoSrc?: string;
    posterSrc?: string;
    thumbnailAlt: string;
  };
}

// Fuel Prices page hero section
export interface FuelPricesHeroContent {
  eyebrow: string;
  heading: string;
  subheading: string;
}

// A single row in the depot fuel price table on the /pricing page
export interface DepotPrice {
  depot: string;
  verified: boolean;
  price: number;
  change: number;
  changePercent: number;
  updated: string;
  // Raw ISO timestamp backing `updated`'s "HH:MM" display string — needed to sort
  // rows by actual recency (the display string alone can't be compared across days).
  // Only ever populated by the live API; mock rows leave it undefined.
  updatedAt?: string;
}

// About page "our story" narrative section (paired with the video from AboutHeroContent)
export interface AboutStoryContent {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  signatureName: string;
}

// A single top-level nav item, optionally with a dropdown of child links
export interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

// Homepage hero's dashboard/product screenshot mockup image
export interface DashboardImage {
  src: string;
  alt: string;
}

// A single card in the homepage "How to Get Started" grid. `theme` picks the
// card's background/text treatment (see THEME_STYLES in HowItWorks.tsx):
// "green" = solid brand green with white text, "lavender"/"mint" = pastel
// background with dark text.
export interface HowItWorksStep {
  title: string;
  description: string;
  image: { src: string; alt: string };
  theme: "green" | "lavender" | "mint";
}

export interface HowItWorksContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  steps: HowItWorksStep[];
}

// A single animated stat counter (e.g. "2400+ / Gas Stations Nationwide")
export interface Stat {
  value: string;
  label: string;
}

// Homepage stats section: scroll-highlighted heading + row of animated counters
export interface StatsContent {
  headingEmphasis: string;
  headingRest: string;
  stats: Stat[];
  ctaText: string;
}

// A single regulatory-body logo in the "Trusted By" strip
export interface TrustedLogo {
  name: string;
  subtitle: string;
}

export interface TrustedByContent {
  heading: string;
  logos: TrustedLogo[];
}

// A single row in the homepage's alternating feature showcase
export interface FeatureTab {
  label: string;
  description: string;
  ctaText: string;
  image: { src: string; alt: string };
}

export interface FeaturesContent {
  title: string;
  subtitle: string;
  tabs: FeatureTab[];
}

// A single value-proposition card in the "Why Us" section
export interface TrustPoint {
  title: string;
  description: string;
  image: { src: string; alt: string };
}

export interface WhyUsContent {
  eyebrow: string;
  heading: string;
  points: TrustPoint[];
}

// A single platform card on the Access Client Portal page (Reporting / Card platform)
export interface PortalPlatform {
  title: string;
  subtitle: string;
  image: { src: string; alt: string };
  ctaText: string;
  ctaHref: string;
  checklist: string[];
}

export interface PortalPageContent {
  eyebrow: string;
  heading: string;
  subheading: string;
  platforms: PortalPlatform[];
}

// "Need help logging in?" support callout at the bottom of the Portal page
export interface PortalSupportContent {
  eyebrow: string;
  heading: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  image: { src: string; alt: string };
}

// A single question/answer pair in the homepage FAQ accordion
export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  eyebrow: string;
  heading: string;
  items: FaqItem[];
}

// A single link column in the site footer (e.g. "Product", "Solutions", "Company")
export interface FooterLinkColumn {
  heading: string;
  links: { label: string; href: string }[];
}

// Site-wide footer: CTA panel, brand/contact info, link columns, legal row
export interface FooterContent {
  ctaEyebrow: string;
  ctaHeading: string;
  ctaButtonText: string;
  ctaButtonHref: string;
  brand: string;
  address: string;
  email: string;
  phone: string;
  columns: FooterLinkColumn[];
  legalLinks: { label: string; href: string }[];
  copyright: string;
}

// Shape of a mock blog post — mirrors the fields lib/api.ts maps WordPress data into,
// so mock and live data are interchangeable everywhere a post is consumed.
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  slug: string;
  image?: { src: string; alt: string };
}

// Blog index page (/blog) hero section
export interface BlogIndexHeroContent {
  eyebrow: string;
  heading: string;
  subheading: string;
}

// "Get in touch" page (route: /request) — a lead-capture form linked from the
// navbar/footer "Get in touch" CTAs, alongside a phone-mockup graphic.
export interface GetInTouchContent {
  eyebrow: string;
  heading: string;
  subheading: string;
  namePlaceholder: string;
  fleetSizeOptions: string[];
  phonePlaceholder: string;
  emailPlaceholder: string;
  ctaText: string;
  image: { src: string; alt: string };
}

// Homepage's "latest posts" preview section header (posts themselves come from lib/api.ts)
export interface BlogSectionContent {
  eyebrow: string;
  heading: string;
  ctaText: string;
}

// Homepage newsletter signup section (last section, after the blog list)
export interface NewsletterContent {
  eyebrow: string;
  heading: string;
  subheading: string;
  placeholder: string;
  buttonText: string;
  consentText: string;
}

// ==================== CONTENT DATA ====================
// Top navigation links, shared by every page via app/layout.tsx
export const navLinks: NavLink[] = [
  { label: "About Us", href: "/about" },
  {
    label: "Our Solutions",
    href: "/solutions",
    children: [
      { label: "Agile Flex Petrolkaart", href: "/solutions/fuel-cards" },
      { label: "Bespoke Tech Solutions", href: "/solutions/telematics" },
    ],
  },
  { label: "Fuel Prices", href: "/pricing" },
  { label: "Our Blog", href: "/blog" },
];

// Homepage hero copy
export const heroContent: HeroContent = {
  eyebrow: "A smarter way for businesses to manage fleet fueling",
  headline: "Protect and Grow Your Profit Margins Today",
  subheadline:
    "We help businesses boost profits with smarter fuel solutions and cost-control systems.",
  primaryCtaText: "Request fuel cards",
  secondaryCtaText: "Schedule a demo",
};

// Fuel Prices page hero copy
export const fuelPricesHeroContent: FuelPricesHeroContent = {
  eyebrow: "Fuel Prices",
  heading: "Monitor Live Fuel Prices Across Nigerian Stations",
  subheading:
    "Track live fuel rates across Nigerian stations to eliminate overspending and protect your profit margins.",
};

// Mock depot fuel prices. `verified` flags which depots are trustworthy enough to
// surface on the homepage's price banner (see the filter in app/page.tsx).
export const depotPrices: DepotPrice[] = [
  { depot: "PPMC", verified: true, price: 1969.0, change: -10.0, changePercent: -0.51, updated: "10:06" },
  { depot: "Sobomak", verified: true, price: 1980.0, change: -20.0, changePercent: -1.01, updated: "10:04" },
  { depot: "Optima", verified: true, price: 1975.0, change: -45.0, changePercent: -2.28, updated: "10:02" },
  { depot: "Techno Oil", verified: true, price: 1216.0, change: -5.0, changePercent: -0.41, updated: "09:54" },
  { depot: "Aiteo", verified: false, price: 1908.0, change: -8.0, changePercent: -0.42, updated: "10:00" },
  { depot: "A.A Rano", verified: false, price: 1970.0, change: -6.0, changePercent: -0.30, updated: "09:58" },
  { depot: "Bulk Strategic", verified: false, price: 1980.0, change: -37.0, changePercent: -1.87, updated: "09:56" },
  { depot: "Sigmund", verified: false, price: 1980.0, change: -35.0, changePercent: -1.77, updated: "09:55" },
  { depot: "African Terminal", verified: false, price: 1959.0, change: -3.0, changePercent: -0.15, updated: "09:53" },
  { depot: "Intergrated", verified: false, price: 1959.0, change: -6.0, changePercent: -0.31, updated: "09:52" },
  { depot: "Nipco Lagos", verified: false, price: 1968.0, change: -6.0, changePercent: -0.30, updated: "09:50" },
  { depot: "Mainland", verified: false, price: 1980.0, change: 1.0, changePercent: 0.05, updated: "09:23" },
  { depot: "Sobaz", verified: false, price: 1965.0, change: -10.0, changePercent: -0.51, updated: "10:00" },
  { depot: "Pinnacle", verified: false, price: 1965.70, change: -0.30, changePercent: -0.02, updated: "10:00" },
  { depot: "A.Y.M Shafa", verified: false, price: 1987.00, change: 12.0, changePercent: 0.61, updated: "11:02" },
  { depot: "Mrs Tincan", verified: false, price: 1972.00, change: 0.0, changePercent: 0.0, updated: "10:00" },
  { depot: "Dangote", verified: false, price: 1955.00, change: 0.0, changePercent: 0.0, updated: "10:00" },
  { depot: "Liquid Bulk", verified: false, price: 1987.00, change: 15.0, changePercent: 0.76, updated: "10:00" },
  { depot: "Nepal", verified: false, price: 1987.00, change: 10.0, changePercent: 0.51, updated: "10:00" },
  { depot: "Matrix Warri", verified: false, price: 1987.00, change: 12.0, changePercent: 0.61, updated: "10:00" },
];

// About page hero copy
export const aboutHeroContent: AboutHeroContent = {
  eyebrow: "About Us",
  heading: "We're building the infrastructure for smarter fleet management.",
  subheading:
    "We are on a mission to help Nigerian businesses protect their profit margins, eliminate overspending, and take complete control of their fuel operations. Rooted in transparency, we build secure systems that keep your fleet on the move.",
  video: {
    thumbnailAlt: "City skyline at dusk",
  },
};

// About page "our story" narrative copy
export const aboutStoryContent: AboutStoryContent = {
  eyebrow: "About Us",
  heading: "Fueling Agile is reframing how fleets operate.",
  paragraphs: [
    "We believe that fuel management shouldn't be a black box. Fueling Agile wasn't built on guesswork or corporate slogans—it was built to solve the real, everyday bottlenecks businesses face: tracking every litre, stopping leaks before they happen, and ensuring drivers are never stranded.",
    "Teams do their best work when they have total visibility. That's why we engineered our architecture with a clear division of control: a dedicated fleet operator portal for the client, and a robust internal operations command center to keep everything running smoothly. We focus on real-time tracking, customizable spending limits, and seamless financial security powered by our Providus Bank integrations. Not as marketing features—but because they help business owners make better decisions.",
    "We move fast, but we build for security. From the QR/NFC technology in our AgileFlex cards to our digital welfare solutions, we care about the details that matter: accurate usage monitoring, transparent market pricing, and access to a network of over 2,400 stations.",
    "Fueling Agile is our product, but it's also a reflection of our core belief: technology, built thoughtfully, is the engine that protects your profits and quietly powers your growth.",
  ],
  signatureName: "The Fueling Agile Team",
};

// Homepage hero's graphic: fleet dashboard screenshots with a hand holding an
// AgileFlex PetrolKaart card
export const dashboardImage: DashboardImage = {
  src: "/hero-fleet-card.png",
  alt: "A hand holding an AgileFlex PetrolKaart card in front of the fleet vehicle dashboard, showing vehicle status, card balances, and transaction history",
};

// Homepage "How to Get Started" 3-step walkthrough
export const howItWorksContent: HowItWorksContent = {
  eyebrow: "Get started",
  title: "How to Get Started",
  subtitle: "Start using the AgileFlex PetrolKaart in three simple steps.",
  steps: [
    {
      theme: "green",
      title: "Tell us about your fleet",
      description:
        "We'll set up your account and assign a card to each driver or vehicle in minutes.",
      // TODO: swap in the real phone/chat mockup once provided
      image: { src: "/how-it-works-fleet-chat.png", alt: "Chat conversation setting up a new fleet account" },
    },
    {
      theme: "lavender",
      title: "Fund & Control",
      description:
        "You decide how much each card can spend, and when. No card spends more than you allow.",
      // TODO: swap in the real cash/wallet illustration once provided
      image: { src: "/how-it-works-fund-control.png", alt: "Illustration of cash, a wallet, and coins representing card funding limits" },
    },
    {
      theme: "mint",
      title: "Fuel Anywhere",
      description:
        "Your card works at 2,400+ stations across the country. Wherever the job takes your team, they can fuel up.",
      // TODO: swap in the real gas station illustration once provided
      image: { src: "/how-it-works-fuel-anywhere.png", alt: "Illustration of vehicles fueling up at a gas station" },
    },
    {
      theme: "green",
      title: "See Everything, Instantly",
      description:
        "The Reporting Platform turns every fill-up into a line you can see, the second it happens. No end-of-month surprises.",
      // TODO: swap in the real analytics dashboard screenshot once provided
      image: { src: "/how-it-works-reporting.png", alt: "Reporting platform dashboard showing fleet spend analytics" },
    },
  ],
};

// Regulatory body ("Trusted By") logo strip
export const trustedByContent: TrustedByContent = {
  heading: "Certified by the bodies that regulate this industry",
  logos: [
    { name: "DPR", subtitle: "Department of Petroleum Resources" },
    { name: "NDPB", subtitle: "Nigeria Data Protection Bureau" },
  ],
};

// Homepage animated stats section
export const statsContent: StatsContent = {
  headingEmphasis: "Built",
  headingRest:
    " for Nigerian businesses that are tired of guessing how much they spend on fuel every month.",
  stats: [
    { value: "2400+", label: "Gas Stations Nationwide" },
    { value: "24/7", label: "Customer Support" },
    { value: "30 mins", label: "Cards are funded in 30mins" },
  ],
  ctaText: "Request fuel cards",
};

// Homepage auto-advancing feature tabs (AgileFlex / Virtual Volume / Bespoke)
export const featuresContent: FeaturesContent = {
  title: "What we've built to stop fuel costs from draining you",
  subtitle:
    "We offer complete fueling services and custom IT solutions built for your business.",
  tabs: [
    {
      label: "AgileFlex PetrolKaart",
      description:
        "AgileFlex PetrolKaart is a prepaid card that pays for fuel, works like a debit card, so you always see exactly what your business spent and where.",
      ctaText: "Read more",
      image: {
        src: "/tab-agileflex.jpg",
        alt: "AgileFlex PetrolKaart dashboard and physical fuel card",
      },
    },
    {
      label: "Virtual Volume Fuel-Up",
      description:
        "Virtual Volume Fuel-Up lets you order fuel online the way you'd order anything else, then track it until it gets to you.",
      ctaText: "Coming soon",
      image: {
        src: "/tab-virtual-volume.jpg",
        alt: "Virtual Volume Fuel-Up success screen showing a generated redemption code and QR code",
      },
    },
    {
      label: "Bespoke Solutions",
      description:
        "Bespoke Tech Solutions is where we build custom fuel and business tools designed around exactly how your business runs.",
      ctaText: "Read more",
      image: {
        src: "/tab-bespoke.jpg",
        alt: "Code editor illustration representing custom-built fuel and business tools",
      },
    },
  ],
};

// Homepage "Why Fueling Agile?" value-proposition cards
export const whyUsContent: WhyUsContent = {
  eyebrow: "Why Fueling Agile?",
  heading: "Here's what makes businesses trust us with their fuel budget",
  points: [
    {
      title: "Nationwide Coverage",
      description:
        "Wherever your business operates, our card works there too, at 2,400+ stations across the country.",
      image: { src: "/trust-1.png", alt: "Map of Nigeria highlighting nationwide coverage" },
    },
    {
      title: "Fast, Reliable Support",
      description:
        "When something goes wrong, we don't leave you waiting. Quick, dependable help, every time.",
      image: { src: "/trust-2.png", alt: "Illustration representing fast, reliable support" },
    },
    {
      title: "Real Security",
      description:
        "PIN protection, instant card blocking, and bonded operations, so your money stays safe.",
      image: { src: "/trust-3.png", alt: "Illustration representing account and card security" },
    },
  ],
};

// Access Client Portal page: the two platform cards (Reporting + Card platform)
export const portalPageContent: PortalPageContent = {
  eyebrow: "Access Client Portal",
  heading: "Two Dedicated Platforms. Total Spending Control.",
  subheading:
    "Monitor overall company activity on our reporting platform, or manage individual card balances and security through the Providus Bank portal.",
  platforms: [
    {
      title: "Reporting Platform",
      subtitle: "See where every naira went.",
      image: {
        src: "/portal-reporting.jpg",
        alt: "AgileFlex analytics dashboard showing total fleet spend and monthly spend trend",
      },
      ctaText: "Log In to Reports",
      ctaHref:
        "https://cards.fuelingagilenigeria.com/?_gl=1*1k5vm4m*_ga*NDg0MTA1OTc0LjE3NDM1OTcwNjY.*_ga_56P7EWPZCC*czE3ODYwMTkwNzgkbzkxJGcxJHQxNzg2MDE5MDgxJGo1NyRsMCRoMA..",
      checklist: [
        "Real-time fuel spend tracking",
        "Monthly reports, ready to download",
        "Spend breakdown per card or driver",
      ],
    },
    {
      title: "Card Platform",
      subtitle: "Manage your AgileFlex cards directly",
      image: {
        src: "/portal-card-platform.jpg",
        alt: "Providus Bank MCP Customer Portal login and card management screen",
      },
      ctaText: "Log In to Card Platform",
      ctaHref: "https://mcp-customer.providusbank.com/",
      checklist: ["Monitor Card Balances", "Block a lost or stolen card in seconds"],
    },
  ],
};

// Access Client Portal page: bottom support callout
export const portalSupportContent: PortalSupportContent = {
  eyebrow: "Support",
  heading: "Are you having Issues Logging in or just have Questions",
  description: "Our support team is ready to assist you with any platform issues.",
  ctaText: "Contact Support",
  ctaHref: "/contact",
  image: {
    src: "/portal-support.jpg",
    alt: "A smiling customer support agent wearing a headset",
  },
};

// Homepage FAQ accordion
export const faqContent: FaqContent = {
  eyebrow: "Frequently Asked Questions",
  heading: "Here are answers to the questions we get asked the most.",
  items: [
    {
      question: "What is AgileFlex PetrolKaart?",
      answer:
        "A real-time, prepaid fuel card and mobile app solution that lets businesses manage fleet fuel spending with control, tracking, and transparency, like a debit card restricted to fuel purchases.",
    },
    {
      question: "Which fuel stations accept the card / is it nationwide?",
      answer:
        "Yes, nationwide, accepted at over 2,400+ fuel stations across Nigeria.",
    },
    {
      question:
        "Can spending limits be set per card (daily/weekly/monthly, by fuel type/station)?",
      answer:
        "Yes. Business owners can set daily, weekly, or monthly limits per card, tailored by employee role or day, to control spending and prevent mismanagement.",
    },
    {
      question: "How does AgileFlex help reduce fuel theft, fraud, and wastage?",
      answer:
        "Through real-time tracking, spending controls, PIN-protected transactions, bonded operations, and theft-proof financial systems that ensure full accountability.",
    },
    {
      question: "Is there an online dashboard or mobile app for real-time monitoring?",
      answer:
        "Yes, the Digital Self-Loading Platform and mobile app provide real-time fuel activity reports, card loading, and transaction tracking.",
    },
    {
      question: "What are your pricing and service charges (any hidden fees)?",
      answer:
        "Tiered, percentage-based monthly service charge on total funded amount: Starter (1–10 cards) – 5%/month, Growth (11–49 cards) – 4.5%/month, Enterprise (50–100+ cards) – 3%/month. No hidden charges, transparent fee structure.",
    },
    {
      question: "What documents are required and how long does onboarding take?",
      answer:
        "Onboarding includes account profile creation, fleet contact verification, quick card issuance, and full training for card users and fleet contacts. Specific document requirements aren't detailed in the proposal, so this may need direct confirmation from the team.",
    },
    {
      question: "Can a lost or stolen card be blocked immediately?",
      answer:
        "Yes, cards are PIN-protected with fraud protection measures, including reporting lost or stolen cards for prompt resolution.",
    },
    {
      question: "Why should we choose AgileFlex over other fuel card providers?",
      answer:
        "Nationwide coverage (2,400+ stations), zero failed transactions, real-time insights, custom-branded cards, 24/7 support, tiered pricing that scales down as your fleet grows, and backing from partners like Providus Bank, WEMA Bank, and VERVE.",
    },
    {
      question: "Can we start with a pilot program before a full rollout?",
      answer:
        "Yes — the Starter Tier (1–10 cards) is explicitly designed for small teams or pilot programs.",
    },
  ],
};

// Site-wide footer content (CTA panel, contact info, link columns, legal row)
export const footerContent: FooterContent = {
  ctaEyebrow: "Your Number 1 Fueling Partner",
  ctaHeading: "Na you dey refuel, na we dey show workings.",
  ctaButtonText: "Get in touch",
  ctaButtonHref: "/request",
  brand: "Fueling Agile Solutions",
  address: "ROA Plaza, Journalist Road, Arepo, Ogun State, Nigeria.",
  email: "contact@fuelingagilenigeria.com",
  phone: "+234 706 5587 385, +234 706 699 1031",
  columns: [
    {
      heading: "Product",
      links: [
        { label: "How It Works", href: "/how-it-works" },
        { label: "Our Card", href: "/card" },
        { label: "FAQs", href: "/faqs" },
      ],
    },
    {
      heading: "Solutions",
      links: [
        { label: "Agile Flex Petrolkaart", href: "/solutions/agileflex" },
        { label: "Bespoke Solutions", href: "/solutions/bespoke" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Get in touch", href: "/contact" },
      ],
    },
  ],
  legalLinks: [{ label: "Privacy Policy", href: "/privacy" }],
  copyright: "All rights reserved © 2026 Fueling agile Solutions",
};

// Homepage "latest posts" section header
export const blogSectionContent: BlogSectionContent = {
  eyebrow: "Blogs & Newsletters",
  heading: "A few things worth knowing before you spend",
  ctaText: "Read more",
};

// Homepage newsletter signup, the last section before the footer
export const newsletterContent: NewsletterContent = {
  eyebrow: "Join our newsletter",
  heading: "Get fuel-saving tips before everyone else",
  subheading:
    "Join our newsletter for fuel price updates, money-saving tips, and offers built for businesses like yours.",
  placeholder: "Enter your email",
  buttonText: "Subscribe now",
  consentText:
    "Yes, I'd like to receive newsletters, product updates, and promotional emails from Fueling Agile Solutions.",
};

// Mock blog posts, used whenever WORDPRESS_API_URL isn't configured (see lib/api.ts)
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Trust is the new currency in business, and silence is how you know you've lost it.",
    excerpt:
      "Lorem ipsum dolor sit amet. Libero potenti posuere et quisque amet lacinia ac pulvinar.",
    content:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero potenti posuere et quisque amet lacinia ac pulvinar.</p><p>Trust compounds slowly and disappears fast. For fleet operators, that trust lives in every fuel receipt, every driver check-in, and every naira accounted for.</p>",
    author: "Fueling Agile Nigeria Team",
    date: "2026-06-02",
    slug: "trust-is-the-new-currency-in-business",
    image: { src: "/step-1.jpg", alt: "Support agents onboarding a new fleet account" },
  },
  {
    id: "2",
    title: "What is a fuel system? The question that could save your fleet's budget.",
    excerpt:
      "Lorem ipsum dolor sit amet. Libero potenti posuere et quisque amet lacinia ac pulvinar.",
    content:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero potenti posuere et quisque amet lacinia ac pulvinar.</p><p>A fuel system is more than a tank and a pump, it's every policy, limit, and log that decides where your money actually goes.</p>",
    author: "Fueling Agile Nigeria Team",
    date: "2026-06-20",
    slug: "what-is-a-fuel-system",
    image: { src: "/step-3.jpg", alt: "A vehicle fueling up at a partner gas station" },
  },
  {
    id: "3",
    title: "The AgileFlex PetrolKaart: Smartest asset for Nigerian fleets.",
    excerpt:
      "Lorem ipsum dolor sit amet. Libero potenti posuere et quisque amet lacinia ac pulvinar.",
    content:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero potenti posuere et quisque amet lacinia ac pulvinar.</p><p>The AgileFlex PetrolKaart pays for fuel like a debit card, so every naira your fleet spends is visible the moment it's spent.</p>",
    author: "Fueling Agile Nigeria Team",
    date: "2026-07-01",
    slug: "agileflex-petrolkaart-smartest-asset",
    image: { src: "/step-2.jpg", alt: "Loading funds and setting spending limits on a card" },
  },
];

// Blog index page (/blog) hero copy
export const blogIndexHeroContent: BlogIndexHeroContent = {
  eyebrow: "Our Blog",
  heading: "Essential resources for fleets navigating, monitoring, and controlling fuel costs",
  subheading:
    "Price analysis, operational efficiency, and the insights that protect your margins.",
};

// "Get in touch" page copy — reuses the same phone/chat mockup image as the
// "Tell us about your fleet" How to Get Started card.
export const getInTouchContent: GetInTouchContent = {
  eyebrow: "Get in touch",
  heading: "Talk to a real person about your fuel costs",
  subheading:
    "Tell us about your business. We'll show you exactly where you could be saving.",
  namePlaceholder: "Name",
  fleetSizeOptions: ["1–10 vehicles", "11–49 vehicles", "50–100+ vehicles"],
  phonePlaceholder: "Phone",
  emailPlaceholder: "Company email",
  ctaText: "Talk to our team",
  image: {
    src: "/get-in-touch-phone.png",
    alt: "Chat conversation about setting up a fleet fuel card account",
  },
};
