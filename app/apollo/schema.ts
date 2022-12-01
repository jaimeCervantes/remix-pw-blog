import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Post {
    slug: String
    title: String
    content: String
    userId: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    getPosts: [Post!]!
    getPost(slug: String!): Post
  }

  input PostInput {
    slug: String!
    title: String!
    content: String!
    userId: String
  }

  type Mutation {
    createPost(post: PostInput): Post!
  }
`;
