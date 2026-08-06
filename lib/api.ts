import { GraphQLClient, gql } from "graphql-request";
import { blogPosts } from "@/data/mockContent";

export interface PostSummary {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
}

export interface PostDetail {
  title: string;
  slug: string;
  content: string;
  date: string;
  author: string;
}

const endpoint = process.env.WORDPRESS_API_URL;
const client = endpoint ? new GraphQLClient(endpoint) : null;

export function isWordPressConfigured(): boolean {
  return Boolean(endpoint);
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function mockAllPosts(): PostSummary[] {
  return blogPosts.map((post) => ({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    date: post.date,
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

const ALL_POSTS_QUERY = gql`
  query AllPosts {
    posts {
      nodes {
        title
        slug
        excerpt
        date
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
    }));
  } catch (error) {
    console.error("Failed to fetch posts from WordPress, falling back to mock data:", error);
    return mockAllPosts();
  }
}

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
