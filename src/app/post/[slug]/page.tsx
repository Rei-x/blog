import Image from "next/image";
import { notFound } from "next/navigation";

import { getAllSlugs, getPostBySlug } from "@/lib/posts";

type Params = { slug: string };

export async function generateMetadata(props: { params: Promise<Params> }) {
  const { slug } = await props.params;
  try {
    const post = await getPostBySlug(slug);
    return {
      title: post.title,
      description: post.excerpt,
    };
  } catch {
    return {};
  }
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Post(props: { params: Promise<Params> }) {
  const { slug } = await props.params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <div className="mt-10">
      {post.coverImage ? (
        <div className="flex flex-col justify-center text-center">
          <div className="relative h-[600px]">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt ?? ""}
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </div>
          {post.coverImageAlt ? (
            <p className="mt-5 text-gray-500">{post.coverImageAlt}</p>
          ) : null}
        </div>
      ) : null}
      <article className="prose lg:prose-xl mx-auto mt-12 prose-headings:font-sans font-serif prose-headings:font-semibold prose-figcaption:font-sans">
        <h1 className="prose">{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </div>
  );
}
