// Homepage: assembles every marketing section in the order they appear on the page.
import Hero from "@/components/ui/Hero";
import FuelPriceBanner from "@/components/ui/FuelPriceBanner";
import ScrollHighlightText from "@/components/ui/ScrollHighlightText";
import StatsSection from "@/components/ui/StatsSection";
import HowItWorks from "@/components/ui/HowItWorks";
import FeatureTabs from "@/components/ui/FeatureTabs";
import TrustedBy from "@/components/ui/TrustedBy";
import WhyUs from "@/components/ui/WhyUs";
import FaqAccordion from "@/components/ui/FaqAccordion";
import BlogList from "@/components/ui/BlogList";
import { getAllPosts } from "@/lib/api";
import {
  heroContent,
  dashboardImage,
  statsContent,
  howItWorksContent,
  featuresContent,
  trustedByContent,
  whyUsContent,
  faqContent,
  blogSectionContent,
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

      {/* Animated stat counters (2,400+ stations, 24/7 support, etc.) + CTA */}
      <StatsSection content={statsContent} />

      {/* 3-step "How to Get Started" illustrated walkthrough */}
      <HowItWorks content={howItWorksContent} />

      {/* Auto-advancing tabs showcasing each product/solution */}
      <FeatureTabs content={featuresContent} />

      {/* Regulatory body logos (DPR / NDPB) trust strip */}
      <TrustedBy content={trustedByContent} logosImageSrc="/trusted-logos-frame.png" />

      {/* "Why Fueling Agile" value-proposition cards */}
      <WhyUs content={whyUsContent} />

      {/* Frequently asked questions accordion */}
      <FaqAccordion content={faqContent} />

      {/* Latest blog posts preview grid */}
      <BlogList content={blogSectionContent} posts={posts} />
    </>
  );
}
