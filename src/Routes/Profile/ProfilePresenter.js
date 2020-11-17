import React from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import ProfileHeaderUnit from "./Units/ProfileHeaderUnit";
import ProfileContentUnit from "./Units/ProfileContentUnit";
import { SEE_DOC_APPROVALS, SEE_FULL_DOC_APPROVAL } from "./ProfileQueries";

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
  font-size: 16px;
  padding: 20px 20px;
  border-bottom: ${(props) =>
    props.selected === true ? `2px solid #32aa46` : "none"};
`;

const SubMenuLink = styled.a`
  color: ${(props) => props.theme.blackColor};
  cursor: pointer;
`;

const ProfilePresenter = ({ subMenuState }) => {
  //
  const { setSubMenu, subMenu } = subMenuState;

  return (
    <Container>
      <Helmet>
        <title>Profile | ERP Monitor</title>
      </Helmet>

      <ProfileHeaderUnit />

      <MenubarWrapper>
        <MenubarList>
          <SubMenuLink onClick={() => setSubMenu("defaultMenu")}>
            <MenubarListItem selected={subMenu === "defaultMenu"}>
              업무
            </MenubarListItem>
          </SubMenuLink>
          <SubMenuLink onClick={() => setSubMenu("payStubMenu")}>
            <MenubarListItem selected={subMenu === "payStubMenu"}>
              급여
            </MenubarListItem>
          </SubMenuLink>
          <SubMenuLink onClick={() => setSubMenu("docsMenu")}>
            <MenubarListItem selected={subMenu === "docsMenu"}>
              결재
            </MenubarListItem>
          </SubMenuLink>
          <SubMenuLink onClick={() => setSubMenu("mailMenu")}>
            <MenubarListItem selected={subMenu === "mailMenu"}>
              쪽지
            </MenubarListItem>
          </SubMenuLink>
          <SubMenuLink onClick={() => setSubMenu("chatMenu")}>
            <MenubarListItem selected={subMenu === "chatMenu"}>
              채팅
            </MenubarListItem>
          </SubMenuLink>
        </MenubarList>
      </MenubarWrapper>

      <ProfileContentUnit menuName={subMenu} />
    </Container>
  );
};

export default ProfilePresenter;
