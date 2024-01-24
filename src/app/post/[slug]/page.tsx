import { api } from "@/lib/ghost";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await api.posts.read(
    { slug: params.slug },
    { formats: ["html"] }
  );

  return {
    title: post.meta_title ?? post.og_title ?? post.title,
    description:
      post.meta_description ?? post.og_description ?? post.excerpt ?? "",
  };
}

const Post = async ({ params }: { params: { slug: string } }) => {
  const post = await api.posts.read(
    { slug: params.slug },
    { formats: ["html"] }
  );

  return (
    <div>
      <article className="prose mx-auto">
        <h1>{post.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: post.html ?? "",
          }}
        />
      </article>
    </div>
  );
};

export default Post;
