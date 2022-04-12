import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Token } from "./token";

export type TokenState = Token[];

const initialState: TokenState = [{
    token: ""
}]

export const authSlice = createSlice( {
    name: "auth",
    initialState: initialState,

    reducers: {
        logout: (state) =>
        { 
          state[0].token = "";
        },
        login: (state, action) => {
          state[0].token = action.payload;
        }
    }
});
export const { logout, login } = authSlice.actions;

export const selectAuth = (state: RootState) => {
  return state.auth[0].token;
}

export default authSlice.reducer;