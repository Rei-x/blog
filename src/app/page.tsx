import { api } from "@/lib/ghost";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const posts = await api.posts.browse({
    limit: "all",
  });

  return (
    <>
      <main className="container mx-auto">
        <ul className="flex flex-col gap-8">
          {posts.map((post) => (
            <li
              key={post.id}
              className="card bg-base-100 card-side max-w-lg shadow-sm w-auto"
            >
              {post.feature_image ? (
                <Image
                  src={post.feature_image}
                  alt={post.title ?? ""}
                  width={200}
                  style={{
                    objectFit: "cover",
                  }}
                  height={200}
                />
              ) : null}
              <div className="card-body">
                <Link href={`/post/${post.slug}`}>
                  <h2 className="card-title hover:text-slate-700">
                    {post.title}
                  </h2>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
