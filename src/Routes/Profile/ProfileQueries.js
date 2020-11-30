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
      id
      subject
      content
      from {
        id
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
      currentApprover {
        id
        approver {
          id
          username
        }
      }
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
      comment
      rejectReason
      currentApprover {
        id
        approver {
          id
          username
        }
      }
      drafter {
        fullName
        department {
          title
        }
        rank {
          title
        }
        username
      }
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
      createdAt
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

export const MY_SALARIES = gql`
  {
    mySalaries {
      id
      createdAt
    }
  }
`;

export const SEE_PAYMENT_STUB = gql`
  query seeSalary($id: String!) {
    seeSalary(id: $id) {
      monthSalary
      dayShiftAmount
      holidayAmount
      nightShiftAmount
      overtimeAmount
      nationalPension
      healthInsurance
      employmentInsurance
      createdAt
    }
  }
`;

export const MY_COMMUTETIME = gql`
  {
    myCommuteTime {
      workTime
      overWorkTime
      nightShiftTime
      workDateTime
    }
  }
`;

export const CREATE_COMMUTE_TIME = gql`
  mutation createCommuteTime(
    $startDate: String!
    $endDate: String!
    $isHoliday: Boolean
  ) {
    createCommuteTime(
      startDate: $startDate
      endDate: $endDate
      isHoliday: $isHoliday
    ) {
      id
    }
  }
`;

export const SEE_CHAT_ROOMS = gql`
  {
    seeChatRooms {
      id
      participants {
        fullName
      }
      createdAt
    }
  }
`;

export const SEE_CHAT_ROOM = gql`
  query seeChatRoom($id: String!) {
    seeChatRoom(id: $id) {
      id
      messages {
        id
        from {
          id
          fullName
        }
        text
        createdAt
      }
    }
  }
`;
