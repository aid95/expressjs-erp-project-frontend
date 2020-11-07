import React from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import ProfileHeaderUnit from "./Units/ProfileHeaderUnit";
import { ContentList, ContentListItemComp } from "../../Components/ContentList";
import PayStub from "../../Components/Document/PayStub";

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

// Menubar CSS
const MenubarWrapper = styled.div`
  margin: 20px 0;
`;

const MenubarList = styled.ul`
  display: flex;
`;

const MenubarListItem = styled.li`
  font-size: 16px;
  padding: 20px 20px;
  border-bottom: ${(props) =>
    props.selected === true ? `2px solid #32aa46` : "none"};
`;

// Content CSS
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;

  background-color: white;
  padding: 10px;
  border-radius: ${(props) => props.theme.borderRadius};

  padding: 20px;
`;

const ContentTitle = styled.p`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 10px;
`;

const ContentListWrapper = styled.div`
  width: 28%;
`;

const ContentDetail = styled.div`
  width: 72%;
`;

const ProfilePresenter = ({
  fullName,
  username,
  email,
  phoneNumber,
  birthDay,
  department,
  rank,
}) => (
  <Container>
    <Helmet>
      <title>Profile | ERP Monitor</title>
    </Helmet>

    <ProfileHeaderUnit
      fullName={fullName}
      username={username}
      email={email}
      phoneNumber={phoneNumber}
      birthDay={birthDay}
      department={department}
      rank={rank}
    />

    <MenubarWrapper>
      <MenubarList>
        <MenubarListItem selected={false}>업무</MenubarListItem>
        <MenubarListItem selected={true}>급여</MenubarListItem>
        <MenubarListItem selected={false}>결재</MenubarListItem>
        <MenubarListItem selected={false}>쪽지</MenubarListItem>
        <MenubarListItem selected={false}>채팅</MenubarListItem>
      </MenubarList>
    </MenubarWrapper>

    <ContentWrapper>
      <ContentListWrapper>
        <ContentTitle>목록</ContentTitle>
        <ContentList>
          <ContentListItemComp
            emoji={"💵"}
            title={"2020년 09월 급여 명세서"}
            subtext={"2020년 10월 02일 작성 됨"}
          />
        </ContentList>
      </ContentListWrapper>
      <ContentDetail>
        <PayStub />
      </ContentDetail>
    </ContentWrapper>
  </Container>
);

export default ProfilePresenter;
