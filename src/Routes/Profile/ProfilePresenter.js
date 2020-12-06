import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import ProfileHeaderUnit from "./Units/ProfileHeaderUnit";
import { DailyJournalContent } from "./Units/ContentParts/DailyJournalTabContent";
import { MailContent } from "./Units/ContentParts/MailTabContent";
import { ApprovalDocContent } from "./Units/ContentParts/ApprovalDocTabContent";
import { PayStubTabContent } from "./Units/ContentParts/PayStubTabContent";
import { ChatContent } from "./Units/ContentParts/ChatTabContent";
import { HRTabContent } from "./Units/ContentParts/HRTabContent";
import { DeptTabContent } from "./Units/ContentParts/DeptTabContent";
import { useQuery } from "@apollo/client";
import { ME } from "../../SharedQueries";

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

// Menubar CSS
const MenubarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  const [me, setMe] = useState([]);
  useQuery(ME, {
    onCompleted: (d) => {
      setMe(d.me);
    },
  });

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
          {me.rank && me.rank.title === "대표" ? (
            <>
              <SubMenuLink onClick={() => setSubMenu("hrMenu")}>
                <MenubarListItem selected={subMenu === "hrMenu"}>
                  인사
                </MenubarListItem>
              </SubMenuLink>
              <SubMenuLink onClick={() => setSubMenu("deptMenu")}>
                <MenubarListItem selected={subMenu === "deptMenu"}>
                  부서
                </MenubarListItem>
              </SubMenuLink>
            </>
          ) : (
            <></>
          )}
        </MenubarList>
      </MenubarWrapper>

      {subMenu === "defaultMenu" && <DailyJournalContent />}
      {subMenu === "mailMenu" && <MailContent />}
      {subMenu === "docsMenu" && <ApprovalDocContent />}
      {subMenu === "payStubMenu" && <PayStubTabContent />}
      {subMenu === "chatMenu" && <ChatContent />}
      {subMenu === "hrMenu" && <HRTabContent />}
      {subMenu === "deptMenu" && <DeptTabContent />}
    </Container>
  );
};

export default ProfilePresenter;
