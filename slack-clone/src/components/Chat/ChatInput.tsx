import React, { FC, useEffect, useState } from "react";
import { ChatInputProps } from "../../Types";
import styled from "styled-components";
import { Button } from "@mui/material";
import { auth, db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatInput: FC<ChatInputProps> = ({ roomId, channelName, chatRef }) => {
  const [inputValue, setInputValue] = useState("");
  const [user] = useAuthState(auth);
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId || !inputValue) {
      return false;
    }
    try {
      const docRef = await addDoc(collection(db, "rooms", roomId, "messages"), {
        message: inputValue,
        timestamp: serverTimestamp(),
        user: user?.displayName,
        userImage: user?.photoURL,
      });
      setInputValue("");
      chatRef?.current?.scrollIntoView({ behavior: "smooth" });
      console.log("done", docRef);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ChatInputContainer>
      <form onSubmit={sendMessage}>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          placeholder={`Message #${channelName}`}
        />

        <Button type="submit">SEND</Button>
      </form>
    </ChatInputContainer>
  );
};
export default ChatInput;
const ChatInputContainer = styled.div`
  border-radius: 20px;
  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }
  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    padding: 20px;
    outline: none;
  }
  > form > button {
    display: none !important;
  }
`;
