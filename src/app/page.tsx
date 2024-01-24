import Image from "next/image";
import Link from "next/link";

import { api } from "@/lib/ghost";

export default async function Home() {
  const posts = await api.posts.browse({
    limit: "all",
  });

  return (
    <>
      <main className="mx-auto mt-16 max-w-screen-md">
        <ul className="flex flex-col gap-8">
          {posts

            .map((post, index) => {
              if (index % 2 === 0) {
                return [post, <hr key={index} />];
              }
              return post;
            })
            .flat()

            .map((post) =>
              "slug" in post ? (
                <Link
                  href={`/post/${post.slug}`}
                  key={post.id}
                  className="card card-side rounded-none hover:rounded-xl w-auto max-w-screen-md justify-between overflow-hidden bg-base-100 shadow-sm transition-all"
                >
                  {post.feature_image ? (
                    <Image
                      src={post.feature_image}
                      alt={post.title ?? ""}
                      width={200}
                      style={{
                        objectFit: "cover",
                        minWidth: "200px",
                        height: "200px",
                      }}
                      height={200}
                    />
                  ) : null}
                  <div className="card-body">
                    <time>
                      {new Date(post.published_at ?? "").toLocaleDateString()}
                    </time>
                    <h2 className="card-title">{post.title}</h2>
                    <p className="line-clamp-2 flex-grow-0 text-base-content">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ) : (
                post
              ),
            )}
        </ul>
      </main>
    </>
  );
}
