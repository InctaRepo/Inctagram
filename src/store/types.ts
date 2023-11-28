import { rootReducer } from '@reduxjs/toolkit/src/tests/injectableCombineReducers.example'
import { makeStore, store } from '@/src/store'
import { AppSchema } from '@/src/shared/app'
import { AuthState } from '@/src/features/auth/authService'
import { SignInSchema } from '@/src/features/auth/signIn'
import { postApi, PostState } from '@/src/features/posts'
import { profileApi } from '@/src/features/profile/service/profileApi'
import { ProfileState } from '@/src/features/profile/service/profileApiTypes'
import { baseApi } from '@/src/shared/api'
import { MenuState } from '@/src/shared/sidebar/model/slice/menuSlice'

export type AppDispatch = typeof store.dispatch
export type AppRootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof makeStore>
export type StateSchema = {
  [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>
  [profileApi.reducerPath]: ReturnType<typeof profileApi.reducer>
  [postApi.reducerPath]: ReturnType<typeof postApi.reducer>
  auth: AuthState
  signIn: SignInSchema
  app: AppSchema
  profile: ProfileState
  post: PostState
  menu: MenuState
}
