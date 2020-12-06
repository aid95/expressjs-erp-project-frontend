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
      isRead
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
      state
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
      state
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
        approveDate
        acceptComment
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
      user {
        fullName
        id
        username
      }
      createdAt
    }
  }
`;

export const SEE_TASK = gql`
  query seeTask($id: String!) {
    seeTask(id: $id) {
      id
      beginDateTime
      endDateTime
      comment
    }
  }
`;

export const EDIT_TASK = gql`
  mutation editTask(
    $id: String!
    $comment: String
    $beginDate: String
    $endDate: String
    $action: ACTION!
  ) {
    editTask(
      id: $id
      comment: $comment
      beginDate: $beginDate
      endDate: $endDate
      action: $action
    )
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

export const SEE_USERS = gql`
  {
    users {
      id
      fullName
      username
      department {
        title
      }
      rank {
        title
      }
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser(
    $id: String!
    $email: String
    $firstName: String
    $lastName: String
    $basePay: Int
    $rank: String
    $department: String
    $address: String
    $addressDetail: String
    $birthDay: String
    $action: ACTION!
  ) {
    editUser(
      id: $id
      email: $email
      firstName: $firstName
      lastName: $lastName
      basePay: $basePay
      rank: $rank
      department: $department
      address: $address
      addressDetail: $addressDetail
      birthDay: $birthDay
      action: $action
    )
  }
`;

export const SEE_DEPARTMENT = gql`
  query seeDepartment($id: String!) {
    seeDepartment(id: $id) {
      id
      title
      leaderUser {
        id
        fullName
        username
      }
    }
  }
`;

export const SEE_DEPT_USERS = gql`
  query deptUsers($id: String!) {
    deptUsers(id: $id) {
      id
      fullName
      username
      email
    }
  }
`;

export const EDIT_DEPT = gql`
  mutation editDepartment(
    $id: String!
    $title: String
    $leaderUser: String
    $action: ACTIONS!
  ) {
    editDepartment(
      id: $id
      title: $title
      leaderUser: $leaderUser
      action: $action
    )
  }
`;

export const CREATE_DEPARTMENT = gql`
  mutation createDepartment($title: String!) {
    createDepartment(title: $title)
  }
`;

export const SEARCH_USER = gql`
  query searchUser(
    $term: String
    $beginDate: String
    $endDate: String
    $deptName: String
  ) {
    searchUser(
      term: $term
      beginDate: $beginDate
      endDate: $endDate
      deptName: $deptName
    ) {
      id
      fullName
      username
      department {
        title
      }
      rank {
        title
      }
    }
  }
`;

export const SEARCH_MAIL = gql`
  query searchMail($term: String!) {
    searchMail(term: $term) {
      id
      from {
        username
      }
      subject
      content
      createdAt
      isRead
    }
  }
`;
