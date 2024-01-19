import {
  AccessTime,
  Add,
  Create,
  FiberManualRecord,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../../firebase";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import Sidebaroption from "../Sidebar/SidebarOption";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const channelsCollectionRef = collection(db, "rooms");
  // @ts-ignore
  const [user] = useAuthState(auth);
  const [channels] = useCollection(channelsCollectionRef);
  useEffect(() => {}, [sidebarOpen]);
  return (
    <>
      <HeaderContainer>
        <HeaderLeft>
          <HeaderAvatar
            onClick={() => auth.signOut()}
            alt={user?.displayName ?? undefined}
            src={user?.photoURL ?? undefined}
          />
          <AccessTime className="time" />
        </HeaderLeft>
        <HeaderSearch>
          <SearchOutlined />
          <input type="text" placeholder="Search" />
        </HeaderSearch>
        <HeaderRight>
          <MenuIcon
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
            }}
            className="menu"
          />
        </HeaderRight>
      </HeaderContainer>
      {sidebarOpen && (
        <MenuContainer>
          <MenuHeader>
            <SidebarInfo>
              <h1>{user?.displayName}</h1>
              <h3>
                <FiberManualRecord />
                Online
              </h3>
            </SidebarInfo>
            <Create />
          </MenuHeader>
          <Sidebaroption title="Add Channel" icon={Add} addChannelOption />
          {channels?.docs.map((doc) => (
            <Sidebaroption key={doc.id} id={doc.id} title={doc.data().name} />
          ))}
        </MenuContainer>
      )}
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

  @media screen and (max-width: 1024px) {
    .time {
      padding-left: 14px;
    }
  }

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
  border-radius: 6px;
  background-color: #421f44;
  padding: 8px;
  color: gray;
  border: 1px solid gray;
  align-items: center;

  > input {
    flex: 1;
    background-color: transparent;
    text-align: center;
    outline: none;
    color: white;
    border: none;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  flex: 0.3;
  align-items: flex-start;
  margin-left: 5px;
  margin-right: 5px;
  .menu {
    display: none;
    cursor: pointer;
  }
  .menu:hover {
    transition: 250ms all;
    color: #49274b;
  }
  @media screen and (max-width: 1024px) {
    .menu {
      display: flex;
    }
  }

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }
`;

const MenuContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  border-top: 1px solid #49274b;
  width: 100%;
  display: flex;
  padding-top: 50px;
  padding-bottom: 10px;
  flex-direction: column;
  > hr {
    margin: 10px 0;
    border: 1px solid #49274b;
  }
`;

const MenuHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;
  align-items: center;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 99px;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;
  height: 100%;

  > h1 {
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;

    > .MuiSvgIcon-root {
      font-size: 14px;
      margin-top: 1px;
      margin-right: 2px;
      color: green;
    }
  }
`;
