import React from "react";
import ProfilePresenter from "./ProfilePresenter";

const ProfileContainer = () => {
  return (
    <ProfilePresenter
      fullName={"신 병주"}
      email={"juraffe@github.com"}
      department={"S/W 개발자"}
      rank={"CTO"}
      username={"juraffe"}
      birthDay={"1995-12-06"}
      phoneNumber={"010-1234-1234"}
    />
  );
};

export default ProfileContainer;
