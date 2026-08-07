import { getAllPosts } from "@/lib/api";
import BlogIndexHero from "@/components/ui/BlogIndexHero";
import FeaturedBlogPost from "@/components/ui/FeaturedBlogPost";
import BlogCard from "@/components/ui/BlogCard";
import { blogIndexHeroContent } from "@/data/mockContent";

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const [featuredPost, ...restPosts] = posts;

  return (
    <>
      <BlogIndexHero content={blogIndexHeroContent} />

      <div className="mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-8">
        {featuredPost && (
          <div className="border-b border-brand-900/10 pb-16">
            <FeaturedBlogPost post={featuredPost} />
          </div>
        )}

        {restPosts.length > 0 && (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 pt-16 sm:grid-cols-2 md:grid-cols-3">
            {restPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
