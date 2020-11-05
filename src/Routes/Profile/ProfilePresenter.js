import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ContentWrapper = styled.div``;

const ProfilePresenter = ({
  fullName,
  username,
  email,
  birthDay,
  department,
  rank,
}) => (
  <Container>
    <ProfileWrapper>
      <div>profile image</div>
      <div>
        <p>full name</p>
        <p>department / rank</p>
      </div>
      <div>
        <p>email</p>
        <p>email</p>
      </div>
    </ProfileWrapper>
    <div>
      <div></div>
      <div></div>
    </div>
  </Container>
);

export default ProfilePresenter;
