import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  roomId: null,
};
export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    etnerRoom: (state, aciton) => {
      state.roomId = aciton.payload.roomId;
    },
  },
});

export const {etnerRoom}=appSlice.actions   

export default appSlice.reducer