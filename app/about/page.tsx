import AboutHero from "@/components/ui/AboutHero";
import AboutStory from "@/components/ui/AboutStory";
import { aboutHeroContent, aboutStoryContent } from "@/data/mockContent";

export default function AboutPage() {
  return (
    <>
      <AboutHero content={aboutHeroContent} strokeImageSrc="/about-hero-stroke.png" />
      <AboutStory content={aboutStoryContent} />
    </>
  );
}
