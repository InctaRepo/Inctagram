import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { appReducer } from '@/src/services/app/app-slice'
import { authApi } from '@/src/services/auth/auth-api'
import { authReducer } from '@/src/services/auth/auth-slice'
import { PostAPI } from '@/src/services/posts/post-api'
import { postReducer } from '@/src/services/posts/post-slice'
import { ProfileAPI } from '@/src/services/profile/profile-api'
import { profileReducer } from '@/src/services/profile/profile-slice'
import { ProfileSSRAPI } from '@/src/services/profile/profile-ssr-api'

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [ProfileAPI.reducerPath]: ProfileAPI.reducer,
  [PostAPI.reducerPath]: PostAPI.reducer,
  [ProfileSSRAPI.reducerPath]: ProfileSSRAPI.reducer,
  auth: authReducer,
  app: appReducer,
  profile: profileReducer,
  post: postReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat([authApi.middleware])
      .concat([ProfileAPI.middleware])
      .concat([PostAPI.middleware])
      .concat([ProfileSSRAPI.middleware]),
})

export type AppDispatch = typeof store.dispatch
export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
const makeStore = () => store

export type AppStore = ReturnType<typeof makeStore>
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })
