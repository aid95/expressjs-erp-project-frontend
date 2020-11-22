import React from "react";
import styled from "styled-components";

const UserMsgContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const UserMsgProfileWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 20px;
  border-bottom: 1px solid #e6e6e675;
`;

const FullNameDeco = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 140%;

  color: ${(props) => props.theme.blackColor};

  display: flex;
  align-items: center;
`;

const SubTextDeco = styled.p`
  font-size: ${(props) => props.size || 13}px;
  font-weight: 200;

  display: flex;
  align-items: center;
  height: 30px;

  color: ${(props) => props.theme.darkGreyColor};
`;

const BadgeSubTextDeco = styled(SubTextDeco)`
  background-color: ${(props) => props.theme.greenColor};
  border-radius: 15px;
  color: white;
  padding: 0 10px;
`;

const UserInfoHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UserMsgTitleWrapper = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e6e6e675;
`;

const UserMsgTitle = styled.h1`
  font-size: 18px;
`;

const UserInfoHeadWrapper = styled.div``;

const UserMsgContent = styled.div`
  padding: 20px;
  font-size: 16px;
`;

const UserMessage = (data) => {
  const {
    data: {
      subject,
      content,
      from: { fullName, rank, department },
    },
  } = data;

  return (
    <>
      <UserMsgContainer>
        <UserMsgProfileWrapper>
          <UserInfoHeadWrapper>
            <UserInfoHead>
              <FullNameDeco>{fullName}&nbsp;&nbsp;</FullNameDeco>
              <BadgeSubTextDeco size={13}>
                {rank.title} · {department.title}
              </BadgeSubTextDeco>
            </UserInfoHead>
          </UserInfoHeadWrapper>
        </UserMsgProfileWrapper>
        <UserMsgTitleWrapper>
          <UserMsgTitle>제목 : {subject}</UserMsgTitle>
        </UserMsgTitleWrapper>
        <UserMsgContent>{content}</UserMsgContent>
      </UserMsgContainer>
    </>
  );
};

export default UserMessage;
