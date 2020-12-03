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

export const SEND_MESSAGE = gql`
  mutation sendMessage($chatRoomId: String, $toId: String, $message: String!) {
    sendMessage(chatRoomId: $chatRoomId, toId: $toId, message: $message) {
      id
    }
  }
`;

export const GET_DEPARTMENTS = gql`
  {
    departments {
      id
      title
    }
  }
`;

export const GET_RANKS = gql`
  {
    ranks {
      id
      title
    }
  }
`;
