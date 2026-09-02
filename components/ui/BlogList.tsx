"use client";

// Homepage "latest posts" preview grid, showing up to a few post cards with a
// "Read more" CTA below (links out to the full /blog index).
import type { BlogSectionContent } from "@/data/mockContent";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

export interface BlogListPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}

export interface BlogListProps {
  content: BlogSectionContent;
  posts: BlogListPost[];
}

export default function BlogList({ content, posts }: BlogListProps) {
  const sectionRef = useFadeInOnScroll<HTMLElement>();

  return (
    <section ref={sectionRef} className="mx-auto max-w-[1536px] px-4 pb-16 pt-36 sm:px-8 sm:pt-44">
      <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
        {content.eyebrow}
      </span>
      <h2 className="mt-3 text-2xl font-semibold text-brand-900 sm:text-3xl">
        {content.heading}
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="flex flex-col gap-4">
            {/* Placeholder brand-mark thumbnail (posts here don't carry featured images) */}
            <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-brand-500/10 p-4 sm:p-5">
              <span className="flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
                  <path d="M14 1L26 7.5V20.5L14 27L2 20.5V7.5L14 1Z" fill="#f97316" />
                  <path d="M2 7.5L14 14V27L2 20.5V7.5Z" fill="#10b981" />
                  <path d="M26 7.5L14 14V27L26 20.5V7.5Z" fill="#dc2626" />
                  <path d="M14 4.5L22.5 9V19L14 23.5L5.5 19V9L14 4.5Z" fill="#0f172a" />
                </svg>
                <span className="text-[8px] font-medium leading-tight text-brand-900/70">
                  Fueling Agile
                  <br />
                  Solutions.
                </span>
              </span>
            </div>

            <div>
              <h3 className="text-sm font-medium leading-snug text-brand-900">
                {post.title.length > 60 ? `${post.title.slice(0, 57)}...` : post.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-brand-900/50">
                {post.excerpt}
              </p>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        className="mt-10 rounded-full bg-brand-500 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
      >
        {content.ctaText}
      </button>
    </section>
  );
}
