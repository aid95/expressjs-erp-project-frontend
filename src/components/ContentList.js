import React from "react";
import styled from "styled-components";

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

const ContentListItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentListItemTitle = styled.span`
  max-width: 240px;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 4px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ContentListItemSubText = styled.span`
  max-width: 240px;
  font-size: 14px;
  font-weight: 200;
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ContentListItemComp = ({
  id,
  emoji,
  title,
  subtext,
  onClick,
  isSelected,
}) => (
  <ContentListItem key={id} isSelected={isSelected}>
    <ContentListItemThumbnailWrapper>{emoji}</ContentListItemThumbnailWrapper>
    <ContentListItemInfoWrapper>
      <ContentListItemTitle id={id} onClick={onClick}>
        {title}
      </ContentListItemTitle>
      <ContentListItemSubText>{subtext}</ContentListItemSubText>
    </ContentListItemInfoWrapper>
  </ContentListItem>
);
