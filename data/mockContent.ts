export interface HeroContent {
  headline: string;
  subheadline: string;
  primaryCtaText: string;
  secondaryCtaText: string;
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

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  slug: string;
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
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export const heroContent: HeroContent = {
  headline: "One fuel card that stops your business from wasting money.",
  subheadline:
    "Load money onto your card, set limits for each driver, and give your team access to over 2,400 fueling stations across Nigeria.",
  primaryCtaText: "Request fuel cards",
  secondaryCtaText: "Chat with our team",
};

export const dashboardImage: DashboardImage = {
  src: "/platform.png",
  alt: "AgileFlex PetrolKaart fleet overview dashboard showing active vehicles, card balances, and live tracking",
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Why Agile Adoption Is Accelerating Across Nigerian Tech",
    excerpt:
      "From Lagos to Abuja, more teams are ditching rigid waterfall processes for iterative, feedback-driven delivery. Here's what's driving the shift.",
    author: "Fueling Agile Nigeria Team",
    date: "2026-06-02",
    slug: "why-agile-adoption-is-accelerating-in-nigeria",
  },
  {
    id: "2",
    title: "Scrum vs. Kanban: Choosing the Right Framework for Your Team",
    excerpt:
      "Not every Agile framework fits every team. We break down the practical differences between Scrum and Kanban and how to pick the right one.",
    author: "Fueling Agile Nigeria Team",
    date: "2026-06-20",
    slug: "scrum-vs-kanban-choosing-the-right-framework",
  },
];
