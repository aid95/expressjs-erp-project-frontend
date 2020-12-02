import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import useInput from "../../Hooks/useInput";
import { useMutation, useQuery } from "@apollo/client";
import { Modal } from "react-bootstrap";
import { MultiLineInput } from "../Input";
import {
  ModalContainer,
  ModalInputWrapper,
} from "../../Routes/Profile/Units/ContentParts/ContentStyles";
import { ME } from "../../SharedQueries";
import { gql } from "apollo-boost";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DocHeadWrapper = styled.div``;

const DocHead = styled.h1`
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  margin: 20px 10px 60px 10px;
`;

const DocTitleWrapper = styled.div`
  border-top: 1px solid #e6e6e675;
  border-bottom: 1px solid #e6e6e675;
  padding: 20px;
`;

const DocTitle = styled.p`
  font-size: 18px;
`;

const DocCommentWrapper = styled.div`
  margin: 5px 10px 0 10px;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid #f9efd2;
  background-color: #fffacd6e;
`;

const DocRejectReasonWrapper = styled.div`
  margin: 5px 10px 0 10px;
  padding: 20px;
  color: white;
  border: 1px solid #dc3545;
  border-radius: 5px;
  background-color: #c53947;
`;

const ApproversWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px 20px 16px 20px;
`;

const ApproversList = styled.ul`
  display: flex;
`;

const DrafterTitleBadge = styled.span`
  font-size: 13px;
  padding: 2px 5px;
  background-color: #eef8f1;
  border-radius: 8px;
`;

const ApproversItem = styled.li`
  border-radius: 5px;
  background-color: ${(props) =>
    props.isPass === true ? props.theme.blueColor : props.theme.darkGreyColor};
  padding: 3px 5px;
  font-size: 11px;
  color: #fff;
  &:not(:last-child) {
    margin-right: 8px;
  }
`;

const ApprovalDocContent = styled.textarea`
  padding: 20px;
  font-size: 16px;
  line-height: 26px;
  height: 100%;

  border: none;
  background-color: transparent;
  resize: none;
  outline: none;
`;

const ApprovalDocSubText = styled.p`
  padding: 8px 20px;
`;

const DocFootWrapper = styled.div`
  margin-top: 30px;
`;

const DocFootList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const DocFootListItem = styled.li`
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const APPROVE_DOC = gql`
  mutation approveDocs(
    $id: String!
    $action: ACTION!
    $acceptComment: String
    $rejectReason: String!
  ) {
    approveDocs(
      id: $id
      action: $action
      acceptComment: $acceptComment
      rejectReason: $rejectReason
    )
  }
`;

const ApprovalDocModal = (props) => {
  const content = useInput("");
  const [approveDocMutation] = useMutation(APPROVE_DOC, {
    variables: {
      id: props.id,
      action: props.action ? "ACCEPT" : "REJECT",
      acceptComment: content.value,
      rejectReason: content.value,
    },
  });
  const cancelClick = (e) => {
    content.setValue("");
    props.onHide();
  };
  const completeClick = async (e) => {
    await approveDocMutation();
    cancelClick();
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
          {props.action ? "결재 승인" : "결재 반려"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalContainer>
          <ModalInputWrapper>
            <MultiLineInput value={""} placeholder={"내용"} {...content} />
          </ModalInputWrapper>
        </ModalContainer>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"danger"} onClick={cancelClick}>
          취소
        </Button>
        <Button onClick={completeClick}>
          {props.action ? "승인" : "반려"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ApproveDoc = (data) => {
  const [approvalDocModal, setApprovalDocModal] = useState(false);
  const [action, setAction] = useState(true);

  const {
    data: {
      id,
      subject,
      state,
      drafter,
      content,
      comment,
      rejectReason,
      approvers,
      currentApprover,
    },
  } = data;
  const me = useQuery(ME);

  return (
    <Container>
      <DocHeadWrapper>
        <DocHead>결 재 결 의 서</DocHead>
      </DocHeadWrapper>
      <ApprovalDocSubText>
        기안자&nbsp;:&nbsp;
        <DrafterTitleBadge>
          {drafter.rank.title}·{drafter.department.title}
        </DrafterTitleBadge>{" "}
        {drafter.fullName} @{drafter.username}
      </ApprovalDocSubText>
      <ApproversWrapper>
        결재자&nbsp;:&nbsp;
        <ApproversList>
          {approvers.map(({ id, approver, isPass }) => {
            const { username } = approver;
            return (
              <ApproversItem id={id} key={id} isPass={isPass}>
                {username}
              </ApproversItem>
            );
          })}
        </ApproversList>
      </ApproversWrapper>
      <DocTitleWrapper>
        <DocTitle>제목 : {subject}</DocTitle>
      </DocTitleWrapper>
      <ApprovalDocContent readOnly defaultValue={content} />
      {comment !== "" && <DocCommentWrapper>{comment}</DocCommentWrapper>}
      {rejectReason !== null && (
        <DocRejectReasonWrapper>{rejectReason}</DocRejectReasonWrapper>
      )}
      <DocFootWrapper>
        <ApprovalDocModal
          id={id}
          action={action}
          show={approvalDocModal}
          onHide={() => {
            setApprovalDocModal(false);
          }}
        />
        {(!me.loading && state !== "DONE") ||
          (state !== "REJECT" &&
            me.data.me.id === currentApprover.approver.id && (
              <DocFootList>
                <DocFootListItem>
                  <Button
                    onClick={(event) => {
                      setAction(true);
                      setApprovalDocModal(true);
                    }}
                    variant="outlined"
                  >
                    결재 승인
                  </Button>
                </DocFootListItem>
                <DocFootListItem>
                  <Button
                    onClick={(event) => {
                      setAction(false);
                      setApprovalDocModal(true);
                    }}
                    variant="outlined"
                    color={"secondary"}
                  >
                    결재 반려
                  </Button>
                </DocFootListItem>
              </DocFootList>
            ))}
      </DocFootWrapper>
    </Container>
  );
};

export default ApproveDoc;
