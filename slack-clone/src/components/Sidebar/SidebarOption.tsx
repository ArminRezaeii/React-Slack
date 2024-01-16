import React, { FC } from "react";
import { SidebarOptionProps } from "../../Types";
import styled from "styled-components";
import { db } from "../../firebase";
import { addDoc } from "firebase/firestore";

const Sidebaroption: FC<SidebarOptionProps> = ({
  title,
  icon: Icon,
  addChannelOption,
}) => {
  const addChanle = () => {
    const channelName = prompt("Please enter the channle name");
    if(channelName){
      db.collection('rooms').add({
        name: channelName
      });
    }
  };
  const selectChannel = () => {};
  return (
    <SidebarOptionContainer
      onClick={() => (addChannelOption ? addChanle : selectChannel)}
    >
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span> {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
};

export default Sidebaroption;
const SidebarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;
  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }
  > h3 {
    font-weight: 500;
  }
  > h3 > span {
    padding: 15px;
  }
`;
const SidebarOptionChannel = styled.div``;
