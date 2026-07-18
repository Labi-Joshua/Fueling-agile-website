import Hero from "@/components/ui/Hero";
import ScrollHighlightText from "@/components/ui/ScrollHighlightText";
import StatsSection from "@/components/ui/StatsSection";
import BlogList from "@/components/ui/BlogList";
import { heroContent, dashboardImage, statsContent, blogPosts } from "@/data/mockContent";

export default function Home() {
  return (
    <>
      <Hero content={heroContent} dashboardImage={dashboardImage} />
      <ScrollHighlightText
        text={`${statsContent.headingEmphasis}${statsContent.headingRest}`}
      />
      <StatsSection content={statsContent} />
      <BlogList posts={blogPosts} />
    </>
  );
}
