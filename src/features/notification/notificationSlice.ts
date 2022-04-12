import {createSlice } from "@reduxjs/toolkit";
import { RootState, store } from "../../app/store";

const initialState: any[] = [];

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      if (!action.payload.length)
        state.length = 0;
      else {
        for (let i = 0; i < action.payload.length; i++) {
          state[i] = action.payload[i];
        }
      }
    },
    clearNotifications: (state) => {
      state.length = 0;
    }
  }
});

type Rootstate = ReturnType<typeof store.getState>;
export default notificationSlice.reducer;

export const {setNotifications, clearNotifications} = notificationSlice.actions;

export const selectNotifications = (state: RootState) => {
  return state.notifications;
}