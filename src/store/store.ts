import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { StateSchema } from '@/src/store/types'
import { appReducer } from '@/src/shared/app/appSlice'
import { authApi } from '@/src/features/auth/authService'
import { authReducer } from '@/src/features/auth/authService/authSlice'
import { signInReducer } from '@/src/features/auth/signIn'
import { postApi } from '@/src/features/posts/service/postApi'
import { postReducer } from '@/src/features/posts/service/postSlice'
import { profileApi } from '@/src/features/profile/service/profileApi'
import { profileReducer } from '@/src/features/profile/service/profileSlice'
import { baseApi } from '@/src/shared/api'
import { loadState, saveState } from '@/src/shared/lib/localStorage/localStorage'
import { menuReducer } from '@/src/shared/sidebar/model/slice/menuSlice'

const rootReducer: ReducersMapObject<StateSchema> = {
  [baseApi.reducerPath]: baseApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  auth: authReducer,
  signIn: signInReducer,
  app: appReducer,
  profile: profileReducer,
  post: postReducer,
  menu: menuReducer,
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat([baseApi.middleware])
      .concat([authApi.middleware])
      .concat([profileApi.middleware])
      .concat([postApi.middleware]),
  preloadedState: loadState(),
})
setupListeners(store.dispatch)
store.subscribe(() => {
  saveState(store.getState())
})
