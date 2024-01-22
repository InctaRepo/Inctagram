import { rootReducer } from '@reduxjs/toolkit/src/tests/injectableCombineReducers.example'

import { SignInSchema } from '@/src/features/auth/signIn'
import { baseApi } from '@/src/shared/api'
import { AuthMeSchema } from '@/src/shared/hoc'
import { MenuSchema } from '@/src/shared/sidebar'
import { ProgressBarSchema } from '@/src/shared/ui/progressBar'
import { makeStore, store } from '@/src/store'

export type AppDispatch = typeof store.dispatch
export type AppRootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof makeStore>
export type StateSchema = {
  [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>
  authMe: AuthMeSchema
  signIn: SignInSchema
  menu: MenuSchema
  progressBar: ProgressBarSchema
}
