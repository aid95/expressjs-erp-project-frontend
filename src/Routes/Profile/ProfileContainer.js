import React, { useState } from "react";
import ProfilePresenter from "./ProfilePresenter";
import { SEE_MAIL } from "./ProfileQueries";

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
