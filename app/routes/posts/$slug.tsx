import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';
import { getPost } from '~/models/post.server';
import type { Post } from '~/models/post.server';
import invariant from 'tiny-invariant';
import { marked } from 'marked';
import type { ApolloQueryResult } from '@apollo/client';

type LoaderData = {
  post: Post,
  html: string
}

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, 'params.slug is required');
  
  const { data: { post } }: ApolloQueryResult<{ post: Post}> = await getPost(params.slug);
  
  invariant(post, `Post not found: ${params.slug}`);
  return json<LoaderData>({ post, html: marked(post.content) });
};

export default function PostSlug() {
  const { post, html } = useLoaderData<LoaderData>();

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">
       {post.title}
      </h1>
        <section dangerouslySetInnerHTML={{ __html: html }}>

        </section>
    </main>
  );
}