// WordPress (WPGraphQL) data-fetching layer for the blog.
//
// The live CMS may not be configured (WORDPRESS_API_URL unset) or a request may fail —
// in either case every exported function here silently falls back to the mock blog
// posts in data/mockContent.ts, so the rest of the app never has to know which
// source it's getting data from.
import { GraphQLClient, gql } from "graphql-request";
import { blogPosts } from "@/data/mockContent";

// Shape used for the blog index / listing pages (no full HTML content).
export interface PostSummary {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  image?: { src: string; alt: string };
}

// Shape used for a single blog post page, including the full rendered HTML body.
export interface PostDetail {
  title: string;
  slug: string;
  content: string;
  date: string;
  author: string;
}

// `client` is null whenever WORDPRESS_API_URL isn't set — every fetch function
// below checks this and routes to the mock data functions instead.
const endpoint = process.env.WORDPRESS_API_URL;
const client = endpoint ? new GraphQLClient(endpoint) : null;

export function isWordPressConfigured(): boolean {
  return Boolean(endpoint);
}

// WordPress excerpts come back wrapped in <p> tags; strip markup for plain-text use.
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

// --- Mock data fallbacks (used whenever WordPress isn't configured or a request fails) ---

function mockAllPosts(): PostSummary[] {
  return blogPosts.map((post) => ({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    date: post.date,
    author: post.author,
    image: post.image,
  }));
}

function mockPostBySlug(slug: string): PostDetail | null {
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return null;

  return {
    title: post.title,
    slug: post.slug,
    content: post.content,
    date: post.date,
    author: post.author,
  };
}

// --- Live WordPress GraphQL queries ---

const ALL_POSTS_QUERY = gql`
  query AllPosts {
    posts {
      nodes {
        title
        slug
        excerpt
        date
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

interface AllPostsResponse {
  posts: {
    nodes: {
      title: string;
      slug: string;
      excerpt: string;
      date: string;
      author: { node: { name: string } };
      featuredImage: { node: { sourceUrl: string; altText: string } } | null;
    }[];
  };
}

const POST_BY_SLUG_QUERY = gql`
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      slug
      content
      date
      author {
        node {
          name
        }
      }
    }
  }
`;

interface PostBySlugResponse {
  post: {
    title: string;
    slug: string;
    content: string;
    date: string;
    author: {
      node: {
        name: string;
      };
    };
  } | null;
}

// Fetches every post for the blog index page. Falls back to mock data if
// WordPress isn't configured, or if the live request throws for any reason.
export async function getAllPosts(): Promise<PostSummary[]> {
  if (!client) {
    return mockAllPosts();
  }

  try {
    const data = await client.request<AllPostsResponse>(ALL_POSTS_QUERY);
    return data.posts.nodes.map((node) => ({
      title: node.title,
      slug: node.slug,
      excerpt: stripHtml(node.excerpt),
      date: node.date,
      author: node.author.node.name,
      image: node.featuredImage
        ? { src: node.featuredImage.node.sourceUrl, alt: node.featuredImage.node.altText }
        : undefined,
    }));
  } catch (error) {
    console.error("Failed to fetch posts from WordPress, falling back to mock data:", error);
    return mockAllPosts();
  }
}

// Fetches a single post by slug for the /blog/[slug] page. Returns null if no
// post matches (triggers a 404 in the calling page).
export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  if (!client) {
    return mockPostBySlug(slug);
  }

  try {
    const data = await client.request<PostBySlugResponse>(POST_BY_SLUG_QUERY, { slug });
    if (!data.post) return null;

    return {
      title: data.post.title,
      slug: data.post.slug,
      content: data.post.content,
      date: data.post.date,
      author: data.post.author.node.name,
    };
  } catch (error) {
    console.error("Failed to fetch post from WordPress, falling back to mock data:", error);
    return mockPostBySlug(slug);
  }
}
