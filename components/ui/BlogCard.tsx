import Link from "next/link";
import Image from "next/image";
import type { PostSummary } from "@/lib/api";

export interface BlogCardProps {
  post: PostSummary;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-4">
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-500/10">
        {post.image ? (
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-xs text-brand-900/30">Fueling Agile Solutions</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-base font-semibold leading-snug text-brand-900 group-hover:text-brand-500">
          {post.title}
        </h2>
        <p className="line-clamp-2 text-sm leading-relaxed text-brand-900/50">{post.excerpt}</p>

        <div className="mt-2 flex items-center gap-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-[10px] font-semibold text-brand-500">
            {post.author.charAt(0)}
          </span>
          <span className="text-xs text-brand-900/60">{post.author}</span>
          <span className="text-xs text-brand-900/30">&middot;</span>
          <time dateTime={post.date} className="text-xs text-brand-900/40">
            {formatDate(post.date)}
          </time>
        </div>

        <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-orange-500">
          Read more
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
      </div>
    </Link>
  );
}
