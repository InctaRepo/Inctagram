import { createSlice } from '@reduxjs/toolkit'

export type ProgressBarSchema = {
  isLoading: boolean
}
const initialState: ProgressBarSchema = {
  isLoading: false,
}
const progressBarSlice = createSlice({
  initialState,
  name: 'progressBar',
  reducers: {},
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
})

export const { reducer: progressBarReducer } = progressBarSlice
