import React from "react";
import styled from "styled-components";

const ContentTableRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
`;

const ContentTableCell = styled.div`
  width: ${(props) => props.cellWidth}%;
  text-align: ${(props) => (props.center ? "center" : "left")};
`;

const ContentCenterTableCell = styled(ContentTableCell)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

///////////////////////////

const JournalInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 20px 40px;
  border-left: 3px solid ${(props) => props.theme.greenColor};
`;

const Categories = styled.p`
  font-size: 13px;
  color: ${(props) => props.theme.darkGreyColor};
  padding: 3px;
`;

const JournalText = styled.p`
  font-size: 20px;
  padding: 3px;
`;

const DateTimeText = styled.span`
  font-size: 20px;
`;

const JournalItem = ({ categorys, journalText, start, end }) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const subCategory = categorys || "-";
  const middleCategory = subCategory.parentCategory || "-";
  const mainCategory = middleCategory.parentCategory || "-";

  return (
    <ContentTableRow>
      <ContentTableCell cellWidth={60}>
        <JournalInfoWrapper>
          <Categories>
            {mainCategory.title} > {middleCategory.title} > {subCategory.title}
          </Categories>
          <JournalText>{journalText}</JournalText>
        </JournalInfoWrapper>
      </ContentTableCell>
      <ContentCenterTableCell cellWidth={20}>
        <DateTimeText>
          {startDate.getHours()}:{startDate.getMinutes()}
        </DateTimeText>
      </ContentCenterTableCell>
      <ContentCenterTableCell cellWidth={20}>
        <DateTimeText>
          {endDate.getHours()}:{endDate.getMinutes()}
        </DateTimeText>
      </ContentCenterTableCell>
    </ContentTableRow>
  );
};

///////////////////////////

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ContentHeader = styled.div`
  padding-bottom: 30px;
`;

const HeaderTitle = styled.h1`
  text-align: center;
  padding: 20px;
  font-size: 32px;
  font-weight: 600;
`;

const HeaderSubTitle = styled.p`
  text-align: center;
  color: ${(props) => props.theme.darkGreyColor};
`;

const ContentBody = styled.div`
  padding: 20px;
`;

const ContentFooter = styled.div``;

const DailyJournal = ({ data }) => {
  const { id, createdAt, user, tasks } = data;
  return (
    <Container>
      <ContentHeader>
        <HeaderTitle>일일 업무 일지</HeaderTitle>
        <HeaderSubTitle>{new Date(createdAt).toDateString()}</HeaderSubTitle>
      </ContentHeader>
      <ContentBody>
        <ContentTableRow>
          <ContentTableCell center={true} cellWidth={60}>
            업무 내용
          </ContentTableCell>
          <ContentTableCell center={true} cellWidth={20}>
            시작
          </ContentTableCell>
          <ContentTableCell center={true} cellWidth={20}>
            종료
          </ContentTableCell>
        </ContentTableRow>
        {tasks.map((task) => (
          <JournalItem
            categorys={task.category}
            journalText={task.comment}
            start={task.beginDateTime}
            end={task.endDateTime}
          />
        ))}
      </ContentBody>
      <ContentFooter></ContentFooter>
    </Container>
  );
};

export default DailyJournal;
