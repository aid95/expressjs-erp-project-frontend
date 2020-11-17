import React from "react";
import styled from "styled-components";
import { isLoggedIn } from "../utils";

export const ContentList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const ContentListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 15px 10px;
  background-color: ${(props) => (props.isSelected ? "#adb3" : "#fff")};
  &:not(:last-child) {
    border-bottom: 1px solid #0000000f;
  }
`;

const ContentListItemThumbnailWrapper = styled.div`
  padding: 10px 20px 10px 5px;
  font-size: 28px;
`;

const ContentListItemInfoWrapper = styled.div``;

const ContentListItemTitle = styled.p`
  font-size: 21px;
  font-weight: 400;
  margin-bottom: 8px;
  cursor: pointer;
`;

const ContentListItemSubText = styled.span`
  font-size: 14px;
  font-weight: 200;
  margin-top: 8px;
`;

export const ContentListItemComp = ({
  id,
  emoji,
  title,
  subtext,
  onClick,
  isSelected,
}) => (
  <ContentListItem isSelected={isSelected}>
    <ContentListItemThumbnailWrapper>{emoji}</ContentListItemThumbnailWrapper>
    <ContentListItemInfoWrapper>
      <ContentListItemTitle id={id} onClick={onClick}>
        {title}
      </ContentListItemTitle>
      <ContentListItemSubText>{subtext}</ContentListItemSubText>
    </ContentListItemInfoWrapper>
  </ContentListItem>
);
