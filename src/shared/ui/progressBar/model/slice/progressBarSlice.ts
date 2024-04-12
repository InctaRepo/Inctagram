import { createSlice } from '@reduxjs/toolkit'

export type ProgressBarSchema = {
  isLoading: boolean
}
const initialState: ProgressBarSchema = {
  isLoading: false,
}
const progressBarSlice = createSlice({
  extraReducers: builder => {
    builder
      .addMatcher(
        action => {
          return action.type.endsWith('/pending')
        },
        state => {
          state.isLoading = true
        }
      )
      .addMatcher(
        action => {
          return action.type.endsWith('/fulfilled')
        },
        state => {
          state.isLoading = false
        }
      )
    // .addMatcher(
    //   action => {
    //     return action.type.endsWith('/rejected')
    //   },
    //   state => {
    //     state.isLoading = false
    //   }
    // )
  },
  initialState,
  name: 'progressBar',
  reducers: {},
})

export const { reducer: progressBarReducer } = progressBarSlice
