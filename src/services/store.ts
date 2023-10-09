import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { appReducer } from '@/src/services/app/app-slice'
import { authApi } from '@/src/services/auth/auth-api'
import { authReducer } from '@/src/services/auth/auth-slice'
import { ProfileAPI } from '@/src/services/profile/profile-api'
import { avaReducer } from '@/src/services/profile/profile-slice'

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [ProfileAPI.reducerPath]: ProfileAPI.reducer,
  auth: authReducer,
  app: appReducer,
  ava: avaReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([authApi.middleware]).concat([ProfileAPI.middleware]),
})

export type AppDispatch = typeof store.dispatch
export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
