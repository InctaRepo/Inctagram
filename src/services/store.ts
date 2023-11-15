import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { appReducer } from '@/src/services/app/app-slice'
import { authApi } from '@/src/services/auth/auth-api'
import { authReducer } from '@/src/services/auth/auth-slice'
import { menuReducer } from '@/src/services/menu/menu-slice'
import { postApi } from '@/src/services/posts/postApi'
import { postReducer } from '@/src/services/posts/postSlice'
import { profileApi } from '@/src/services/profile/profileApi'
import { profileReducer } from '@/src/services/profile/profileSlice'
import { ProfileSsrApi } from '@/src/services/profile/profileSsrApi'

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [ProfileSsrApi.reducerPath]: ProfileSsrApi.reducer,
  auth: authReducer,
  app: appReducer,
  profile: profileReducer,
  post: postReducer,
  menu: menuReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat([authApi.middleware])
      .concat([profileApi.middleware])
      .concat([postApi.middleware])
      .concat([ProfileSsrApi.middleware]),
})

export type AppDispatch = typeof store.dispatch
export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
const makeStore = () => store

export type AppStore = ReturnType<typeof makeStore>
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })
