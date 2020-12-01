import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { SCROLLBAR_STYLE } from "../../Routes/Profile/Units/ContentParts/ContentStyles";
import useInput from "../../Hooks/useInput";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ME, SEND_MESSAGE } from "../../SharedQueries";
import { format } from "date-fns";
import { SEE_CHAT_ROOM } from "../../Routes/Profile/ProfileQueries";

const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.isTo ? "row" : "row-reverse")};
  margin-bottom: 20px;
`;

const MessageBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  max-width: 300px;
`;

const SenderText = styled.p`
  font-size: 14px;
`;

const ToTalkText = styled.p`
  margin: 5px 0;
  padding: 5px;
  border: 1px solid #d9efdc;
  border-radius: 5px;
  resize: none;
  outline: none;
  background-color: #dcf3df;
  line-height: 18px;
`;

const DateText = styled.p`
  font-size: 12px;
  text-align: right;
`;

const MessageBox = ({ isTo, text, fullName, date }) => {
  return (
    <MessageContainer isTo={isTo}>
      <MessageBoxWrapper>
        <SenderText>{fullName}</SenderText>
        <ToTalkText>{text}</ToTalkText>
        <DateText>{format(new Date(date), "yyyy/MM/dd HH:mm")}</DateText>
      </MessageBoxWrapper>
    </MessageContainer>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 20px;
`;

const ChatBoxWrapper = styled(SCROLLBAR_STYLE)`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
`;

const SendContentInput = styled.textarea`
  padding: 20px;
  font-size: 12px;
  line-height: 26px;
  height: 100%;
  width: 100%;

  border: none;
  background-color: transparent;
  resize: none;
  outline: none;
`;

const InputBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 20%;
  border-top: 1px solid #e6e6e675;
`;

const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription newMessage($id: String!) {
    newMessage(id: $id) {
      id
      from {
        id
        fullName
      }
      text
      createdAt
    }
  }
`;

const ChattingBox = (props) => {
  const { data } = props;

  useEffect(() => {
    props.subscribeToNewMessages();
  });

  return (
    !!data &&
    !!data.seeChatRoom && (
      <>
        {data.seeChatRoom.messages.map(({ id, from, text, createdAt }) => (
          <MessageBox
            date={createdAt}
            fullName={from.fullName}
            text={text}
            isTo={from.id === props.meId}
            key={id}
          />
        ))}
      </>
    )
  );
};

const NewMessagesWithData = ({ roomId, meId }) => {
  const { subscribeToMore, ...result } = useQuery(SEE_CHAT_ROOM, {
    variables: { id: roomId },
    fetchPolicy: "network-only",
  });

  return (
    !result.loading && (
      <>
        <ChattingBox
          {...result}
          meId={meId}
          subscribeToNewMessages={() => {
            subscribeToMore({
              document: NEW_MESSAGE_SUBSCRIPTION,
              variables: {
                id: roomId,
              },
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newMessageItem = subscriptionData.data.newMessage;
                return Object.assign({}, prev, {
                  seeChatRoom: {
                    messages: [newMessageItem, ...prev.seeChatRoom.messages],
                  },
                });
              },
            });
          }}
        />
      </>
    )
  );
};

const ChatRoom = ({ roomId }) => {
  const content = useInput("");
  const scrollRef = useRef();

  const me = useQuery(ME);
  const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
    variables: {
      chatRoomId: roomId,
      message: content.value,
    },
  });

  return (
    <Container>
      {!me.loading && (
        <>
          <ChatBoxWrapper ref={scrollRef}>
            <NewMessagesWithData roomId={roomId} meId={me.data.id} />
          </ChatBoxWrapper>
          <InputBoxWrapper>
            <SendContentInput
              onKeyPress={async (event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  if (event.target.value !== "") {
                    await sendMessageMutation();
                    event.target.value = "";
                    event.preventDefault();
                  }
                }
              }}
              value={""}
              placeholder={"내용"}
              {...content}
            />
          </InputBoxWrapper>
        </>
      )}
    </Container>
  );
};

export default ChatRoom;
