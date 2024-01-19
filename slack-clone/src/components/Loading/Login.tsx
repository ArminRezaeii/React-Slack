import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import styled from "styled-components";
import { auth, provider } from "../../firebase";

export default function Login() {
  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
        // @ts-ignore
      if (error.code === "auth/popup-closed-by-user") {
        console.log("Popup closed by the user");
      } else {
          // @ts-ignore
        alert(error.message);
      }
    }
  };
  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg" />
        <h1>Sign in to Slack</h1>
        <p>
          <a href="https://arminrezaei.site" target="_blank">
            ArminRezaei
          </a>
        </p>
        <Button onClick={signIn}>Sign in with Google</Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
}
const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;
const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgb(0, 0, 0, 0.12), 0 1px 2px rgb(0, 0, 0, 0.24);
  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }
  > button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: #0a8d48;
    color: white;
  }
  > button:hover {
    background-color: rgb(10, 141, 72, 0.5);
  }
`;
