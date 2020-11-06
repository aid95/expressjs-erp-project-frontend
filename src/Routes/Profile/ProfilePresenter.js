import React from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import ProfileImage from "../../Components/ProfileImage";
import ProfileHeaderUnit from "./Units/ProfileHeaderUnit";

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
  font-size: 17px;
  padding: 20px 40px;
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
  width: 40%;
`;

const ContentList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const ContentListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 15px 10px;

  &:not(:last-child) {
    border-bottom: 1px solid #0000000f;
  }
`;

const ContentListItemThumbnailWrapper = styled.div`
  padding: 10px 20px 10px 5px;
  font-size: 52px;
`;

const ContentListItemInfoWrapper = styled.div``;

const ContentListItemTitle = styled.p`
  font-size: 32px;
  font-weight: 400;
  margin-bottom: 8px;
`;

const ContentListItemSubText = styled.span`
  font-size: 16px;
  font-weight: 200;
  margin-top: 8px;
`;

const ContentDetail = styled.div`
  width: 60%;
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
          <ContentListItem>
            <ContentListItemThumbnailWrapper>
              💵
            </ContentListItemThumbnailWrapper>
            <div>
              <ContentListItemTitle>
                2020년 10월 급여 명세서
              </ContentListItemTitle>
              <ContentListItemSubText>
                2020년 11월 02일 작성 됨
              </ContentListItemSubText>
            </div>
          </ContentListItem>
          <ContentListItem>
            <ContentListItemThumbnailWrapper>
              💵
            </ContentListItemThumbnailWrapper>
            <ContentListItemInfoWrapper>
              <ContentListItemTitle>
                2020년 09월 급여 명세서
              </ContentListItemTitle>
              <ContentListItemSubText>
                2020년 10월 02일 작성 됨
              </ContentListItemSubText>
            </ContentListItemInfoWrapper>
          </ContentListItem>
        </ContentList>
      </ContentListWrapper>
      <ContentDetail></ContentDetail>
    </ContentWrapper>
  </Container>
);

export default ProfilePresenter;
