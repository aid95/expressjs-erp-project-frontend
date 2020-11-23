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
import gql from "graphql-tag";

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

const ModalInputCaption = styled.p`
  margin-bottom: 5px;
`;

const ApproverList = styled.ul`
  display: flex;
`;
const ApproverItem = styled.li`
  border-radius: 3px;
  background-color: #007aff;
  color: white;
  padding: 5px 6px;
  &:not(:last-child) {
    margin-right: 5px;
  }
`;

const CREATE_NEW_APPROVAL_DOC = gql`
  mutation createDocApproval(
    $approvers: [String!]!
    $reviewers: [String!]!
    $subject: String!
    $content: String!
    $comment: String
  ) {
    createDocApproval(
      approvers: $approvers
      reviewers: $reviewers
      subject: $subject
      content: $content
      comment: $comment
    )
  }
`;

const NewApprovalDocModal = (props) => {
  const subject = useInput("");
  const content = useInput("");
  const comment = useInput("");
  const [approvers, setApprovers] = useState([]);
  const [reviewers, setReviewers] = useState([]);

  const [createDocApproval] = useMutation(CREATE_NEW_APPROVAL_DOC, {
    variables: {
      approvers: approvers.map(({ id }) => id),
      reviewers: reviewers.map(({ id }) => id),
      subject: subject.value,
      content: content.value,
      comment: content.value,
    },
  });

  const [sendMail] = useMutation(SEND_MAIL, {
    variables: {
      to: approvers,
      subject: subject.value,
      content: content.value,
    },
  });

  const appendApprovers = ({ id, username, fullName }) => {
    setApprovers([...approvers, { id, username, fullName }]);
  };

  const appendReviewers = ({ id, username, fullName }) => {
    setReviewers([...reviewers, { id, username, fullName }]);
  };

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
            <UserSearchInput setUser={appendApprovers} />
            <ModalInputCaption>결재자 선택</ModalInputCaption>
            <ApproverList>
              {approvers.map((approver) => (
                <ApproverItem>{approver.fullName}</ApproverItem>
              ))}
            </ApproverList>
          </ModalInputWrapper>
          <ModalInputWrapper>
            <UserSearchInput setUser={appendReviewers} />
            <ModalInputCaption>참고인 선택</ModalInputCaption>
            <ApproverList>
              {reviewers.map((reviewer) => (
                <ApproverItem>{reviewer.fullName}</ApproverItem>
              ))}
            </ApproverList>
          </ModalInputWrapper>
          <ModalInputWrapper>
            <Input value={""} placeholder={"제목"} {...subject} />
          </ModalInputWrapper>
          <ModalInputWrapper>
            <MultiLineInput value={""} placeholder={"내용"} {...content} />
          </ModalInputWrapper>
          <ModalInputWrapper>
            <MultiLineInput
              value={""}
              placeholder={"추가 사항"}
              col={10}
              {...comment}
            />
          </ModalInputWrapper>
        </ModalContainer>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={async (e) => {
            if (approvers !== "" && subject !== "" && content !== "") {
              await sendMail();
              subject.setValue("");
              content.setValue("");
              props.onHide();
            } else {
              toast.error("양식을 채워주세요.");
            }
          }}
        >
          작성하기
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
