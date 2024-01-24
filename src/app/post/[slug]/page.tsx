import Image from "next/image";
import React from "react";

import { api } from "@/lib/ghost";

import "./post.css";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await api.posts.read(
    { slug: params.slug },
    { formats: ["html"] },
  );

  return {
    title: post.meta_title ?? post.og_title ?? post.title,
    description:
      post.meta_description ?? post.og_description ?? post.excerpt ?? "",
  };
}

export async function generateStaticParams() {
  const posts = await api.posts.browse({
    limit: "all",
  });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const Post = async ({ params }: { params: { slug: string } }) => {
  const post = await api.posts.read(
    { slug: params.slug },
    { formats: ["html"] },
  );

  return (
    <div>
      <div className="flex flex-col justify-center text-center">
        <div className="relative h-[600px]">
          <Image
            src={post.feature_image ?? ""}
            alt={post.feature_image_alt ?? ""}
            fill={true}
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        <p
          className="mt-5 text-gray-500"
          dangerouslySetInnerHTML={{
            __html: post.feature_image_caption ?? "",
          }}
        />
      </div>
      <article className="prose lg:prose-xl mx-auto mt-12">
        <h1>{post.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: post.html ?? "",
          }}
          className="[&>a]:text-black [&>a]:hover:text-blue-500 [&>a]:visited:text-purple-500 [&>.kg-image-card]:max-w-full [&>.kg-image-card]:mx-auto [&>.kg-image]:my-5 [&>.kg-image]:shadow-md [&>.kg-image]:rounded-md [&>.kg-image]:overflow-hidden [&>.kg-image]:object-cover [&>.kg-image]:object-center"
        />
      </article>
    </div>
  );
};

export default Post;
