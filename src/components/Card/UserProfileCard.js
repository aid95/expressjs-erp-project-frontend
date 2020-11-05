import React from "react";
import styled from "styled-components";
import ProfileImage from "../ProfileImage";
import PropTypes from "prop-types";
import { Mail, Chat } from "../Icons";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 230px;
  background-color: white;
  margin: 10px;
  border-radius: 5px;
`;

const FullNameField = styled.span`
  font-size: 23px;
  font-weight: 400;
  padding: 15px 0 10px 0;
`;

const UsernameField = styled.span``;

const DeptRankWrapper = styled.div`
  padding: 10px 0;
`;

const DeptSpan = styled.span``;

const RankSpan = styled.span``;

const ButtonList = styled.ul`
  display: flex;
  margin-top: 10px;
`;

const ButtonItem = styled.li`
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const UserProfileCard = ({ fullName, username, dept, rank }) => (
  <Card>
    <ProfileImage
      width={100}
      height={100}
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR83eWW-GnKYYQTMPhZOkEpdsg_YeXifFrPPg&usqp=CAU"
      alt="profile image"
    />
    <FullNameField>{fullName}</FullNameField>
    <UsernameField>@{username}</UsernameField>
    <DeptRankWrapper>
      <RankSpan>{rank}</RankSpan>
      <DeptSpan> #{dept}</DeptSpan>
    </DeptRankWrapper>
    <ButtonList>
      <ButtonItem>
        <Mail size={21} />
      </ButtonItem>
      <ButtonItem>
        <Chat size={21} />
      </ButtonItem>
    </ButtonList>
  </Card>
);

UserProfileCard.propTypes = {
  fullName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  dept: PropTypes.string.isRequired,
  rank: PropTypes.string.isRequired,
};

export default UserProfileCard;
