import React, { useState } from "react";
import AuthPresenter from "../Auth/AuthPresenter";

const DashboardContainer = () => {
  const [action, setAction] = useState("main");
  return <AuthPresenter action={action} setAction={setAction} />;
};

export default DashboardContainer;
