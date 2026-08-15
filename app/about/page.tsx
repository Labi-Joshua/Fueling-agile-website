// About page: company story hero + narrative/video section.
import AboutHero from "@/components/ui/AboutHero";
import AboutStory from "@/components/ui/AboutStory";
import { aboutHeroContent, aboutStoryContent } from "@/data/mockContent";

export default function AboutPage() {
  return (
    <>
      {/* Page hero: heading + decorative stroke graphic behind the video */}
      <AboutHero content={aboutHeroContent} strokeImageSrc="/about-hero-stroke.png" />

      {/* Company story copy alongside the playable video */}
      <AboutStory content={aboutStoryContent} />
    </>
  );
}
