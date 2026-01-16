import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./postsThunks";

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        postsList: [],
        loading: false,
        error: null
    },
    reducers: {
        deletePost(state, action) {
            state.postsList = state.postsList.filter(post => post.id !== action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false,
                    state.postsList = action.payload
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false,
                    state.postsList = action.payload
            })
    }
})

export const { deletePost } = postsSlice.actions

export default postsSlice.reducer