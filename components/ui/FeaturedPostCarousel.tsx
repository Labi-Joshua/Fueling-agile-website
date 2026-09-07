"use client";

// Blog index page's featured-post carousel: one large post card that cycles
// through a handful of posts via dot indicators or the prev/next arrows,
// sitting alongside the "Recent stories" grid (see BlogCard.tsx for that).
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { PostSummary } from "@/lib/api";

export interface FeaturedPostCarouselProps {
  posts: PostSummary[];
}

export default function FeaturedPostCarousel({ posts }: FeaturedPostCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const post = posts[activeIndex];

  function goTo(index: number) {
    setActiveIndex((index + posts.length) % posts.length);
  }

  if (!post) return null;

  return (
    <div className="flex flex-col gap-4">
      <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-500/10">
          {post.image ? (
            <Image
              src={post.image.src}
              alt={post.image.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-sm text-brand-900/30">Fueling Agile Solutions</span>
            </div>
          )}
        </div>

        <span className="inline-flex w-fit items-center rounded-full bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-orange-600">
          {post.category}
        </span>

        <h2 className="text-2xl font-semibold leading-snug text-brand-900 group-hover:text-brand-500 sm:text-3xl">
          {post.title}
        </h2>

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

      {posts.length > 1 && (
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {posts.map((p, index) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Show featured post ${index + 1}: ${p.title}`}
                aria-current={index === activeIndex}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-6 bg-brand-500" : "w-2 bg-brand-900/15"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous featured post"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-900/10 text-brand-900/60 transition-colors hover:bg-brand-900/5"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M8.5 1.5L3 6L8.5 10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next featured post"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-900/10 text-brand-900/60 transition-colors hover:bg-brand-900/5"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M3 1.5L8.5 6L3 10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
