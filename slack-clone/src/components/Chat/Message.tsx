import { FC } from "react";
import { MessageProps } from "../../Types";
import styled from "styled-components";
const Message: FC<MessageProps> = ({
  message,
  timestamp,
  user,
  userImage,
  downloadURL,
}) => {
  return (
    <>
      <MessageContainer>
        <img src={userImage} />
        <MessageInfo>
          <h4>
            {user}
            {""}

            <span>{timestamp?.toDate().toUTCString()}</span>
          </h4>
          <p>{message}</p>

          <img src={downloadURL} />
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
    width: 50px; /* Add width for better control */
    object-fit: cover; /* Maintain aspect ratio and cover the entire container */
    border-radius: 50%; /* Make the image round */
    border: 2px solid #fff; /* Add a border to create a neat circle effect */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle shadow for depth */
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

  > p {
    margin-top: 8px; /* Add some space between the name and message */
  }

  > img {
    max-width: 50%; /* Ensure the image doesn't overflow its container */
    margin-top: 8px; /* Add some space between the message and the image */
    border-radius: 8px; /* Add border-radius for a rounded image */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle shadow for depth */
  }
`;

export default Message;
