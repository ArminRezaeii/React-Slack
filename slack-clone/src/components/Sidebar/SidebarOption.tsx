import { FC } from "react";
import { SidebarOptionProps } from "../../Types";
import styled from "styled-components";
import { db } from "../../firebase";

import { addDoc, collection } from "firebase/firestore";
import { useAppDispatch } from "../../hooks/reduxHook";
import { etnerRoom } from "../../features/appSlice";
const Sidebaroption: FC<SidebarOptionProps> = ({
  title,
  icon: Icon,
  addChannelOption,
  id,
}) => {
  const dispatch = useAppDispatch();
  const addChannel = async () => {
    const channelName = prompt("Please enter the channel name");
    if (channelName) {
      try {
        const docRef = await addDoc(collection(db, "rooms"), {
          name: channelName,
        });
        console.log(`Channel added with ID: ${docRef.id}`);
      } catch (error) {
        console.error("Error adding channel: ", error);
      }
    }
  };
  const selectChannel = () => {
    if (id) {
      dispatch(
        etnerRoom({
          roomId: id,
        })
      );
    }
  };
  return (
    <SidebarOptionContainer
      onClick={addChannelOption == true ? addChannel : selectChannel}
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
const SidebarOptionChannel = styled.h3`
  padding: 10px;
  font-weight: 300;
`;
