import Hero from "@/components/ui/Hero";
import BlogList from "@/components/ui/BlogList";
import { heroContent, dashboardImage, blogPosts } from "@/data/mockContent";

export default function Home() {
  return (
    <>
      <Hero content={heroContent} dashboardImage={dashboardImage} />
      <BlogList posts={blogPosts} />
    </>
  );
}
