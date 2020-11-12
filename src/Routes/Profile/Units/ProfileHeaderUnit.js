import { useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";

import {
  Cake,
  Document,
  LightTalkBubble,
  MobilePhone,
  Timer,
  WhiteMail,
} from "../../../Components/Icons";
import ProfileImage from "../../../Components/ProfileImage";
import { ME } from "../../../SharedQueries";

const ProfileHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  padding: 10px;
  border-radius: ${(props) => props.theme.borderRadius};
`;

const ProfileInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const UserInfoHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 320px;
  height: 240px;
`;

const UserInfoWrapper = styled.div`
  margin-bottom: 20px;
`;

const UserDetailInfoWrapper = styled.div``;

const FullNameDeco = styled.p`
  font-size: 32px;
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

const ProfileInfoLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
`;

const ProfileInfoRight = styled.div`
  height: 100%;
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileHeaderMenuList = styled.ul`
  display: flex;
  margin-top: 10px;
`;

const ProfileHeaderMenuListItem = styled.li`
  &:not(:last-child) {
    margin-right: 45px;
  }
  opacity: 0.6;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileHeaderUnit = () => {
  const { data, loading } = useQuery(ME);

  return (
    <>
      {!loading && data && data.me && (
        <ProfileHeaderWrapper>
          <ProfileImageWrapper>
            <ProfileImage
              width={180}
              height={180}
              src="https://scontent-nrt1-1.xx.fbcdn.net/v/t1.0-1/p148x148/104424755_3039633629484044_5461704554360702412_n.jpg?_nc_cat=101&ccb=2&_nc_sid=1eb0c7&_nc_ohc=tnW7u5R3wPMAX--esRG&_nc_ht=scontent-nrt1-1.xx&tp=6&oh=2e2fe9b80e599da46b8299464dd1aa48&oe=5FC7DEF4"
              alt="profile image"
            />
          </ProfileImageWrapper>

          <ProfileInfoWrapper>
            <ProfileInfoLeft>
              <UserInfoWrapper>
                <UserInfoHead>
                  <FullNameDeco>{data.me.fullName}&nbsp;&nbsp;</FullNameDeco>
                  <BadgeSubTextDeco size={14}>
                    {data.me.rank.title} · {data.me.department.title}
                  </BadgeSubTextDeco>
                </UserInfoHead>
                <SubTextDeco size={20}>@{data.me.username}</SubTextDeco>
              </UserInfoWrapper>
              <UserDetailInfoWrapper>
                <SubTextDeco>
                  <WhiteMail /> &nbsp;&nbsp;
                  {data.me.email}
                </SubTextDeco>
                <SubTextDeco>
                  <Cake /> &nbsp;&nbsp;
                  {new Date(data.me.birthDay).toDateString()}
                </SubTextDeco>
                <SubTextDeco>
                  <MobilePhone /> &nbsp;&nbsp;
                  {"010-1234-1234"}
                </SubTextDeco>
              </UserDetailInfoWrapper>
            </ProfileInfoLeft>

            <ProfileInfoRight>
              <ProfileHeaderMenuList>
                <ProfileHeaderMenuListItem>
                  <SubTextDeco size={20}>근무 시간</SubTextDeco>
                  <br />
                  <Timer size={64} />
                  <br />
                  <SubTextDeco size={24}>0</SubTextDeco>
                </ProfileHeaderMenuListItem>
                <ProfileHeaderMenuListItem>
                  <SubTextDeco size={20}>결재 대기</SubTextDeco>
                  <br />
                  <Document size={64} />
                  <br />
                  <SubTextDeco size={24}>0</SubTextDeco>
                </ProfileHeaderMenuListItem>
                <ProfileHeaderMenuListItem>
                  <SubTextDeco size={20}>메시지</SubTextDeco>
                  <br />
                  <LightTalkBubble size={64} />
                  <br />
                  <SubTextDeco size={24}>0</SubTextDeco>
                </ProfileHeaderMenuListItem>
              </ProfileHeaderMenuList>
            </ProfileInfoRight>
          </ProfileInfoWrapper>
        </ProfileHeaderWrapper>
      )}
    </>
  );
};

export default ProfileHeaderUnit;
