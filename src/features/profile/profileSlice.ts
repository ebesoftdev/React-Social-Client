import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Profile } from "./profile";
import { updateProfile } from "./profile.api";
import { store } from "../../app/store";
import User from "../login/User";

const initialState: {key: Profile} = {
    key: {
      id: "",
      first_name: "",
      last_name: "",
      birthday: "",
      hobby: "",
      location: "",
      profile_img: "",
      header_img: "",
      about_me: "",
      user_id:"",
      follower_num: 0,
      following_num: 0,
      followers: []
    }
}

const profileSlice = createSlice( {
    name: 'profile',
    initialState: initialState,
    reducers: {
      setFollowers: (state, action) => {
        state.key.followers = action.payload;
      },
      update: (state, action) => {
        state.key = action.payload;
      },
      setProfile: (state, action) => {
        state.key = action.payload;
      }
    }
});

type Rootstate = ReturnType<typeof store.getState>;
export const selectProfile = ( state: Rootstate ) =>
{
    return state.profile.key;
}

export const { setProfile, setFollowers, update } = profileSlice.actions;

export default profileSlice.reducer;