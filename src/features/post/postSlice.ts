import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from './post';
import { createGroupPost, createPost, getAllGroupPosts, getAllPosts, getFollowingPosts, getPersonalPosts} from "./post.api";
import { store } from "../../app/store";

export type PostState = Post[];

const initialState: PostState = [];

export const postSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        add: (state, action) => {
          state.push(action.payload);
        },
        update: (state, action) => {
          state.length = 0;
          
          action.payload.forEach((index: Post) => {
            state.push(index);
          });
        },
        clear: (state) => {
            state.length = 0;
        }
    }
});

type Rootstate = ReturnType<typeof store.getState>;
export const selectPosts = (state: Rootstate) => {
    return state.posts
}

export const { add, update, clear } = postSlice.actions;

export default postSlice.reducer;