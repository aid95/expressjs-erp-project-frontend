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
  ModalInputWrapper,
  ModalContainer,
} from "./ContentStyles";
import {
  ContentList,
  ContentListItemComp,
} from "../../../../Components/ContentList";
import { SEE_CHAT_ROOM, SEE_CHAT_ROOMS } from "../../ProfileQueries";
import UserMessage from "../../../../Components/Form/UserMessage";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Input from "../../../../Components/Input";
import useInput from "../../../../Hooks/useInput";
import { UserSearchInput } from "../../../../Components/SearchInput";
import { toast } from "react-toastify";
import { SEND_MESSAGE } from "../../../../SharedQueries";
import ChatRoom from "../../../../Components/Form/ChatRoom";

const POLL_INTERVAL = 2000;

const NewChatRoomModal = (props) => {
  const message = useInput("");
  const [user, setUser] = useState("");

  const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
    variables: {
      toId: user,
      message: message.value,
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
              placeholder={"내용"}
              {...message}
            />
          </ModalInputWrapper>
        </ModalContainer>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={async (e) => {
            if (user !== "" && message !== "") {
              await sendMessageMutation();
              message.setValue("");
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

const NewChatRoomButton = () => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <NewButtonStyle onClick={() => setModalShow(true)}>
        새 대화방 만들기
      </NewButtonStyle>
      <NewChatRoomModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export const ChatContent = () => {
  const [selectedItemId, setSelectedItemId] = useState("");
  const [seeChatRoom, setSeeChatRoom] = useState(false);

  const [queryGetItems, resultGetItems] = useLazyQuery(SEE_CHAT_ROOMS, {
    pollInterval: POLL_INTERVAL,
    fetchPolicy: "network-only",
  });

  const [queryViewItem, resultViewItem] = useLazyQuery(SEE_CHAT_ROOM, {
    variables: { id: selectedItemId },
    fetchPolicy: "network-only",
  });

  const onChatRoomClick = async (e) => {
    setSelectedItemId(e.target.id);
    setSeeChatRoom(true);
  };

  useEffect(() => {
    if (!resultGetItems.called) {
      queryGetItems();
    }
    return () => {};
  });

  useEffect(() => {
    if (selectedItemId !== "") {
      queryViewItem();
    }
    return () => {};
  }, [selectedItemId, queryViewItem]);

  return (
    <ContentContainer>
      <ContentWrapper>
        <ContentLeftSide>
          <ContentLeftHeader>
            <ContentTitle>대화방</ContentTitle>
          </ContentLeftHeader>
          <ContentLeftList>
            <ContentList>
              {!resultGetItems.loading &&
                resultGetItems.data &&
                resultGetItems.data.seeChatRooms &&
                resultGetItems.data.seeChatRooms.map((room) => (
                  <ContentListItemComp
                    emoji={"💬"}
                    title={room.participants
                      .map(({ fullName }) => {
                        return fullName;
                      })
                      .join()}
                    subtext={`${new Date(room.createdAt).toDateString()}`}
                    key={room.id}
                    id={room.id}
                    onClick={onChatRoomClick}
                    isSelected={selectedItemId === room.id}
                  />
                ))}
            </ContentList>
          </ContentLeftList>
          <NewChatRoomButton />
        </ContentLeftSide>
      </ContentWrapper>

      <ContentDetail>
        {!resultViewItem.loading &&
          seeChatRoom &&
          resultViewItem.data &&
          resultViewItem.data.seeChatRoom && (
            <ChatRoom data={resultViewItem.data.seeChatRoom} />
          )}
      </ContentDetail>
    </ContentContainer>
  );
};
