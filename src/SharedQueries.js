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
