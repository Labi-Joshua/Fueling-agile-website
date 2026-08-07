export interface HeroContent {
  headline: string;
  subheadline: string;
  primaryCtaText: string;
  secondaryCtaText: string;
}

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

export interface AboutStoryContent {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  signatureName: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export interface DashboardImage {
  src: string;
  alt: string;
}

export interface HowItWorksStep {
  icon: "truck" | "card" | "fuel";
  description: string;
  image: { src: string; alt: string };
}

export interface HowItWorksContent {
  title: string;
  subtitle: string;
  steps: HowItWorksStep[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface StatsContent {
  headingEmphasis: string;
  headingRest: string;
  stats: Stat[];
  ctaText: string;
}

export interface TrustedLogo {
  name: string;
  subtitle: string;
}

export interface TrustedByContent {
  heading: string;
  logos: TrustedLogo[];
}

export interface FeatureTab {
  label: string;
  description: string;
  image: { src: string; alt: string };
}

export interface FeaturesContent {
  title: string;
  subtitle: string;
  tabs: FeatureTab[];
}

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

export interface PortalSupportContent {
  eyebrow: string;
  heading: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  image: { src: string; alt: string };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  eyebrow: string;
  heading: string;
  items: FaqItem[];
}

export interface FooterLinkColumn {
  heading: string;
  links: { label: string; href: string }[];
}

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

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  slug: string;
}

export interface BlogSectionContent {
  eyebrow: string;
  heading: string;
  ctaText: string;
}

export const navLinks: NavLink[] = [
  { label: "About Us", href: "/about" },
  {
    label: "Our Solutions",
    href: "/solutions",
    children: [
      { label: "Fuel Cards", href: "/solutions/fuel-cards" },
      { label: "Fleet Tracking", href: "/solutions/fleet-tracking" },
      { label: "Telematics", href: "/solutions/telematics" },
    ],
  },
  { label: "Fuel Prices", href: "/pricing" },
  { label: "Our Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export const heroContent: HeroContent = {
  headline: "One fuel card that stops your business from wasting money.",
  subheadline:
    "Load money onto your card, set limits for each driver, and give your team access to over 2,400 fueling stations across Nigeria.",
  primaryCtaText: "Schedule a Demo",
  secondaryCtaText: "Order Fuel Cards",
};

export const aboutHeroContent: AboutHeroContent = {
  eyebrow: "About Us",
  heading: "We're building the infrastructure for smarter fleet management.",
  subheading:
    "We are on a mission to help Nigerian businesses protect their profit margins, eliminate overspending, and take complete control of their fuel operations. Rooted in transparency, we build secure systems that keep your fleet on the move.",
  video: {
    thumbnailAlt: "City skyline at dusk",
  },
};

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

export const dashboardImage: DashboardImage = {
  src: "/platform.png",
  alt: "AgileFlex PetrolKaart fleet overview dashboard showing active vehicles, card balances, and live tracking",
};

export const howItWorksContent: HowItWorksContent = {
  title: "How to Get Started",
  subtitle: "Start using the AgileFlex PetrolKaart in three simple steps.",
  steps: [
    {
      icon: "truck",
      description:
        "Tell us about your fleet. We'll set up your account and assign a card to each driver or vehicle in minutes.",
      image: { src: "/step-1.jpg", alt: "Support agents onboarding a new fleet account" },
    },
    {
      icon: "card",
      description:
        "Load money onto your cards and set spending limits so drivers can only spend what you allow.",
      image: { src: "/step-2.jpg", alt: "Loading funds and setting spending limits on a card" },
    },
    {
      icon: "fuel",
      description:
        "Your drivers fuel up at any of our 2,400+ stations across Nigeria while you watch every transaction on your dashboard in real time.",
      image: { src: "/step-3.jpg", alt: "A vehicle fueling up at a partner gas station" },
    },
  ],
};

export const trustedByContent: TrustedByContent = {
  heading: "Trusted by the bodies that regulate this industry",
  logos: [
    { name: "DPR", subtitle: "Department of Petroleum Resources" },
    { name: "NDPB", subtitle: "Nigeria Data Protection Bureau" },
  ],
};

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

export const featuresContent: FeaturesContent = {
  title: "What we've built to stop fuel costs from draining you",
  subtitle:
    "We offer complete fueling services and custom IT solutions built for your business.",
  tabs: [
    {
      label: "AgileFlex PetrolKaart",
      description:
        "AgileFlex PetrolKaart is a prepaid card that pays for fuel, works like a debit card, so you always see exactly what your business spent and where.",
      image: {
        src: "/tab-agileflex.jpg",
        alt: "AgileFlex PetrolKaart dashboard and physical fuel card",
      },
    },
    {
      label: "Virtual Volume Fuel-Up",
      description:
        "Virtual Volume Fuel-Up lets you order fuel online the way you'd order anything else, then track it until it gets to you.",
      image: {
        src: "/tab-virtual-volume.jpg",
        alt: "Virtual Volume Fuel-Up success screen showing a generated redemption code and QR code",
      },
    },
    {
      label: "Bespoke Solutions",
      description:
        "Bespoke Tech Solutions is where we build custom fuel and business tools designed around exactly how your business runs.",
      image: {
        src: "/tab-bespoke.jpg",
        alt: "Code editor illustration representing custom-built fuel and business tools",
      },
    },
  ],
};

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

export const footerContent: FooterContent = {
  ctaEyebrow: "Your Number 1 Fueling Partner",
  ctaHeading: "Na you dey refuel, na we dey show workings.",
  ctaButtonText: "Schedule a Demo",
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
        { label: "Pricing", href: "/pricing" },
        { label: "Our Card", href: "/card" },
        { label: "FAQs", href: "/faqs" },
      ],
    },
    {
      heading: "Solutions",
      links: [
        { label: "AgileFlex", href: "/solutions/agileflex" },
        { label: "Virtual Volume Fuel Up", href: "/solutions/virtual-volume-fuel-up" },
        { label: "Bespoke Solutions", href: "/solutions/bespoke" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Partners", href: "/partners" },
        { label: "Get in touch", href: "/contact" },
      ],
    },
  ],
  legalLinks: [
    { label: "Terms of service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
  copyright: "All rights reserved © 2026 Fueling agile Solutions",
};

export const blogSectionContent: BlogSectionContent = {
  eyebrow: "Blogs & Newsletters",
  heading: "A few things worth knowing before you spend",
  ctaText: "Read more",
};

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
  },
];
