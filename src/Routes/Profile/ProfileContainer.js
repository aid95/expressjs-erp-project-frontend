import React from "react";
import ProfilePresenter from "./ProfilePresenter";

const ProfileContainer = () => {
  return (
    <ProfilePresenter
      fullName={"Byeongju Shin"}
      email={"juraffe@github.com"}
      department={"S/W engineer"}
      rank={"CTO"}
      username={"juraffe"}
      birthDay={"1995-12-06"}
      phoneNumber={"010-1234-1234"}
    />
  );
};

export default ProfileContainer;
