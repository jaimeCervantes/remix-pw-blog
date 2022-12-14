import { json } from "@remix-run/node";
import { Link, useLoaderData, useCatch } from "@remix-run/react";
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
      <section
        data-testid="post-list"
        className="grid grid-cols-mainList gap-4"
      >
        {posts.map((item: Post) => (
          <Link to={`../posts/${item.slug}`} key={item.slug} className="block">
            <article
              data-testid="post-item"
              className="gradient-border-primary gradient-border-primary-br h-[100%] break-words shadow dark:shadow-none"
            >
              <div className="p-3">
                <h4>{item.title}</h4>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </>
  );
}

export function ErrorBoundary({ error }: any) {
  return (
    <>
      <h1 className="text-3xl">Something went wrong!</h1>
      <section>
        <p>{error.message}</p>
        <pre>{error.stack}</pre>
      </section>
    </>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <>
      <h1 className="text-9xl">{caught.status}</h1>
      <h2 className="text-3xl">Ocurrio un error</h2>
      <p>{caught.data}</p>
    </>
  );
}
