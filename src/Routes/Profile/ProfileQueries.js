import { gql } from "apollo-boost";

export const SEE_MAILS = gql`
  {
    seeMail {
      id
      from {
        username
      }
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

export const SEE_DOC_APPROVALS = gql`
  {
    seeDocApproval {
      id
      subject
      drafter {
        username
      }
      createdAt
    }
  }
`;

export const SEE_FULL_DOC_APPROVAL = gql`
  query seeFullDocApproval($id: String!) {
    seeFullDocApproval(id: $id) {
      id
      drafter {
        username
      }
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

export const SEE_DAILY_JOURNALS = gql`
  {
    dailyJournals {
      id
      createdAt
    }
  }
`;

export const SEE_FULL_DAILY_JOURNAL = gql`
  query dailyJournal($id: String!) {
    dailyJournal(id: $id) {
      id
      createdAt
      user {
        id
        username
      }
      tasks {
        id
        comment
        beginDateTime
        endDateTime
        category {
          title
          parentCategory {
            title
            parentCategory {
              title
            }
          }
        }
      }
    }
  }
`;

export const CREATE_DAILY_JOURNAL = gql`
  mutation createDailyJournal {
    createDailyJournal {
      id
    }
  }
`;

export const SEND_MAIL = gql`
  mutation sendMail($to: String!, $subject: String!, $content: String!) {
    sendMail(to: $to, subject: $subject, content: $content) {
      id
    }
  }
`;
