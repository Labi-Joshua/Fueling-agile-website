// Homepage: assembles every marketing section in the order they appear on the page.
import Hero from "@/components/ui/Hero";
import FuelPriceBanner from "@/components/ui/FuelPriceBanner";
import ScrollHighlightText from "@/components/ui/ScrollHighlightText";
import HowItWorks from "@/components/ui/HowItWorks";
import FeatureRows from "@/components/ui/FeatureRows";
import WhyUs from "@/components/ui/WhyUs";
import FaqAccordion from "@/components/ui/FaqAccordion";
import BlogList from "@/components/ui/BlogList";
import Newsletter from "@/components/ui/Newsletter";
import { getAllPosts } from "@/lib/api";
import {
  heroContent,
  dashboardImage,
  statsContent,
  howItWorksContent,
  featuresContent,
  whyUsContent,
  faqContent,
  blogSectionContent,
  newsletterContent,
  depotPrices,
} from "@/data/mockContent";

export default async function Home() {
  // Blog posts come from WordPress when WORDPRESS_API_URL is configured,
  // otherwise lib/api.ts silently falls back to the mock posts below.
  const posts = await getAllPosts();

  return (
    <>
      {/* Live fuel-price ticker strip, sits above the hero, links to /pricing.
          Renders these mock prices immediately, then refreshes from /api/fuel-prices
          via TanStack Query (top-5-cheapest-verified filtering happens inside the component). */}
      <FuelPriceBanner initialPrices={depotPrices} href="/pricing" />

      {/* Main hero: headline, CTAs, dashboard screenshot mockup */}
      <Hero content={heroContent} dashboardImage={dashboardImage} />

      {/* Scroll-scrubbed headline that highlights word-by-word as the user scrolls */}
      <ScrollHighlightText
        text={`${statsContent.headingEmphasis}${statsContent.headingRest}`}
      />

      {/* Animated stat counters (2,400+ stations, 24/7 support, etc.) + CTA,
          then the "How to Get Started" walkthrough — HowItWorks renders
          StatsSection itself so both can pin together as one block while the
          walkthrough's steps cycle (see HowItWorks.tsx for why). */}
      <HowItWorks content={howItWorksContent} statsContent={statsContent} />

      {/* Alternating image/text rows showcasing each product/solution */}
      <FeatureRows content={featuresContent} />

      {/* "Why Fueling Agile?" trust-point walkthrough — same pinned
          scroll-crossfade mechanism as the "How to Get Started" section above. */}
      <WhyUs content={whyUsContent} />

      {/* Frequently asked questions accordion */}
      <FaqAccordion content={faqContent} />

      {/* Latest blog posts preview grid */}
      <BlogList content={blogSectionContent} posts={posts} />

      {/* Newsletter signup card, last section before the footer */}
      <Newsletter content={newsletterContent} />
    </>
  );
}
