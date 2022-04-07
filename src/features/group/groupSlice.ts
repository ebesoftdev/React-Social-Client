import {createSlice } from "@reduxjs/toolkit";
import { RootState, store } from "../../app/store";
import { Group } from "./Group"
import { getGroupByName } from "./Group.api";

const initialState: {key: Group} = {
  key: {
    groupID: '',
    owner : {
      id: '',
      email: ''
    },
    name : '',
    description : '',
    headerImg : '',
    profilePic : '',
    joinedUsers : []
  }
};

const GroupSlice = createSlice({
    name: "group",
    initialState: initialState,
    reducers: {
      setGroup: (state, action) => {
        state.key = action.payload
      }
    },
});

type Rootstate = ReturnType<typeof store.getState>;
export default GroupSlice.reducer;

export const { setGroup } = GroupSlice.actions;

export const selectGroup = (state: RootState) => {
    return state.group.key;
}