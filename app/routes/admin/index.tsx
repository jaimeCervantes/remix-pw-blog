import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPosts } from "~/models/post.server";

import type { ApolloQueryResult } from "@apollo/client";
import type { Post } from "~/models/post";
import type { LoaderFunction } from "@remix-run/node";

type LoaderData = Awaited<ReturnType<typeof getPosts>>;

export const loader: LoaderFunction = async () => {
  const result: ApolloQueryResult<{ posts: Array<Post> }> = await getPosts();

  return json(result);
};

export default function AdminIndex() {
  const {
    data: { posts },
  } = useLoaderData<LoaderData>();

  return (
    <>
      <h2>Publicaciones</h2>
      <ul>
        {posts.map((post: { slug: string; title: string }) => (
          <li key={post.slug}>
            <Link
              to={`../posts/${post.slug}`}
              className="text-blue-600 underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
