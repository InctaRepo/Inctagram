import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { appReducer } from '@/src/shared/app/appSlice'
import { authApi } from '@/src/features/auth/authService'
import { authReducer } from '@/src/features/auth/authService/authSlice'
import { postApi } from '@/src/features/posts/service/postApi'
import { postReducer } from '@/src/features/posts/service/postSlice'
import { profileApi } from '@/src/features/profile/service/profileApi'
import { profileReducer } from '@/src/features/profile/service/profileSlice'
import { baseApi } from '@/src/shared/api'
import { menuReducer } from '@/src/shared/sidebar/model/slice/menuSlice'

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
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
      .concat([baseApi.middleware])
      .concat([authApi.middleware])
      .concat([profileApi.middleware])
      .concat([postApi.middleware]),
})
setupListeners(store.dispatch)
