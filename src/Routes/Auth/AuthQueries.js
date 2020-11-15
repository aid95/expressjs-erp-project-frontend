import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $email: String!
    $username: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $birthDay: String!
  ) {
    createAccount(
      email: $email
      username: $username
      password: $password
      firstName: $firstName
      lastName: $lastName
      birthDay: $birthDay
    )
  }
`;
