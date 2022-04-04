import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "./Login.api";
import User from "./User";
import { RootState } from "../../app/store";


interface UserState {
    id: string,
    email: string
}

const initialState: UserState = {
    id: "",
    email: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      updateUser: (state, action) => {
        state.id = action.payload.id;
        state.email = action.payload.email;
      }
    }
})

export const { updateUser } = userSlice.actions;

export const selectUser = ( state: RootState ) =>
{
    return state.user;
}

export default userSlice.reducer;