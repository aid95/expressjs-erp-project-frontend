import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DocHeadWrapper = styled.div``;

const DocHead = styled.h1`
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  margin: 20px 10px 60px 10px;
`;

const DocTitleWrapper = styled.div`
  border-bottom: 1px solid #e6e6e675;
  padding: 20px;
`;

const DocTitle = styled.p`
  font-size: 18px;
`;

const DocContentWrapper = styled.div`
  padding: 20px;
  font-size: 16px;
  border-bottom: 1px solid #e6e6e675;
`;

const ApproversWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
`;

const ApproversList = styled.ul`
  display: flex;
`;

const ApproversItem = styled.li`
  border-radius: 5px;
  background-color: ${(props) =>
    props.isPass === true ? props.theme.blueColor : props.theme.darkGreyColor};
  padding: 3px 5px;
  font-size: 11px;
  color: #fff;
`;

const ApprovalDocSubText = styled.p`
  padding: 20px;
`;

const DocFootWrapper = styled.div``;

const ApproveDoc = (data) => {
  const {
    data: { id, subject, drafter, content, approvers },
  } = data;

  return (
    <Container>
      <DocHeadWrapper>
        <DocHead>결 재 결 의 서</DocHead>
      </DocHeadWrapper>
      <DocTitleWrapper>
        <DocTitle>제목 : {subject}</DocTitle>
      </DocTitleWrapper>
      <DocContentWrapper>{content}</DocContentWrapper>
      <ApprovalDocSubText>
        기안자&nbsp;:&nbsp;{drafter.username}
      </ApprovalDocSubText>
      <ApproversWrapper>
        결재자&nbsp;:&nbsp;
        <ApproversList>
          {approvers.map(({ approver, isPass }) => {
            const { username } = approver;
            return (
              <ApproversItem key={id} isPass={isPass}>
                {username}
              </ApproversItem>
            );
          })}
        </ApproversList>
      </ApproversWrapper>
      <DocFootWrapper></DocFootWrapper>
    </Container>
  );
};

export default ApproveDoc;
