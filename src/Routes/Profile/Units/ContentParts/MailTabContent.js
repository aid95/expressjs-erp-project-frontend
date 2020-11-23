import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  NewButtonStyle,
  ContentContainer,
  ContentWrapper,
  ContentDetail,
  ContentLeftHeader,
  ContentLeftList,
  ContentLeftSide,
  ContentTitle,
} from "./ContentStyles";
import {
  ContentList,
  ContentListItemComp,
} from "../../../../Components/ContentList";
import { SEE_FULL_MAIL, SEE_MAILS, SEND_MAIL } from "../../ProfileQueries";
import UserMessage from "../../../../Components/Form/UserMessage";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import Input, { MultiLineInput } from "../../../../Components/Input";
import useInput from "../../../../Hooks/useInput";
import { UserSearchInput } from "../../../../Components/SearchInput";
import { toast } from "react-toastify";

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

const NewMailModal = (props) => {
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

  const searchInputOnChange = ({ id }) => {
    setUser(id);
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
          📧 새 메일 보내기
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalContainer>
          <ModalInputWrapper>
            <UserSearchInput setUser={searchInputOnChange} />
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

const NewMailButton = () => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <NewButtonStyle onClick={() => setModalShow(true)}>
        새 메일 보내기
      </NewButtonStyle>
      <NewMailModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export const MailContent = () => {
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
          <NewMailButton />
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
