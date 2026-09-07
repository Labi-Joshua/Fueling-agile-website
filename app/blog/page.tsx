// Blog index page: lists posts from WordPress (or mock data fallback). The
// newest few posts rotate through a featured carousel on the left; the rest
// fill a "Recent stories" grid on the right.
import { getAllPosts } from "@/lib/api";
import BlogIndexHero from "@/components/ui/BlogIndexHero";
import FeaturedPostCarousel from "@/components/ui/FeaturedPostCarousel";
import BlogCard from "@/components/ui/BlogCard";
import { blogIndexHeroContent } from "@/data/mockContent";

// How many of the newest posts rotate through the featured carousel.
const FEATURED_COUNT = 3;

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const featuredPosts = posts.slice(0, FEATURED_COUNT);
  const recentPosts = posts.slice(FEATURED_COUNT);
  const [firstRow, secondRow] = [recentPosts.slice(0, 2), recentPosts.slice(2, 4)];

  return (
    <>
      <BlogIndexHero content={blogIndexHeroContent} />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-4 pb-24 pt-16 sm:px-8 lg:grid-cols-2 lg:gap-24">
        {/* Featured carousel — only rendered once there's at least one post */}
        {featuredPosts.length > 0 && <FeaturedPostCarousel posts={featuredPosts} />}

        {/* Remaining posts, two per row with a divider between rows */}
        {recentPosts.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-brand-900">Recent stories</h2>

            <div className="mt-6 flex flex-col divide-y divide-brand-900/10">
              {firstRow.length > 0 && (
                <div className="grid grid-cols-2 gap-8 pb-8">
                  {firstRow.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
              {secondRow.length > 0 && (
                <div className="grid grid-cols-2 gap-8 pt-8">
                  {secondRow.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
