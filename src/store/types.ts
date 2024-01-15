import { rootReducer } from '@reduxjs/toolkit/src/tests/injectableCombineReducers.example'

import { AuthState } from '@/src/features/auth/authService'
import { SignInSchema } from '@/src/features/auth/signIn'
import { PostState } from '@/src/features/posts'
import { baseApi } from '@/src/shared/api'
import { AppSchema } from '@/src/shared/app'
import { AuthMeSchema } from '@/src/shared/hoc'
import { MenuState } from '@/src/shared/sidebar'
import { makeStore, store } from '@/src/store'

export type AppDispatch = typeof store.dispatch
export type AppRootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof makeStore>
export type StateSchema = {
  [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>
  auth: AuthState
  authMe: AuthMeSchema
  signIn: SignInSchema
  app: AppSchema
  post: PostState
  menu: MenuState
}
