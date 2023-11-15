import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Post } from '@/src/services/posts/postApi.types'

type PostState = {
  post: Post | null
}

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

export const postReducer = slice.reducer

export const postActions = slice.actions
