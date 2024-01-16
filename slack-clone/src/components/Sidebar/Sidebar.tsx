import {
  Add,
  AddIcCallOutlined,
  Apps,
  BookmarkBorder,
  Create,
  Drafts,
  ExpandLessOutlined,
  ExpandMore,
  FiberManualRecord,
  FileCopyOutlined,
  InboxOutlined,
  InsertChart,
  InsertComment,
  PeopleAltOutlined,
} from "@mui/icons-material";
import styled from "styled-components";
import Sidebaroption from "./SidebarOption";


export default function Sidebar() {
  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h1>Armin</h1>
          <h3>
            <FiberManualRecord />
            panjab
          </h3>
        </SidebarInfo>
        <Create />
      </SidebarHeader>
      <Sidebaroption title="Threads" icon={InsertComment} />
      <Sidebaroption title="Mentions & reactions" icon={InboxOutlined} />
      <Sidebaroption title="Saved items" icon={Drafts} />
      <Sidebaroption title="Channel browser" icon={BookmarkBorder} />
      <Sidebaroption title="People & user groups" icon={PeopleAltOutlined} />
      <Sidebaroption title="Apps" icon={Apps} />
      <Sidebaroption title="File browser" icon={FileCopyOutlined} />
      <Sidebaroption title="Show less" icon={ExpandLessOutlined} />
      <hr />
      <Sidebaroption title="Channles" icon={ExpandMore} />
      <hr />
      <Sidebaroption title="Add Channel" icon={Add} addChannelOption />
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  flex: 0.3;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;
  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`;
const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;
  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
`;
const SidebarInfo = styled.div`
  flex: 1;
  > h2 {
    font-size: 13px;
    font-weight: 900;
    margin-bottom: 5px;
  }
  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }
  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;
