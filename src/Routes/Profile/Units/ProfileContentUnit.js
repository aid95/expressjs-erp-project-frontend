import { useLazyQuery, useQuery } from "@apollo/client";
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
  SEE_MAIL,
  SEE_DOC_APPROVAL,
  SEE_FULL_DOC_APPROVAL,
} from "../ProfileQueries";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;

  background-color: white;
  padding: 10px;
  border-radius: ${(props) => props.theme.borderRadius};

  padding: 20px;
  min-height: 600px;
`;

const ContentTitle = styled.p`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 10px;
`;

const ContentListWrapper = styled.div`
  width: 28%;
  border-right: 1px solid #e6e6e675;
`;

const ContentDetail = styled.div`
  width: 72%;
`;

const Link = styled.a`
  cursor: pointer;
  font-size: 12px;
`;

const MailContent = () => {
  const [mail, setMail] = useState("");

  const { data, loading } = useQuery(SEE_MAIL);

  const [seeFullMail, seeFullMailVars] = useLazyQuery(SEE_FULL_MAIL, {
    variables: { id: mail },
  });

  const onMailClick = async (e) => {
    setMail(e.target.id);
  };

  useEffect(() => {
    seeFullMail();
    return () => {};
  }, [mail]);

  return (
    <ContentWrapper>
      <ContentListWrapper>
        <ContentTitle>목록</ContentTitle>
        <ContentList>
          {!loading &&
            data &&
            data.seeMail &&
            data.seeMail.map((mail) => (
              <ContentListItemComp
                emoji={"📧"}
                title={mail.subject}
                subtext={new Date(mail.createdAt).toDateString()}
                key={mail.id}
                id={mail.id}
                onClick={onMailClick}
              />
            ))}
        </ContentList>
      </ContentListWrapper>

      <ContentDetail>
        {!seeFullMailVars.loading &&
          seeFullMailVars.data &&
          seeFullMailVars.data.seeFullMail && (
            <UserMessage data={seeFullMailVars.data.seeFullMail} />
          )}
      </ContentDetail>
    </ContentWrapper>
  );
};

const ApprovalDocContent = () => {
  const [approvalDoc, setApprovalDoc] = useState("");

  const [seeApprovalDoc, seeApprovalDocVars] = useLazyQuery(SEE_DOC_APPROVAL);

  const [seeFullApprovalDoc, seeFullApprovalDocVars] = useLazyQuery(
    SEE_FULL_DOC_APPROVAL,
    {
      variables: { id: approvalDoc },
    }
  );

  const onApprovalDocClick = async (e) => {
    setApprovalDoc(e.target.id);
  };

  useEffect(() => {
    seeApprovalDoc();
    return () => {};
  });

  useEffect(() => {
    seeFullApprovalDoc();
    return () => {};
  }, [approvalDoc]);

  return (
    <ContentWrapper>
      <ContentListWrapper>
        <ContentTitle>목록</ContentTitle>
        <ContentList>
          {!seeApprovalDocVars.loading &&
            seeApprovalDocVars.data &&
            seeApprovalDocVars.data.seeDocApproval &&
            seeApprovalDocVars.data.seeDocApproval.map((approvalDoc) => {
              console.log(approvalDoc);
              return (
                <ContentListItemComp
                  emoji={"📝"}
                  title={approvalDoc.subject}
                  subtext={new Date(approvalDoc.createdAt).toDateString()}
                  key={approvalDoc.id}
                  id={approvalDoc.id}
                  onClick={onApprovalDocClick}
                />
              );
            })}
        </ContentList>
      </ContentListWrapper>

      <ContentDetail>
        {!seeFullApprovalDocVars.loading &&
          seeFullApprovalDocVars.data &&
          seeFullApprovalDocVars.data.seeFullDocApproval && (
            <ApproveDoc data={seeFullApprovalDocVars.data.seeFullDocApproval} />
          )}
      </ContentDetail>
    </ContentWrapper>
  );
};

export default ({ menuName }) => {
  return (
    <>
      {menuName === "mailMenu" && <MailContent />}
      {menuName === "docsMenu" && <ApprovalDocContent />}
    </>
  );
};
