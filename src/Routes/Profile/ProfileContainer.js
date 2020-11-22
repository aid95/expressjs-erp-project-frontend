import React, { useState } from "react";
import ProfilePresenter from "./ProfilePresenter";

const ProfileContainer = () => {
  const [subMenu, setSubMenu] = useState("defaultMenu");

  return (
    <ProfilePresenter
      subMenuState={{
        subMenu,
        setSubMenu,
      }}
    />
  );
};

export default ProfileContainer;
