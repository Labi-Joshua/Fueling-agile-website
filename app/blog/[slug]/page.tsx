import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/api";

export interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <h1 className="text-3xl font-semibold text-brand-900 sm:text-4xl">{post.title}</h1>
      <p className="mt-3 text-sm text-brand-900/50">
        {post.author} &middot; <time dateTime={post.date}>{post.date}</time>
      </p>

      <div
        className="prose prose-neutral mt-10 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
