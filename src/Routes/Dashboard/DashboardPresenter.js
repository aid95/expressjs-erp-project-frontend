import React from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;

const DashboardPresenter = ({ action, setAction }) => (
  <Wrapper>
    {action === "" && (
      <>
        <Helmet>
          <title>Dashboard | ERP Monitor</title>
        </Helmet>
      </>
    )}
  </Wrapper>
);

export default DashboardPresenter;
