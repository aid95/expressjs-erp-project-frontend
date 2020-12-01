import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { Modal } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { SEND_MAIL } from "../../Routes/Profile/ProfileQueries";
import useInput from "../../Hooks/useInput";
import Input, { MultiLineInput } from "../Input";
import { gql } from "apollo-boost";

const UserMsgContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const UserMsgProfileWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 20px;
  border-bottom: 1px solid #e6e6e675;
`;

const FullNameDeco = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 140%;

  color: ${(props) => props.theme.blackColor};

  display: flex;
  align-items: center;
`;

const SubTextDeco = styled.p`
  font-size: ${(props) => props.size || 13}px;
  font-weight: 200;

  display: flex;
  align-items: center;
  height: 30px;

  color: ${(props) => props.theme.darkGreyColor};
`;

const BadgeSubTextDeco = styled(SubTextDeco)`
  background-color: ${(props) => props.theme.greenColor};
  border-radius: 15px;
  color: white;
  padding: 0 10px;
`;

const UserInfoHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UserMsgTitleWrapper = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e6e6e675;
`;

const UserMsgTitle = styled.h1`
  font-size: 18px;
  line-height: 22px;
`;

const UserInfoHeadWrapper = styled.div``;

const UserMsgContent = styled.textarea`
  padding: 20px;
  font-size: 16px;
  line-height: 26px;
  height: 100%;

  border: none;
  background-color: transparent;
  resize: none;
  outline: none;
`;

const MailButtonList = styled.ul`
  display: flex;
  padding-left: 20px;
`;

const MailButtonItem = styled.li`
  cursor: pointer;
  &:not(:last-child) {
    padding-right: 10px;
  }
`;

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

const ReplyMailModal = (props) => {
  const subject = useInput("");
  const content = useInput("");
  const [sendMail] = useMutation(SEND_MAIL, {
    variables: {
      to: props.user,
      subject: subject.value,
      content: content.value,
    },
  });
  const cancelClick = (e) => {
    subject.setValue("");
    content.setValue("");
    props.onHide();
  };
  const completeClick = async (e) => {
    await sendMail();
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
          📤 답장 보내기
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalContainer>
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
        <Button color={"secondary"} onClick={cancelClick}>
          취소
        </Button>
        <Button color={"primary"} onClick={completeClick}>
          보내기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const DELETE_MAIL_MUTATION = gql`
  mutation deleteMail($id: String!) {
    deleteMail(id: $id)
  }
`;

const UserMessage = ({ view, data }) => {
  const { id, subject, content, from } = data;
  const [replyMailModalShow, setReplyMailModalShow] = useState(false);
  const [deleteMailMutation] = useMutation(DELETE_MAIL_MUTATION, {
    variables: {
      id,
    },
  });

  return (
    <>
      <UserMsgContainer>
        <UserMsgProfileWrapper>
          <UserInfoHeadWrapper>
            <UserInfoHead>
              <FullNameDeco>{from.fullName}&nbsp;&nbsp;</FullNameDeco>
              <BadgeSubTextDeco size={13}>
                {from.rank.title} · {from.department.title}
              </BadgeSubTextDeco>
              <MailButtonList>
                <MailButtonItem onClick={() => setReplyMailModalShow(true)}>
                  답장
                </MailButtonItem>
                <MailButtonItem
                  onClick={async () => {
                    await deleteMailMutation();
                    view(false);
                  }}
                >
                  삭제
                </MailButtonItem>
              </MailButtonList>
            </UserInfoHead>
          </UserInfoHeadWrapper>
        </UserMsgProfileWrapper>
        <UserMsgTitleWrapper>
          <UserMsgTitle>{`제목 : ${subject}`}</UserMsgTitle>
        </UserMsgTitleWrapper>
        <UserMsgContent readOnly value={content} />
        <ReplyMailModal
          user={from.id}
          show={replyMailModalShow}
          onHide={() => {
            setReplyMailModalShow(false);
          }}
        />
      </UserMsgContainer>
    </>
  );
};

export default UserMessage;
