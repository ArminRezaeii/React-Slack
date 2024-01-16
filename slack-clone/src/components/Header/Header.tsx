import { AccessTime, HelpOutline, SearchOutlined } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";
import styled from "styled-components";

export default function Header() {
  return (
    <>
      <HeaderContainer>
        <HeaderLeft>
          <HeaderAvatar />
          <AccessTime />
        </HeaderLeft>
        <HeaderSearch>
          <SearchOutlined />
          <input type="text" placeholder="Search" />
        </HeaderSearch>
        <HeaderRight>
          <HelpOutline />
        </HeaderRight>
      </HeaderContainer>
    </>
  );
}
const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 0.3;
  margin-left: 20px;
  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;

    color: white;
  }
  .hello {
    color: red;
  }
`;
const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
const HeaderSearch = styled.div`
  flex: 0.4;
  display: flex;
  opacity: 1;
  border-radius: 6px;
  background-color: #421f44;
  text-align: center;
  padding: 0 50px;
  color: gray;
  border: 1px gray solid;
  > input {
    background-color: transparent;
    text-align: center;
    min-width: 30vw;
    outline: none;
    color: white;
    border: none;
  }
`;
const HeaderRight = styled.div`
  display: flex;
  flex: 0.3;
  align-items: flex-start;
  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }
`;
