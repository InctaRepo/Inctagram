import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PostType } from '@/src/services/posts/post-api-types'

type PostState = {
  post: PostType | null
}

const initialState: PostState = {
  post: null,
}

const slice = createSlice({
  initialState,

  name: 'post',
  reducers: {
    setPost: (state, action: PayloadAction<PostType>) => {
      state.post = action.payload
    },
  },
})

export const postReducer = slice.reducer

export const postActions = slice.actions
