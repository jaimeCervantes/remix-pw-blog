import { gql } from '@apollo/client';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { graphqlClient } from '~/apollo/index';

import type { ApolloQueryResult } from '@apollo/client';
import type { Post } from '~/models/post';


type LoaderData = {
  posts: Array<Post>
}

export const loader = async () => {
  const { data }: ApolloQueryResult<LoaderData> = await graphqlClient.query({
    query: gql`
      query {
          posts: getPosts {
            slug
            title
          }
        }
      `
  });

  return json<LoaderData>(data);
};

export default function Posts() {
  const { posts } = useLoaderData() as LoaderData;

  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link
              to={post.slug}
              className="text-blue-600 underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="admin" className="text-red-600 underline">
        Admin
      </Link>
    </main>
  );
}