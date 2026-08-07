import Link from "next/link";
import Image from "next/image";
import type { PostSummary } from "@/lib/api";

export interface FeaturedBlogPostProps {
  post: PostSummary;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function FeaturedBlogPost({ post }: FeaturedBlogPostProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center md:gap-10"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-500/10 md:aspect-[16/11]">
        {post.image ? (
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-sm text-brand-900/30">Fueling Agile Solutions</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 text-left">
        <h2 className="text-2xl font-semibold leading-snug text-brand-900 group-hover:text-brand-500 sm:text-3xl">
          {post.title}
        </h2>
        <p className="text-sm leading-relaxed text-brand-900/50">{post.excerpt}</p>

        <div className="mt-2 flex items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-xs font-semibold text-brand-500">
            {post.author.charAt(0)}
          </span>
          <span className="text-sm text-brand-900/60">{post.author}</span>
          <span className="text-sm text-brand-900/30">&middot;</span>
          <time dateTime={post.date} className="text-sm text-brand-900/40">
            {formatDate(post.date)}
          </time>
        </div>
      </div>
    </Link>
  );
}
