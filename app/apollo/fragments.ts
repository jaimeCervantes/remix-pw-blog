import { gql } from "@apollo/client";


export const POST_SLUG_AND_TITLE = gql`
  fragment PostSlugAndTitle on Post {
    slug
    title
  }
`;