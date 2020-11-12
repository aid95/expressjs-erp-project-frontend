import { gql } from "apollo-boost";

export const SEE_MAIL = gql`
  {
    seeMail {
      id
      subject
      content
      createdAt
    }
  }
`;

export const SEE_FULL_MAIL = gql`
  query seeFullMail($id: String!) {
    seeFullMail(id: $id) {
      subject
      content
      from {
        fullName
        rank {
          title
        }
        department {
          title
        }
      }
      createdAt
    }
  }
`;

export const SEE_DOC_APPROVAL = gql`
  {
    seeDocApproval {
      id
      subject
      createdAt
    }
  }
`;

export const SEE_FULL_DOC_APPROVAL = gql`
  query seeFullDocApproval($id: String!) {
    seeFullDocApproval(id: $id) {
      id
      subject
      content
      createdAt
      approvers {
        approver {
          username
          rank {
            title
          }
          department {
            title
          }
        }
        isPass
      }
    }
  }
`;
