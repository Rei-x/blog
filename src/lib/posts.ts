import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  coverImageAlt?: string;
  contentHtml: string;
};

type PostMeta = Omit<Post, "contentHtml">;

const postsDirectory = path.join(process.cwd(), "content", "posts");

async function readPostFile(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const raw = await fs.readFile(fullPath, "utf8");
  return matter(raw);
}

function toMeta(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: String(data.title ?? ""),
    date: String(data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    coverImage:
      typeof data.coverImage === "string" ? data.coverImage : undefined,
    coverImageAlt:
      typeof data.coverImageAlt === "string" ? data.coverImageAlt : undefined,
  };
}

export async function getAllSlugs(): Promise<string[]> {
  const entries = await fs.readdir(postsDirectory);
  return entries
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const slugs = await getAllSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { data } = await readPostFile(slug);
      return toMeta(slug, data);
    }),
  );
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const { data, content } = await readPostFile(slug);
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);
  return {
    ...toMeta(slug, data),
    contentHtml: processed.toString(),
  };
}
