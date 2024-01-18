import { FC } from "react";
import { MessageProps } from "../../Types";
import styled from "styled-components";
const Message: FC<MessageProps> = ({ message, timestamp, user, userImage }) => {
  return (
    <>
      <MessageContainer>
        <img src={userImage} />
        <MessageInfo>
          <h4>
            {user}
            {""}

            <span>{(timestamp)?.toDate().toUTCString()}</span>
          </h4>
          <p>{message}</p>
        </MessageInfo>
      </MessageContainer>
      {console.log(userImage)}
    </>
  );
};

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  > img {
    height: 50px;
    border-radius: 8px;
  }
`;
const MessageInfo = styled.div`
  padding-left: 10px;
  > h4 > span {
    color: gray;
    font-weight: 300;
    font-size: 10px;
    margin-left: 4px;
  }
`;
export default Message;
