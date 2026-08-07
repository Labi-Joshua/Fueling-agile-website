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
  const posts = await getAllPosts();
  const topFuelPrices = depotPrices
    .filter((row) => row.verified)
    .sort((a, b) => a.price - b.price)
    .slice(0, 5);

  return (
    <>
      <FuelPriceBanner prices={topFuelPrices} href="/pricing" />
      <Hero content={heroContent} dashboardImage={dashboardImage} />
      <ScrollHighlightText
        text={`${statsContent.headingEmphasis}${statsContent.headingRest}`}
      />
      <StatsSection content={statsContent} />
      <HowItWorks content={howItWorksContent} />
      <FeatureTabs content={featuresContent} />
      <TrustedBy content={trustedByContent} logosImageSrc="/trusted-logos-frame.png" />
      <WhyUs content={whyUsContent} />
      <FaqAccordion content={faqContent} />
      <BlogList content={blogSectionContent} posts={posts} />
    </>
  );
}
