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
        <figure className="mx-auto max-w-screen-md text-center">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt ?? ""}
              fill={true}
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          {post.coverImageAlt ? (
            <figcaption className="mt-3 text-sm text-gray-500">
              {post.coverImageAlt}
            </figcaption>
          ) : null}
        </figure>
      ) : null}
      <article className="prose md:prose-lg mx-auto mt-12 font-serif prose-headings:font-sans prose-headings:font-semibold prose-figcaption:font-sans">
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </div>
  );
}
