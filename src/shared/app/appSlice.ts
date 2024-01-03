import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type AppSchema = {
  isLoading: boolean
  error: string | null
  isInitialized: boolean
}

const appSlice = createSlice({
  name: 'app',
  initialState: {
    isLoading: false,
    error: null,
    isInitialized: false,
  } as AppSchema,
  reducers: {
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
  // extraReducers: builder => {
  //   builder
  //     .addMatcher(
  //       action => {
  //         return action.type.endsWith('/pending')
  //       },
  //       state => {
  //         state.isLoading = true
  //       }
  //     )
  //     .addMatcher(
  //       action => {
  //         return action.type.endsWith('/fulfilled')
  //       },
  //       state => {
  //         state.isLoading = false
  //       }
  //     )
  //     .addMatcher(
  //       action => {
  //         return action.type.endsWith('/fulfilled')
  //       },
  //       //TODO error handling with status codes in response
  //
  //       (state, action) => {
  //         // state.isLoading = false
  //         // const { errorMessage, showGlobalError = true } = action.payload
  //         // if (!showGlobalError) return
  //         // if (errorMessage) {
  //         //   state.error = errorMessage
  //         // } else {
  //         //   state.error = `Undefined error occurred`
  //         // }
  //         // toast.error(state.error)
  //         // state.error = ''
  //       }
  // )
  //   },
})

export const { reducer: appReducer } = appSlice
export const { setIsLoading, setAppInitialized } = appSlice.actions
