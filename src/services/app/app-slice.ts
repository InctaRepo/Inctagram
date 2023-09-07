import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export type ErrorType = string | null | undefined

const slice = createSlice({
  name: 'app',
  initialState: {
    error: null as ErrorType,
    isLoading: false as boolean,
  },
  reducers: {
    setError: (state, action: PayloadAction<{ error: ErrorType }>) => {
      state.error = action.payload.error
    },
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading
    },
  },
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
      .addMatcher(
        action => {
          return action.type.endsWith('/rejected')
        },
        (state, action) => {
          state.isLoading = false
          const { errorMessage, showGlobalError = true } = action.payload

          if (!showGlobalError) return
          if (errorMessage) {
            state.error = errorMessage
          } else {
            state.error = `Undefined error occurred`
          }
          toast.error(state.error)
          state.error = ''
        }
      )
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions
