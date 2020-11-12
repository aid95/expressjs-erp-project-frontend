import { gql } from "apollo-boost";

export const ME = gql`
  {
    me {
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
