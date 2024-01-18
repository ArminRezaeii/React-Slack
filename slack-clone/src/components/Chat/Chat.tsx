import { InfoOutlined, StarBorderOutlined } from "@mui/icons-material";
import styled from "styled-components";
import { useAppSelector } from "../../hooks/reduxHook";
import ChatInput from "./ChatInput";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { collection, doc, orderBy, query } from "firebase/firestore";
import Message from "./Message";
import { useEffect, useRef } from "react";

export default function Chat() {
  const roomId = useAppSelector((state) => state.app.roomId);
  const roomDetailsCollection = collection(db, "rooms");

  const [roomsDetailsSnapshot] = useDocument(
    roomId && doc(roomDetailsCollection, roomId)
  );
  const chatRef = useRef(null);
  const [roomMessage, loading] = useCollection(
    roomId &&
      query(
        collection(db, "rooms", roomId, "messages"),
        orderBy("timestamp", "asc")
      )
  );
  useEffect(() => {
    if (chatRef?.current) {
      // @ts-ignore
      chatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [roomId, roomMessage, loading]);
  return (
    <ChatContainer>
      {roomMessage && roomsDetailsSnapshot && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>#{roomsDetailsSnapshot?.data()?.name}</strong>
              </h4>
              <StarBorderOutlined />
            </HeaderLeft>

            <HeaderRight>
              <p>
                <InfoOutlined /> Details
              </p>
            </HeaderRight>
          </Header>

          <ChatMessage ref={chatRef}>
            {roomMessage?.docs.map((doc) => {
              const { message, timestamp, user, userImage, file } =
                doc.data();
           
              return (
                <Message
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                 downloadURL={file?.downloadURL}
                  key={doc.id}
                />
              );
            })}
          </ChatMessage>
          <ChatBottom ref={chatRef} />
          <ChatInput
            roomId={roomId}
            chatRef={chatRef}
            channelName={roomsDetailsSnapshot?.data()?.name}
          />
        </>
      )}
    </ChatContainer>
  );
}
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }
  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;
const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;
const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

const ChatBottom = styled.div`
  min-height: 50px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ChatMessage = styled.div``;
