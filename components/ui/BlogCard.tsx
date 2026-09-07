// A single post card in the blog index page's "Recent stories" grid (all
// posts except the ones in the featured carousel — see
// FeaturedPostCarousel.tsx for that larger treatment).
import Link from "next/link";
import Image from "next/image";
import type { PostSummary } from "@/lib/api";

export interface BlogCardProps {
  post: PostSummary;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-3">
      {/* Featured image, falling back to a plain brand-text placeholder if the post has none */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-500/10">
        {post.image ? (
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            sizes="(min-width: 768px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-xs text-brand-900/30">Fueling Agile Solutions</span>
          </div>
        )}
      </div>

      <span className="inline-flex w-fit items-center rounded-full bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-orange-600">
        {post.category}
      </span>

      <h3 className="text-base font-semibold leading-snug text-brand-900 group-hover:text-brand-500">
        {post.title}
      </h3>

      <span className="flex w-fit items-center gap-1 text-xs font-semibold uppercase tracking-wide text-brand-900/50">
        Read article
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M3 1.5L8.5 6L3 10.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
