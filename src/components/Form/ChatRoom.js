import React, { useMemo } from "react";
import styled from "styled-components";
import { SCROLLBAR_STYLE } from "../../Routes/Profile/Units/ContentParts/ContentStyles";
import useInput from "../../Hooks/useInput";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { ME, SEND_MESSAGE } from "../../SharedQueries";
import { format } from "date-fns";
import { toast } from "react-toastify";

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
  height: 70%;
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
  height: 30%;
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

const NewMessage = ({ roomId, meId }) => {
  const { loading, data } = useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
    variables: {
      id: roomId,
    },
    fetchPolicy: "network-only",
  });
  return (
    <>
      {!loading && !!data.newMessage && (
        <MessageBox
          isTo={meId === data.newMessage.from.id}
          text={data.newMessage.text}
          fullName={data.newMessage.from.fullName}
          date={data.newMessage.createdAt}
        />
      )}
    </>
  );
};

const ChatRoom = ({ data }) => {
  const content = useInput("");
  const { id, messages } = data;

  const me = useQuery(ME);
  const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
    variables: {
      chatRoomId: id,
      message: content.value,
    },
  });

  return (
    <Container>
      {!me.loading && (
        <>
          <ChatBoxWrapper>
            {messages.map(({ id, text, createdAt, from }) => {
              return (
                <MessageBox
                  isTo={from.id === me.data.id}
                  fullName={from.fullName}
                  date={createdAt}
                  text={text}
                />
              );
            })}
            <NewMessage roomId={id} meId={me.data.id} />
          </ChatBoxWrapper>
          <InputBoxWrapper>
            <SendContentInput
              onKeyPress={async (event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  if (event.target.value !== "") {
                    await sendMessageMutation();
                    event.target.value = "";
                  }
                  event.preventDefault();
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
