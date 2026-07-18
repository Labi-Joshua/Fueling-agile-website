import type { BlogPost } from "@/data/mockContent";

export interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
      <h2 className="mb-8 text-2xl font-bold text-brand-900 sm:text-3xl">
        Latest Insights
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.id}
            className="flex flex-col gap-4 rounded-2xl border border-brand-900/10 p-8"
          >
            <h3 className="text-xl font-normal text-brand-900">{post.title}</h3>
            <p className="text-sm text-brand-900/70">{post.excerpt}</p>
            <div className="mt-4 flex items-center gap-4 text-xs text-brand-900/50">
              <span>{post.author}</span>
              <span>&middot;</span>
              <time dateTime={post.date}>{post.date}</time>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
