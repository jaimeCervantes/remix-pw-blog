import { json } from "@remix-run/node";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { getPost } from "~/models/post.server";
import type { Post } from "~/models/post";
import invariant from "tiny-invariant";
import { marked } from "marked";
import type { ApolloQueryResult } from "@apollo/client";

type LoaderData = {
  post: Post;
  html: string;
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "params.slug is required");

  const {
    data: { post },
  }: ApolloQueryResult<{ post: Post }> = await getPost(params.slug);

  if (!post) {
    throw new Response("Publicación no encontrada", { status: 404 });
  }

  return json<LoaderData>({ post, html: marked(post.content) });
};

export function PostSlug() {
  const { post, html } = useLoaderData<LoaderData>();

  return (
    <>
      <h1 className="text-center">{post.title}</h1>
      <section dangerouslySetInnerHTML={{ __html: html }}></section>
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
  const params = useParams();
  const caught = useCatch();

  return (
    <>
      <h1 className="text-9xl">{caught.status}</h1>
      <h2 className="text-3xl">Publicación "{params.slug}" no existe.</h2>
    </>
  );
}
