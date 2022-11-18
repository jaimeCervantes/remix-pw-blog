import type { Post } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, Outlet } from "@remix-run/react";
import type { ApolloQueryResult } from '@apollo/client';

import { getPosts } from "~/models/post.server";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader: LoaderFunction = async () => {
  const { data: { posts } }: ApolloQueryResult<{ posts: Array<Post> }> = await getPosts()
  return json({ posts });
};

export default function PostAdmin() {
  const { posts } = useLoaderData<LoaderData>();
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="my-6 mb-2 border-b-2 text-center text-3xl">
        Blog Admin
      </h1>
      <div className="grid grid-cols-4 gap-6">
        <nav className="col-span-4 md:col-span-1">
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  to={`/posts/${post.slug}`}
                  className="text-blue-600 underline"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <main className="col-span-4 md:col-span-3">
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
}