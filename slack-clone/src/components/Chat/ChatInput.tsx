import React, { FC, useEffect, useState } from "react";
import { ChatInputProps } from "../../Types";
import styled from "styled-components";
import { Alert, AlertColor, Button, Input, Snackbar } from "@mui/material";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { AttachFileOutlined, Send } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
const ChatInput: FC<ChatInputProps> = ({ roomId, chatRef }) => {
  const [inputValue, setInputValue] = useState("");
  const [user] = useAuthState(auth);
  const [file, setFile] = useState<string | unknown>();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>("error");

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    const selectedFile = e.target.files[0];
    const allowedFileTypes = ["image/png", "image/jpeg"];
    if (!allowedFileTypes.includes(selectedFile.type)) {
      setAlertSeverity("error");
      setAlertMessage(
        "Invalid file type. Only PNG and JPEG files are allowed."
      );
      setOpenAlert(true);
      return;
    }
    const maxSize = 3 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setAlertSeverity("error");
      setAlertMessage("File size exceeds the maximum allowed size (4MB).");
      setOpenAlert(true);
      return;
    }

    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const clearFile = () => {
    setFile(null);
    setImagePreview(null);
  };
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId || !inputValue) {
      return false;
    }
    try {
      if (file) {
        const maxSize = 3 * 1024 * 1024; // 4MB
        // @ts-ignore
        if (file.size > maxSize) {
          setAlertSeverity("error");
          setAlertMessage("File size exceeds the maximum allowed size (4MB).");
          setOpenAlert(true);
          return;
        }

        const allowedFileTypes = ["image/png", "image/jpeg"];
        // @ts-ignore
        if (!allowedFileTypes.includes(file.type)) {
          setAlertSeverity("error");
          setAlertMessage(
            "Invalid file type. Only PNG and JPEG files are allowed."
          );
          setOpenAlert(true);
          return;
        }
        const storage = getStorage();
        // @ts-ignore
        const storageRef = ref(storage, `roomFiles/${roomId}/${file.name}`);
        // @ts-ignore
        await uploadBytes(storageRef, file);

        const downloadURL = await getDownloadURL(storageRef);

        await addDoc(collection(db, "rooms", roomId, "messages"), {
          message: inputValue,
          timestamp: serverTimestamp(),
          user: user?.displayName,
          userImage: user?.photoURL,

          file: {
            // @ts-ignore
            fileName: file.name,
            // @ts-ignore
            fileType: file.type,
            downloadURL: downloadURL,
          },
        });
      } else {
        // Add message without file information to Firestore
        await addDoc(collection(db, "rooms", roomId, "messages"), {
          message: inputValue,
          timestamp: serverTimestamp(),
          user: user?.displayName,
          userImage: user?.photoURL,
        });
      }
      chatRef?.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  useEffect(() => {}, [file, imagePreview]);
  return (
    <GameInputContainer>
      <div className="item">
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage(e);
              setFile(null);
              setInputValue("");
              setImagePreview(null);
            }
          }}
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          placeholder="Type your message..."
        />
        {imagePreview && (
          <ImagePreviewContainer>
            <CloseIcon onClick={clearFile} className="closeIcon" />
            <img src={imagePreview} alt="Image Preview" />
          </ImagePreviewContainer>
        )}
        <CloudUploadButton>
          <Input
            // @ts-ignore
            accept="image/*"
            style={{ display: "none" }}
            id="file-input"
            multiple
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-input">
            <Button
              className="attach_button"
              variant="contained"
              component="span"
              startIcon={<AttachFileOutlined />}
            ></Button>
          </label>
        </CloudUploadButton>
        <SendButton>
          <Button
            variant="contained"
            color="primary"
            endIcon={<Send />}
            onClick={(e)=>{
              sendMessage(e);
              setFile(null);
              setInputValue("");
              setImagePreview(null);

            }}
          >
            Send
          </Button>
        </SendButton>
      </div>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(false)}
      >
        <Alert
          onClose={() => setOpenAlert(false)}
          severity={alertSeverity as AlertColor}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </GameInputContainer>
  );
};
export default ChatInput;
const GameInputContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0px -5px 15px rgba(0, 0, 0, 0.1);

  > .item {
    display: flex;
    align-items: center;
  }

  > .item > input {
    flex: 1;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 10px;
    margin-right: 10px;
  }
`;

const ImagePreviewContainer = styled.div`
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  margin-right: 10px;

  > img {
    max-width: 20%;
    max-height: 20%;
    border-radius: 5px;
  }

  > .closeIcon {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    color: #000;
    background-color: #fff;
    padding: 5px;
    border-radius: 50%;
    z-index: 1;
  }
`;

const CloudUploadButton = styled.div`
  label {
    cursor: pointer;
  }
  .attach_button {
    background-color: #49274b;
  }
  .attach_button:hover {
    background-color: #49274b;
    opacity: 0.9;
  }
  > .MuiSvgIcon-root {
    font-size: 24px;
  }
`;

const SendButton = styled.div`
  margin-left: 10px;
  > button {
    background-color: #49274b;
    color: #fff;
  }
  > button:hover {
    background-color: #49274b;
    opacity: 0.9;
  }
`;
