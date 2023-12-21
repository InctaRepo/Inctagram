import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Post, PostState } from './postApiTypes'

const initialState: PostState = {
  post: null,
}

const slice = createSlice({
  initialState,

  name: 'post',
  reducers: {
    setPost: (state, action: PayloadAction<Post>) => {
      state.post = action.payload
    },
  },
})

//TODO Он нам нужен?
export const postReducer = slice.reducer

export const postActions = slice.actions
