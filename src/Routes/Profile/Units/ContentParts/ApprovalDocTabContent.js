import {
  ContentContainer,
  ContentWrapper,
  ContentDetail,
  ContentLeftHeader,
  ContentLeftList,
  ContentLeftSide,
  ContentTitle,
  NewButtonStyle,
} from "./ContentStyles";
import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  SEE_DOC_APPROVALS,
  SEE_FULL_DOC_APPROVAL,
  SEND_MAIL,
} from "../../ProfileQueries";
import {
  ContentList,
  ContentListItemComp,
} from "../../../../Components/ContentList";
import ApproveDoc from "../../../../Components/Form/ApproveDoc";
import useInput from "../../../../Hooks/useInput";
import Modal from "react-bootstrap/Modal";
import { UserSearchInput } from "../../../../Components/SearchInput";
import Input, { MultiLineInput } from "../../../../Components/Input";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import styled from "styled-components";

const POLL_INTERVAL = 2000;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 0;
`;

const NewApprovalDocModal = (props) => {
  const subject = useInput("");
  const content = useInput("");
  const [user, setUser] = useState("");

  const [sendMail] = useMutation(SEND_MAIL, {
    variables: {
      to: user,
      subject: subject.value,
      content: content.value,
    },
  });

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          📝 새 결재 문서 작성
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalContainer>
          <ModalInputWrapper>
            <UserSearchInput setUser={setUser} />
          </ModalInputWrapper>
          <ModalInputWrapper>
            <Input
              onChange={(e) => {
                console.log(e);
              }}
              value={""}
              placeholder={"제목"}
              {...subject}
            />
          </ModalInputWrapper>
          <ModalInputWrapper>
            <MultiLineInput
              onChange={(e) => {
                console.log(e);
              }}
              value={""}
              placeholder={"내용"}
              {...content}
            />
          </ModalInputWrapper>
        </ModalContainer>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={async (e) => {
            if (user !== "" && subject !== "" && content !== "") {
              await sendMail();
              subject.setValue("");
              content.setValue("");
              props.onHide();
            } else {
              toast.error("양식을 채워주세요.");
            }
          }}
        >
          보내기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const NewApprovalDocButton = () => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <NewButtonStyle onClick={() => setModalShow(true)}>
        새 결재 문서 작성
      </NewButtonStyle>
      <NewApprovalDocModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export const ApprovalDocContent = () => {
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
          <NewApprovalDocButton />
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
