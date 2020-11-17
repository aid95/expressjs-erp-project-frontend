import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {
  ContentList,
  ContentListItemComp,
} from "../../../Components/ContentList";
import ApproveDoc from "../../../Components/Form/ApproveDoc";
import UserMessage from "../../../Components/Form/UserMessage";
import {
  SEE_FULL_MAIL,
  SEE_MAILS,
  SEE_DOC_APPROVALS,
  SEE_FULL_DOC_APPROVAL,
  SEE_DAILY_JOURNALS,
  SEE_FULL_DAILY_JOURNAL,
} from "../ProfileQueries";
import DailyJournal from "../../../Components/Form/DailyJournal";

const POLL_INTERVAL = 10000;

const SCROLLBAR_STYLE = styled.div`
  &::-webkit-scrollbar {
    background-color: #fff;
    width: 16px;
  }

  &::-webkit-scrollbar-track {
    background-color: #fff;
  }

  &::-webkit-scrollbar-track:hover {
    background-color: #f4f4f4;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #f1f1f1;
    border-radius: 16px;
    border: 5px solid #fff;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a5;
    border: 4px solid #f4f4f4;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }

  overflow-y: scroll;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 20px;
  max-height: 600px;
`;

const ContentTitle = styled.p`
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #0000000f;
`;

const ContentWrapper = styled.div`
  width: 28%;
  border-right: 1px solid #e6e6e675;
`;

const ContentLeftSide = styled.div``;

const ContentLeftHeader = styled.div``;

const ContentLeftList = styled(SCROLLBAR_STYLE)`
  height: 500px;
`;

const ContentDetail = styled(SCROLLBAR_STYLE)`
  width: 72%;
`;

///////////////////////////////////////

const MailContent = () => {
  const [selectedItemId, setSelectedItemId] = useState("");

  const [queryGetItems, resultGetItems] = useLazyQuery(SEE_MAILS, {
    pollInterval: POLL_INTERVAL,
    fetchPolicy: "network-only",
  });

  const [queryViewItem, resultViewItem] = useLazyQuery(SEE_FULL_MAIL, {
    variables: { id: selectedItemId },
    fetchPolicy: "network-only",
  });

  const onMailClick = async (e) => {
    setSelectedItemId(e.target.id);
  };

  useEffect(() => {
    if (!resultGetItems.called) {
      queryGetItems();
    }
    return () => {};
  });

  useEffect(() => {
    queryViewItem();
    return () => {};
  }, [selectedItemId, queryViewItem]);

  return (
    <ContentContainer>
      <ContentWrapper>
        <ContentLeftSide>
          <ContentLeftHeader>
            <ContentTitle>메일함</ContentTitle>
          </ContentLeftHeader>
          <ContentLeftList>
            <ContentList>
              {!resultGetItems.loading &&
                resultGetItems.data &&
                resultGetItems.data.seeMail &&
                resultGetItems.data.seeMail.map((mail) => (
                  <ContentListItemComp
                    emoji={"📧"}
                    title={mail.subject}
                    subtext={`@${mail.from.username} ${new Date(
                      mail.createdAt
                    ).toDateString()}`}
                    key={mail.id}
                    id={mail.id}
                    onClick={onMailClick}
                    isSelected={selectedItemId === mail.id}
                  />
                ))}
            </ContentList>
          </ContentLeftList>
        </ContentLeftSide>
      </ContentWrapper>

      <ContentDetail>
        {!resultViewItem.loading &&
          resultViewItem.data &&
          resultViewItem.data.seeFullMail && (
            <UserMessage data={resultViewItem.data.seeFullMail} />
          )}
      </ContentDetail>
    </ContentContainer>
  );
};

///////////////////////////////////////

const ApprovalDocContent = () => {
  const [selectedItemId, setSelectedItemId] = useState("");

  const [queryGetItems, resultGetItems] = useLazyQuery(SEE_DOC_APPROVALS, {
    pollInterval: POLL_INTERVAL,
  });

  const [queryViewItem, resultViewItem] = useLazyQuery(SEE_FULL_DOC_APPROVAL, {
    variables: { id: selectedItemId },
  });

  const onApprovalDocClick = async (e) => {
    setSelectedItemId(e.target.id);
  };

  useEffect(() => {
    if (!resultGetItems.called) {
      queryGetItems();
    }
    return () => {};
  });

  useEffect(() => {
    queryViewItem();
    return () => {};
  }, [selectedItemId, queryViewItem]);

  return (
    <ContentContainer>
      <ContentWrapper>
        <ContentLeftSide>
          <ContentLeftHeader>
            <ContentTitle>결재 문서</ContentTitle>
          </ContentLeftHeader>
          <ContentLeftList>
            <ContentList>
              {!resultGetItems.loading &&
                resultGetItems.data &&
                resultGetItems.data.seeDocApproval &&
                resultGetItems.data.seeDocApproval.map((approvalDoc) => {
                  return (
                    <ContentListItemComp
                      emoji={"📝"}
                      title={approvalDoc.subject}
                      subtext={`@${approvalDoc.drafter.username} ${new Date(
                        approvalDoc.createdAt
                      ).toDateString()}`}
                      key={approvalDoc.id}
                      id={approvalDoc.id}
                      onClick={onApprovalDocClick}
                      isSelected={selectedItemId === approvalDoc.id}
                    />
                  );
                })}
            </ContentList>
          </ContentLeftList>
        </ContentLeftSide>
      </ContentWrapper>

      <ContentDetail>
        {!resultViewItem.loading &&
          resultViewItem.data &&
          resultViewItem.data.seeFullDocApproval && (
            <ApproveDoc data={resultViewItem.data.seeFullDocApproval} />
          )}
      </ContentDetail>
    </ContentContainer>
  );
};

///////////////////////////////////////

const DefaultContent = () => {
  const [selectedItemId, setSelectedItemId] = useState("");

  const [queryGetItems, resultGetItems] = useLazyQuery(SEE_DAILY_JOURNALS, {
    pollInterval: POLL_INTERVAL,
    fetchPolicy: "network-only",
  });

  const [queryViewItem, resultViewItem] = useLazyQuery(SEE_FULL_DAILY_JOURNAL, {
    variables: { id: selectedItemId },
    fetchPolicy: "network-only",
  });

  const onMailClick = async (e) => {
    setSelectedItemId(e.target.id);
  };

  useEffect(() => {
    if (!resultGetItems.called) {
      queryGetItems();
    }
    return () => {};
  });

  useEffect(() => {
    queryViewItem();
    return () => {};
  }, [selectedItemId, queryViewItem]);

  return (
    <ContentContainer>
      <ContentWrapper>
        <ContentLeftSide>
          <ContentLeftHeader>
            <ContentTitle>내 업무</ContentTitle>
          </ContentLeftHeader>
          <ContentLeftList>
            <ContentList>
              {!resultGetItems.loading &&
                resultGetItems.data &&
                resultGetItems.data.dailyJournals &&
                resultGetItems.data.dailyJournals.map((dailyJournal) => (
                  <ContentListItemComp
                    emoji={"💻"}
                    title={`${new Date(
                      dailyJournal.createdAt
                    ).toDateString()} 업무 일지`}
                    subtext={`${new Date(
                      dailyJournal.createdAt
                    ).toDateString()}`}
                    key={dailyJournal.id}
                    id={dailyJournal.id}
                    onClick={onMailClick}
                    isSelected={selectedItemId === dailyJournal.id}
                  />
                ))}
            </ContentList>
          </ContentLeftList>
        </ContentLeftSide>
      </ContentWrapper>

      <ContentDetail>
        {!resultViewItem.loading &&
          resultViewItem.data &&
          resultViewItem.data.dailyJournal && (
            <DailyJournal data={resultViewItem.data.dailyJournal} />
          )}
      </ContentDetail>
    </ContentContainer>
  );
};

export default ({ menuName }) => {
  return (
    <>
      {menuName === "defaultMenu" && <DefaultContent />}
      {menuName === "mailMenu" && <MailContent />}
      {menuName === "docsMenu" && <ApprovalDocContent />}
    </>
  );
};
