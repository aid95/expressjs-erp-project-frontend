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
`;

const ApproversWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ApproversList = styled.ul`
  display: flex;
`;

const ApproversItem = styled.li`
  &:not(:last-child) {
    content: " >> ";
  }
`;

const DocFootWrapper = styled.div``;

const ApproveDoc = (data) => {
  const {
    data: { id, subject, content, createdAt, approvers },
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
      <ApproversWrapper>
        <ApproversList>
          {approvers.map(({ approver }) => {
            console.log(approver);
            const { username, rank, department } = approver;
            return <ApproversItem>{username}</ApproversItem>;
          })}
        </ApproversList>
      </ApproversWrapper>
      <DocFootWrapper></DocFootWrapper>
    </Container>
  );
};

export default ApproveDoc;
