import { gql } from "apollo-boost";

export const ME = gql`
  {
    me {
      id
      fullName
      username
      email
      department {
        title
      }
      rank {
        title
      }
      birthDay
    }
  }
`;

export const SEARCH_USERS = gql`
  query searchUser($term: String!) {
    searchUser(term: $term) {
      id
      username
      fullName
    }
  }
`;
