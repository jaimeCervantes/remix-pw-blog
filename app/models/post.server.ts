import { graphqlClient } from '~/apollo';
import { gql } from '@apollo/client';
import type { ApolloQueryResult } from '@apollo/client';
import { POST_SLUG_AND_TITLE } from '~/apollo/fragments';

import type { Post  } from './post';

export async function getPosts(): Promise<ApolloQueryResult<{ posts: Array<Post>}>> {
  return await graphqlClient.query({
    query: gql`
      query {
        posts: getPosts {
          slug
          title
        }
      }
    `
  });
}

export async function getPost(slug: string): Promise<ApolloQueryResult<{ post: Post }>>{
  return await graphqlClient.query({
    query: gql`
      ${POST_SLUG_AND_TITLE}
      query($slug: String!) {
        post: getPost(slug: $slug) {
          ...PostSlugAndTitle
          content
        }
      }
    `,
    variables: {
      slug
    }
  });
}

export async function createPost(post: Pick<Post, "title" | "slug" | "content" | "userId">) {
  return await graphqlClient.mutate({
    mutation: gql`
      mutation($post: PostInput!) {
        createPost(post: $post) {
          slug
          createdAt
        }
      }
    `,
    variables: { post }
  });
}

