import Link from "next/link";
import type { PostSummary } from "@/lib/api";

export interface BlogCardProps {
  post: PostSummary;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex flex-col gap-3 rounded-2xl border border-brand-900/10 p-6 transition-colors hover:border-brand-500/40"
    >
      <h2 className="text-sm font-medium leading-snug text-brand-900">{post.title}</h2>
      <p className="text-xs leading-relaxed text-brand-900/50">{post.excerpt}</p>
      <time dateTime={post.date} className="text-xs text-brand-900/40">
        {post.date}
      </time>
    </Link>
  );
}
