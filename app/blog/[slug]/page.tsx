// Individual blog post page, dynamically routed by slug (e.g. /blog/my-post).
// Fetches a single post from WordPress (or mock data fallback) and renders its HTML content.
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/api";

export interface BlogPostPageProps {
  // Next.js 15 passes route params as a Promise that must be awaited.
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  // No matching post (bad slug, or post removed from CMS) → render the 404 page.
  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <h1 className="text-3xl font-semibold text-brand-900 sm:text-4xl">{post.title}</h1>
      <p className="mt-3 text-sm text-brand-900/50">
        {post.author} &middot; <time dateTime={post.date}>{post.date}</time>
      </p>

      {/* Post body is raw HTML from WordPress; `prose` (Tailwind Typography) styles it */}
      <div
        className="prose prose-neutral mt-10 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
