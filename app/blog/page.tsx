import { getAllPosts } from "@/lib/api";
import BlogCard from "@/components/ui/BlogCard";

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
      <h1 className="text-3xl font-semibold text-brand-900">Blog</h1>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
