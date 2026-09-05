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
  primaryCtaText: string;
  secondaryCtaText: string;
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
  eyebrow: string;
  title: string;
  subtitle: string;
  tabs: FeatureTab[];
}

// A single value-proposition card in the "Why Us" section. `theme` picks the
// panel's background treatment, same palette as HowItWorksStep (see
// THEME_PANEL in WhyUs.tsx).
export interface TrustPoint {
  title: string;
  description: string;
  image: { src: string; alt: string };
  theme: "green" | "lavender" | "mint";
}

export interface WhyUsContent {
  eyebrow: string;
  heading: string;
  subtitle: string;
  primaryCtaText: string;
  secondaryCtaText: string;
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

// A single sub-bullet nested inside a lettered PrivacyPolicyListItem, e.g.
// "Contact Information: Name, email address..." under the lettered "Personal
// Information" item — always rendered with a bullet, one level deeper than
// its lettered parent.
export interface PrivacyPolicyListSubitem {
  label?: string;
  text: string;
}

// A single item in a Privacy Policy list block, e.g. "a. Personal
// Information: This refers to..." — `label` is the bold lead-in, `subitems`
// covers the cases (Personal Information, Usage Information, Service
// Providers) where a lettered item has its own nested bulleted list.
export interface PrivacyPolicyListItem {
  label?: string;
  text: string;
  subitems?: PrivacyPolicyListSubitem[];
}

// A single content block within a Privacy Policy section, in source-document
// order: a plain paragraph, a bold standalone lead-in (e.g. "Legal Basis"), or
// a list. Lists are lettered (a, b, c...) by default, matching the source
// document, except the closing "Contact Us" list, which has no markers.
export interface PrivacyPolicyBlock {
  type: "paragraph" | "subheading" | "list";
  label?: string; // paragraph only — bold lead-in before the paragraph text, e.g. "Personal Information"
  text?: string; // paragraph and subheading
  listStyle?: "lettered" | "plain"; // list only; defaults to "lettered"
  items?: PrivacyPolicyListItem[]; // list only
}

// A single section of the Privacy Policy page (e.g. "Information We Collect").
// `number` is omitted for the unnumbered Terms of Usage sections that follow
// the 11 numbered Privacy Policy sections in the source document.
export interface PrivacyPolicySection {
  heading: string;
  number?: number;
  blocks: PrivacyPolicyBlock[];
}

// A run of intro text that's either plain or bold, e.g. ["This Privacy Policy
// explains how ", {bold: "Fueling Agile Solutions"}, " or ", ...] — lets the
// intro paragraphs carry the same inline emphasis as the source document.
export type PrivacyPolicyTextRun = string | { bold: string };

// Privacy Policy page (route: /privacy) — linked from the footer's legal row.
// Content is transcribed verbatim from the company's official Terms of
// Service & Privacy Policy document (effective November 11, 2025) so it must
// be updated here, not paraphrased, if that source document changes.
export interface PrivacyPolicyContent {
  eyebrow: string;
  heading: string;
  effectiveDate: string;
  intro: PrivacyPolicyTextRun[][]; // one array of runs per paragraph
  sections: PrivacyPolicySection[];
}

// "Request fuel cards" modal — opened from every "Request fuel cards" CTA
// button site-wide (Hero, HowItWorks, WhyUs, StatsSection) via
// RequestFuelCardModalProvider. No backend wired up yet — submitting just
// prevents the native page reload until one is connected.
export interface RequestFuelCardModalContent {
  eyebrow: string;
  heading: string;
  subheading: string;
  companyNameLabel: string;
  companyNamePlaceholder: string;
  representativeNameLabel: string;
  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  cardTypeLabel: string;
  cardTypePlaceholder: string;
  cardTypeOptions: string[];
  vehicleCountLabel: string;
  vehicleCountOptions: string[];
  vehicleInfoLabel: string;
  vehicleMakePlaceholder: string;
  vehicleModelPlaceholder: string;
  registrationPlaceholder: string;
  submitText: string;
}

// Agile Flex solutions page (/solutions/fuel-cards): "See it all in one
// place" reporting-platform showcase — eyebrow/heading/subheading above a
// single dashboard screenshot in a colored panel (same visual language as a
// single HowItWorks step, but static).
export interface ReportingShowcaseContent {
  eyebrow: string;
  heading: string;
  subheading: string;
  image: { src: string; alt: string };
}

// A single pricing tier card on the Agile Flex solutions page.
export interface PricingTier {
  name: string;
  vehicleRange: string;
  pricePercent: string;
  features: string[];
  ctaText: string;
  highlighted: boolean;
}

export interface PricingTiersContent {
  eyebrow: string;
  heading: string;
  subheading: string;
  tiers: PricingTier[];
}

// A single persona card in the Agile Flex solutions page's "who it's for" grid.
export interface Persona {
  title: string;
  description: string;
  image: { src: string; alt: string };
}

export interface PersonaGridContent {
  eyebrow: string;
  heading: string;
  personas: Persona[];
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
  subtitle: "Start using the AgileFlex PetrolKaart in four simple steps.",
  primaryCtaText: "Request fuel cards",
  secondaryCtaText: "Schedule a demo",
  steps: [
    {
      theme: "green",
      title: "Tell us about your fleet",
      description:
        "Share how many vehicles or drivers you have, and we'll set up your account and assign a card to each one in minutes. No paperwork pile-up, no waiting weeks to get started.",
      image: { src: "/how-it-works-fleet-chat.png", alt: "Chat conversation setting up a new fleet account" },
    },
    {
      theme: "lavender",
      title: "Fund & Control",
      description:
        "Load money onto each card, then set exactly how much it can spend, daily, weekly, or monthly. Once the limit is set, no card can go past it, so your budget stays your budget.",
      image: { src: "/how-it-works-fund-control.png", alt: "Illustration of cash, a wallet, and coins representing card funding limits" },
    },
    {
      theme: "mint",
      title: "Fuel Anywhere",
      description:
        "Your card works at 2,400+ stations across the country, so wherever a delivery, trip, or job takes your team, they can fuel up without detours or delays.",
      image: { src: "/how-it-works-fuel-anywhere.png", alt: "Illustration of vehicles fueling up at a gas station" },
    },
    {
      theme: "green",
      title: "See Everything, Instantly",
      description:
        "The moment a card is used, it shows up on your dashboard, who spent it, where, and how much. No chasing receipts, no waiting until month-end to find out what happened.",
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
    " for Nigerian businesses that want to have accurate visibility into how much they spend on fuel every month.",
  stats: [
    { value: "2400+", label: "Gas Stations Nationwide" },
    { value: "24/7", label: "Customer Support" },
    { value: "30 mins", label: "Cards are funded in 30mins" },
  ],
  ctaText: "Request fuel cards",
};

// Homepage auto-advancing feature tabs (AgileFlex / Virtual Volume / Bespoke)
export const featuresContent: FeaturesContent = {
  eyebrow: "Our Solutions",
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
  heading: "Here's why businesses trust us",
  subtitle:
    "It's not only in how we protect your fuel money, but also in how far we reach, how fast we show up, and how honest our numbers are.",
  primaryCtaText: "Request fuel cards",
  secondaryCtaText: "Schedule a demo",
  points: [
    {
      theme: "green",
      title: "Nationwide Coverage",
      description:
        "Wherever your business operates, our card works there too, at 2,400+ stations across the country.",
      image: { src: "/trust-1.png", alt: "Map of Nigeria highlighting nationwide coverage" },
    },
    {
      theme: "green",
      title: "Fast, Reliable Support",
      description:
        "When something goes wrong, we don't leave you waiting. Quick, dependable help, every time.",
      image: { src: "/trust-2.png", alt: "Illustration representing fast, reliable support" },
    },
    {
      theme: "green",
      title: "Real Security",
      description:
        "PIN protection, instant card blocking, and bonded operations, so your money stays safe.",
      image: { src: "/trust-3.png", alt: "Illustration representing account and card security" },
    },
    {
      theme: "green",
      title: "Transparent Pricing, No Surprises",
      description:
        "No hidden charges, no fine-print deductions. What you see on your tier is what you pay, and your rate only gets better as your fleet grows.",
      image: { src: "/trust-4.png", alt: "Illustration representing transparent, tiered pricing" },
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
  ctaText: "Contact us",
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
  ctaButtonText: "Contact us",
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
        { label: "Contact us", href: "/contact" },
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
  ctaText: "Contact us",
  image: {
    src: "/get-in-touch-phone.png",
    alt: "Chat conversation about setting up a fleet fuel card account",
  },
};

// Privacy Policy page copy (route: /privacy), linked from the footer's legal row.
// Transcribed verbatim, section-for-section, from the company's official
// "Terms of Service & Privacy Policy" document (effective November 11, 2025)
// — both halves of that document, in its exact order: the 11 numbered Privacy
// Policy sections, followed by the unnumbered Terms of Usage sections. Update
// this to match if that source document changes; don't paraphrase it here.
const privacyPolicyContactEmail = footerContent.email;
const privacyPolicyContactPhone = "07066991030";

export const privacyPolicyContent: PrivacyPolicyContent = {
  eyebrow: "Terms of Service & Privacy Policy",
  heading: "Privacy Policy",
  effectiveDate: "11th November, 2025",
  intro: [
    [
      "This Privacy Policy explains how ",
      { bold: "Fueling Agile Solutions" },
      " or ",
      { bold: "Fueling Agile Nigeria Limited" },
      " (\"Fueling Agile\", \"we\", \"us\", or \"our\") collects, uses, discloses, stores, and protects personal data belonging to individuals who interact with us, including those who visit our website, use our fuel card and real-time fuel management platform, engage our customer support channels, or otherwise access our products and services.",
    ],
    [
      "Fueling Agile is committed to handling your personal information responsibly and in compliance with the ",
      { bold: "Nigeria Data Protection Act (NDPA) 2023" },
      ", as well as other applicable data protection and privacy laws within Nigeria. By accessing our website, using our services, or communicating with us, ",
      { bold: "you acknowledge that you have read, understood, and agree to the practices described in this Privacy Policy" },
      " regarding the collection, processing, storage, and disclosure of your personal data.",
    ],
  ],
  sections: [
    {
      number: 1,
      heading: "Information We Collect",
      blocks: [
        {
          type: "paragraph",
          text: "We collect Personal Data from You when You interact with us, such as when You visit our website, complete an inquiry form, request our services, subscribe to our communications, or participate in a survey. In the course of delivering our Services, we may also collect additional information necessary for Service delivery.",
        },
        { type: "paragraph", text: "The Personal Data we collect and use may include, amongst other things:" },
        {
          type: "list",
          items: [
            {
              label: "Personal Information",
              text: "This refers to any information that identifies you as an individual. Examples include:",
              subitems: [
                { label: "Contact Information", text: "Name, email address, postal address, phone number, company name." },
                { label: "Professional Information", text: "Job title, industry, company size, professional certifications, skills, and experience." },
                { label: "Demographic Information", text: "Age, gender, location (city, state, country)." },
                {
                  label: "Financial Information",
                  text: "(If applicable, and with explicit consent and security measures) Credit card details, bank account information, billing address (for paid services only). We use secure payment gateways and do not store sensitive financial information directly on our servers.",
                },
                { label: "Communications Data", text: "Records of communications you have with us, including emails, phone calls, chat logs, and social media interactions." },
                { label: "Feedback and Survey Responses", text: "Information you provide in surveys, feedback forms, and reviews." },
                {
                  label: "Training and Event Data",
                  text: "Information related to your participation in our training courses, workshops, conferences, and other events, including attendance records, course completion certificates, and performance data.",
                },
                { label: "Application Data", text: "Information provided when applying for a job or internship with Fueling Agile, including your resume/CV, cover letter, and references." },
              ],
            },
            {
              label: "Usage Information",
              text: "This refers to data automatically collected about your interactions with our website and services. Examples include:",
              subitems: [
                { label: "Log Data", text: "IP address, browser type, operating system, referring URL, pages visited, date and time of visit, and search terms." },
                {
                  label: "Cookies and Similar Technologies",
                  text: "We use cookies, web beacons, and other tracking technologies to collect information about your browsing activity on our website. This may include information about the links you click, the pages you view, and the length of time you spend on our website. We use this information to personalize your experience, analyze trends, and improve our website and services. You can control cookies through your browser settings (see section 6 below).",
                },
                { label: "Device Information", text: "Type of device, device ID, operating system version, and unique device identifiers." },
                {
                  label: "Location Information",
                  text: "(If applicable, and with explicit consent) We may collect your location information through your device's location services if you provide consent. This information may be used to provide location-based services or personalize your experience.",
                },
              ],
            },
            {
              label: "Aggregated and Anonymized Data",
              text: "We may collect, use, and share aggregated and anonymized data for various purposes. This data does not identify you individually.",
            },
          ],
        },
      ],
    },
    {
      number: 2,
      heading: "How We Use Your Information",
      blocks: [
        { type: "paragraph", text: "We use your personal information for the following purposes:" },
        { type: "subheading", text: "Legal Basis" },
        {
          type: "list",
          items: [
            { label: "Contractual obligations", text: "We collect data that are necessary to fulfil our contractual obligations entered or to be entered into with you." },
            {
              label: "Legitimate interests",
              text: "We may use your personal data where it is necessary to conduct our business and pursue our legitimate interests, for example to prevent fraud and enable us to give you the best and most secure customer experience. Your fundamental rights, freedoms and the interests are considered primarily, consequently data collection is compatible with other lawful basis of processing as provided under the NDPA 2023.",
            },
            { label: "Legal obligation", text: "We may use your personal data where it is necessary for compliance with a legal obligation that we are subject to. We will identify the relevant legal obligation when we rely on this legal basis." },
            { label: "Consent", text: "We rely on consent only where we have obtained your active agreement to use your personal data for a specified purpose, for example if you subscribe to an email newsletter." },
          ],
        },
        { type: "paragraph", text: "The following are the legal basis for the use of your personal data:" },
        {
          type: "list",
          items: [
            {
              label: "Providing and Improving Our Services",
              text: "To operate, maintain, and improve our website and services; to personalize your experience; to provide customer support; to process payments; to fulfil your requests; and to develop new features and functionalities.",
            },
            {
              label: "Communication",
              text: "To communicate with you about our services, events, updates, promotions, and other information that may be of interest to you. We may use email, phone, SMS, or postal mail to contact you. You can opt out of receiving marketing communications from us at any time.",
            },
            {
              label: "Marketing and Advertising",
              text: "To display targeted advertisements and personalized content on our website and other platforms. We may use your information to create custom audiences for marketing campaigns.",
            },
            { label: "Analytics", text: "To analyze trends and usage patterns on our website and services. This helps us understand how our services are being used and how we can improve them." },
            { label: "Recruitment", text: "To process your job application and assess your qualifications for employment with Fueling Agile." },
            { label: "Legal Compliance", text: "To comply with applicable laws, regulations, and legal processes." },
            { label: "Security", text: "To protect the security and integrity of our website and services; to prevent fraud and abuse; and to enforce our terms of service." },
            {
              label: "Training and Development",
              text: "To manage and deliver training courses, workshops, and events; to track attendance and performance; and to issue course completion certificates.",
            },
            { label: "Business Operations", text: "To conduct internal business operations, such as accounting, auditing, and data analysis." },
          ],
        },
      ],
    },
    {
      number: 3,
      heading: "How We Share Your Information",
      blocks: [
        { type: "paragraph", text: "We may share your personal information with the following categories of recipients:" },
        {
          type: "list",
          items: [
            {
              label: "Service Providers",
              text: "We share your information with third-party service providers who help us operate our website, provide our services, process payments, send communications, and perform other business functions. These service providers are contractually obligated to protect your information and use it only for the purposes for which we disclose it to them. Examples include:",
              subitems: [
                { text: "Payment processors (e.g., Verve)" },
                { text: "Email marketing providers (e.g., Mailchimp, SendGrid)" },
                { text: "Hosting providers (e.g., AWS, Google Cloud)" },
                { text: "Analytics providers (e.g., Google Analytics)" },
                { text: "Customer relationship management (CRM) systems (e.g., Salesforce, HubSpot)" },
              ],
            },
            {
              label: "Business Partners",
              text: "We may share your information with our business partners to offer you joint products or services, or to conduct joint marketing activities. We will only share your information with business partners who have agreed to protect your information in accordance with this Privacy Policy.",
            },
            { label: "Affiliates", text: "We may share your information with our affiliates for internal business purposes, such as data analysis and marketing." },
            {
              label: "Legal Authorities",
              text: "We may disclose your information to legal authorities if required by law or legal process, or if we believe that such disclosure is necessary to protect our rights, property, or safety, or the rights, property, or safety of others.",
            },
            {
              label: "Business Transfers",
              text: "In the event that we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our website of any change in ownership or control of your personal information.",
            },
            { label: "With Your Consent", text: "We may share your information with other parties with your consent." },
          ],
        },
      ],
    },
    {
      number: 4,
      heading: "Data Security",
      blocks: [
        { type: "paragraph", text: "We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. These measures include:" },
        {
          type: "list",
          items: [
            { label: "Encryption", text: "We use encryption to protect sensitive information transmitted online." },
            { label: "Firewalls", text: "We use firewalls to protect our servers from unauthorized access." },
            { label: "Access Controls", text: "We restrict access to personal information to authorized employees and service providers." },
            { label: "Regular Security Assessments", text: "We conduct regular security assessments to identify and address potential vulnerabilities." },
            { label: "Data Minimization", text: "We only collect and retain the minimum amount of personal information necessary to achieve the purposes described in this Privacy Policy." },
          ],
        },
        {
          type: "paragraph",
          text: "However, no method of transmission over the internet, or method of electronic storage, is 100% secure. Therefore, while we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.",
        },
      ],
    },
    {
      number: 5,
      heading: "Data Retention",
      blocks: [
        {
          type: "paragraph",
          text: "We retain your personal information for as long as necessary to fulfil the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law. We will securely delete or anonymize your personal information when it is no longer needed.",
        },
        {
          type: "paragraph",
          text: "The retention period will vary depending on the type of information and the purpose for which it was collected. For example, we may retain your contact information for as long as you remain a customer or subscriber, and we may retain your financial information for as long as required by accounting and tax laws.",
        },
      ],
    },
    {
      number: 6,
      heading: "Cookies and Similar Technologies",
      blocks: [
        {
          type: "paragraph",
          text: "We use cookies and similar technologies to collect information about your browsing activity on our website. Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are used to remember your preferences, personalize your experience, and track your browsing activity.",
        },
        { type: "paragraph", text: "We use the following types of cookies:" },
        {
          type: "list",
          items: [
            { label: "Essential Cookies", text: "These cookies are necessary for the operation of our website and services. They enable you to access secure areas of our website, use shopping carts, and make payments." },
            {
              label: "Performance Cookies",
              text: "These cookies collect information about how you use our website, such as the pages you visit and the links you click. This information is used to improve the performance of our website and services.",
            },
            {
              label: "Functionality Cookies",
              text: "These cookies are used to remember your preferences and personalize your experience. For example, they may remember your language preferences or your login information.",
            },
            {
              label: "Targeting Cookies",
              text: "These cookies are used to display targeted advertisements and personalized content on our website and other platforms. They may also be used to track your browsing activity across different websites.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "You can control cookies through your browser settings. Most browsers allow you to block or delete cookies, or to be notified when a cookie is being placed on your computer. However, please note that blocking or deleting cookies may affect the functionality of our website and services.",
        },
      ],
    },
    {
      number: 7,
      heading: "Your Rights",
      blocks: [
        { type: "paragraph", text: "You have the following rights regarding your personal information:" },
        {
          type: "list",
          items: [
            { label: "Access", text: "You have the right to request access to the personal information we hold about you." },
            { label: "Correction", text: "You have the right to request that we correct any inaccurate or incomplete personal information we hold about you." },
            { text: "Request erasure of your Personal Data. This enables You to ask us to delete or remove Personal Data where there is no good reason for us continuing to Process it." },
            { label: "Restriction of Processing", text: "You have the right to request that we restrict the processing of your personal information." },
            { label: "Data Portability", text: "You have the right to request that we transfer your personal information to another organization." },
            { label: "Objection", text: "You have the right to object to the processing of your personal information." },
            { label: "Withdrawal of Consent", text: "If we are processing your personal information based on your consent, you have the right to withdraw your consent at any time." },
          ],
        },
        {
          type: "paragraph",
          text: "To exercise any of these rights, please contact us at contact@fuelingagilenigeria.com. We will respond to your request within a reasonable timeframe. We may require you to provide proof of identity before we can fulfil your request.",
        },
      ],
    },
    {
      number: 8,
      heading: "Links to Third-Party Websites",
      blocks: [
        {
          type: "paragraph",
          text: "Our website may contain links to third-party websites. We are not responsible for the privacy practices of these websites. We encourage you to review the privacy policies of these websites before providing them with your personal information.",
        },
      ],
    },
    {
      number: 9,
      heading: "Children's Privacy",
      blocks: [
        {
          type: "paragraph",
          text: "Our website and services are not directed to children under the age of 18. We do not knowingly collect personal information from children under the age of 18. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately.",
        },
      ],
    },
    {
      number: 10,
      heading: "Changes to This Privacy Policy",
      blocks: [
        {
          type: "paragraph",
          text: "We may update this Privacy Policy from time to time. We will post any changes on our website and update the Effective Date at the top of this Privacy Policy. Your continued use of our website and services after the posting of any changes constitutes your acceptance of the revised Privacy Policy. We encourage you to review this Privacy Policy periodically.",
        },
      ],
    },
    {
      number: 11,
      heading: "Contact Us",
      blocks: [
        { type: "paragraph", text: "If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:" },
        {
          type: "list",
          listStyle: "plain",
          items: [
            { text: "Fueling Agile Nigeria Limited" },
            { text: privacyPolicyContactEmail },
            { text: privacyPolicyContactPhone },
          ],
        },
        {
          type: "paragraph",
          text: "By using our website and services, you acknowledge that you have read and understood this Privacy Policy and agree to be bound by its terms.",
        },
      ],
    },
    {
      heading: "Terms of Usage",
      blocks: [
        {
          type: "paragraph",
          text: "This website is primarily intended for general information and linked to our primary products; card monitoring platform and the Reporting Platform. These platforms are only accessible to businesses registered with the Fueling Agile Solutions.",
        },
      ],
    },
    {
      heading: "Ownership of Website",
      blocks: [
        {
          type: "paragraph",
          text: "This website belongs to Fueling Agile Nigerian Ltd a private limited company incorporated under CAMA 2020 with the Corporate Affairs Commission (CAC) in Nigeria. Registered Office: ROA Plaza, Journalist Road, Arepo, Ogun State, Nigeria.",
        },
      ],
    },
    {
      heading: "Intellectual Property",
      blocks: [
        {
          type: "paragraph",
          text: "All website design, text, graphics, images, icons, trademarks, software compilations, underlying source code, and all other materials available on this website (collectively referred to as \"Content\") are the intellectual property of Fueling Agile Solutions or Fueling Agile Nigeria Limited (\"Fueling Agile\"), or are used under valid license from third-party rights holders. All such rights are protected under applicable copyright, trademark, and intellectual property laws.",
        },
        { type: "paragraph", text: "Except as expressly permitted in these Terms of Use or with our prior written consent:" },
        {
          type: "list",
          items: [
            { text: "No part of the Content may be copied, reproduced, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted or distributed in any manner, including for commercial purposes." },
            { text: "You may not modify, reverse engineer, decompile, disassemble, alter, remove, obscure, or tamper with any Content or any security technology embedded within this website." },
            { text: "You may only access and use this website for lawful purposes and solely for non-commercial, personal, informational use." },
          ],
        },
        {
          type: "paragraph",
          text: "All products, features, services, and technologies described on this website are subject to intellectual property rights reserved by Fueling Agile or our licensors.",
        },
        {
          type: "paragraph",
          text: "All names, images, logos, product names, and branding identifying Fueling Agile are proprietary marks and trademarks of Fueling Agile Solutions or Fueling Agile Nigeria Ltd. Nothing contained on this website grants or should be interpreted as granting any license or right to use any Fueling Agile intellectual property without explicit prior written authorisation.",
        },
        {
          type: "paragraph",
          text: "Any unauthorized use of our intellectual property may result in civil and criminal liability under applicable laws.",
        },
      ],
    },
    {
      heading: "Disclaimer and Limitation of Liability",
      blocks: [
        {
          type: "paragraph",
          text: "Whilst Fueling Agile Solutions or Fueling Agile Nigeria Ltd has taken care in preparing the contents of this website, all information, names, images, pictures, logos and icons relating to Fueling Agile Nigeria Ltd and its products and services are provided without any representation, endorsement or warranty of any kind, whether express or implied, including but not limited to warranties of satisfactory quality, fitness for a particular purpose, non-infringement, compatibility, security, or accuracy. To the extent permitted by law, all such warranties are excluded.",
        },
        {
          type: "paragraph",
          text: "Fueling Agile Solutions or Fueling Agile Nigeria Ltd shall not be liable, whether in contract, tort (including negligence) or otherwise, for any loss arising out of or in connection with the use of this website. This includes, without limitation, indirect or consequential losses, loss of profit, loss of anticipated savings, loss of data, loss of revenue, loss of business, loss of opportunity, loss of or damage to property, wasted expenditure, and any third-party claims.",
        },
      ],
    },
  ],
};

// "Request fuel cards" modal copy. Card-type tiers reuse the same
// Starter/Growth/Enterprise names as faqContent's pricing answer so the two
// never describe the tiers differently.
export const requestFuelCardModalContent: RequestFuelCardModalContent = {
  eyebrow: "Request fuel card",
  heading: "Get the AgileFlex PetrolKaart",
  subheading: "Fill the form below to set up your corporate fuel card account in minutes.",
  companyNameLabel: "Name of company or organization",
  companyNamePlaceholder: "Enter name of company or organization",
  representativeNameLabel: "Name of company representative",
  firstNamePlaceholder: "First Name",
  lastNamePlaceholder: "Last Name",
  emailLabel: "Enter a company email address",
  emailPlaceholder: "Email address",
  phoneLabel: "Enter your 11-digit phone number",
  phonePlaceholder: "Mobile number",
  cardTypeLabel: "Choose the type of fuel card",
  cardTypePlaceholder: "Click on the drop down",
  cardTypeOptions: ["Starter (1–10 cards)", "Growth (11–49 cards)", "Enterprise (50–100+ cards)"],
  vehicleCountLabel: "Enter the number of vehicles",
  vehicleCountOptions: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"],
  vehicleInfoLabel: "Vehicle information",
  vehicleMakePlaceholder: "Vehicle make",
  vehicleModelPlaceholder: "Vehicle model",
  registrationPlaceholder: "Registration number",
  submitText: "Submit form",
};

// Agile Flex solutions page (/solutions/fuel-cards) hero copy — reuses
// HeroContent's shape since it's the same eyebrow/headline/subheadline/CTA
// pattern as the homepage hero, just with page-specific copy and no
// ActiveCardsBadge underneath.
export const fuelCardHeroContent: HeroContent = {
  eyebrow: "The Agile Flex Fuel Card",
  headline: "A smarter way to pay for fuel.",
  subheadline:
    "Load money onto your card. Give it to your drivers. Every time they buy fuel, you see it right away, on your phone or computer.",
  primaryCtaText: "Request fuel cards",
  secondaryCtaText: "Schedule a demo",
};

// Agile Flex solutions page hero's two-card graphic.
// TODO: this reuses the homepage's dashboard+card image as a placeholder —
// swap in a dedicated two-card graphic once one is provided.
export const fuelCardHeroImage: DashboardImage = {
  src: "/hero-fleet-card.png",
  alt: "Two AgileFlex PetrolKaart cards",
};

// Agile Flex solutions page: "See it all in one place" reporting showcase
export const reportingShowcaseContent: ReportingShowcaseContent = {
  eyebrow: "The reporting solution",
  heading: "See it all in one place.",
  subheading:
    "One screen shows you every fill-up, by every driver, as it happens. Download a report anytime, with one click. No sign-up needed. No extra fee. It just comes with your card.",
  image: {
    src: "/platform.png",
    alt: "AgileFlex PetrolKaart fleet overview dashboard showing active vehicles, total balance, live tracking, and card balance status",
  },
};

// Agile Flex solutions page: pricing tiers. Reuses the same tier names as
// faqContent's pricing answer, though the per-tier rates shown here reflect
// this page's own design and take precedence if the two ever disagree.
export const pricingTiersContent: PricingTiersContent = {
  eyebrow: "Find what's right for you",
  heading: "However big your fleet is, there's a plan that fits",
  subheading:
    "Whether you're running 5 vehicles or 500, we've got a pricing plan that fits. The more cards you get, the less you pay per card",
  tiers: [
    {
      name: "Starter",
      vehicleRange: "1–10 vehicles",
      pricePercent: "5%",
      features: ["Real-time fuel tracking", "Monthly reports included", "Access to 2,400+ stations"],
      ctaText: "Schedule a demo",
      highlighted: false,
    },
    {
      name: "Growth",
      vehicleRange: "11–49 vehicles",
      pricePercent: "4%",
      features: ["Everything in Starter, plus:", "Lower rate as you grow", "Priority support"],
      ctaText: "Schedule a demo",
      highlighted: true,
    },
    {
      name: "Enterprise",
      vehicleRange: "50–100+ vehicles",
      pricePercent: "3%",
      features: ["Everything in Growth, plus:", "Custom branded cards", "Dedicated account manager"],
      ctaText: "Schedule a demo",
      highlighted: false,
    },
  ],
};

// Agile Flex solutions page: "who it's for" persona grid.
// TODO: each persona needs a dedicated photo — these currently point at
// placeholder image paths that don't exist yet (see PersonaGrid.tsx, which
// renders a neutral fallback block when an image 404s).
export const personaGridContent: PersonaGridContent = {
  eyebrow: "Built for how you work",
  heading: "A fuel solution for whoever's watching the budget",
  personas: [
    {
      title: "Business Owners",
      description:
        "Stop guessing if your fuel budget is being respected. See what was spent, by who, and where. No need to chase anyone for a receipt.",
      image: { src: "/persona-business-owner.jpg", alt: "A business owner standing in his showroom" },
    },
    {
      title: "Fleet & Operations Managers",
      description:
        "Set the rules once, daily limits, role-based access, station restrictions, and let the system enforce them automatically. No more policing every fill-up by hand.",
      image: { src: "/persona-fleet-manager.jpg", alt: "A fleet operations manager reviewing a clipboard near a truck" },
    },
    {
      title: "Finance Teams",
      description:
        "Get monthly electronic reports that reconcile themselves. Painless bookkeeping, transparent fuel structure, no hidden charges.",
      image: { src: "/persona-finance-team.jpg", alt: "Two finance team members reviewing documents at a desk" },
    },
    {
      title: "Enterprise Procurement",
      description:
        "Custom-branded cards, dedicated account managers, and pricing that gets better as your fleet grows. Built to handle 50, 100, or more vehicles without breaking down.",
      image: { src: "/persona-procurement.jpg", alt: "Enterprise procurement staff reviewing inventory in a warehouse" },
    },
  ],
};
