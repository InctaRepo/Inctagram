import { rootReducer } from '@reduxjs/toolkit/src/tests/injectableCombineReducers.example'
import { makeStore, store } from '@/src/store'
import { AppSchema } from '@/src/shared/app'
import { AuthState } from '@/src/features/auth/authService'
import { SignInSchema } from '@/src/features/auth/signIn'
import { PostState } from '@/src/features/posts'
import { ProfileState } from '@/src/features/profile/service/profileApiTypes'
import { baseApi } from '@/src/shared/api'
import { AuthMeSchema } from '@/src/shared/hoc/model/types/AuthMeSchema'
import { MenuState } from '@/src/shared/sidebar/model/slice/menuSlice'

export type AppDispatch = typeof store.dispatch
export type AppRootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof makeStore>
export type StateSchema = {
  [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>
  auth: AuthState
  authMe: AuthMeSchema
  signIn: SignInSchema
  app: AppSchema
  profile: ProfileState
  post: PostState
  menu: MenuState
}
