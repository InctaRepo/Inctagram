import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import { appReducer } from '@/src/services/app/app-slice'
import { authReducer } from '@/src/services/auth/auth-slice'
import { baseApi } from '@/src/services/base-api'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    app: appReducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
