import { rootReducer } from '@reduxjs/toolkit/src/tests/injectableCombineReducers.example'

import { geoApi } from '@/entities/profile/service/geoApi'
import { SignInSchema } from '@/features/auth/signIn'
import { baseApi } from '@/shared/api'
import { AuthMeSchema } from '@/shared/hoc'
import { MenuSchema } from '@/shared/sidebar'
import { makeStore, store } from '@/store'
import { ProgressBarSchema } from '@/ui/progressBar'

export type AppDispatch = typeof store.dispatch
export type AppRootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof makeStore>
export type StateSchema = {
  [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>
  [geoApi.reducerPath]: ReturnType<typeof geoApi.reducer>
  authMe: AuthMeSchema
  signIn: SignInSchema
  menu: MenuSchema
  progressBar: ProgressBarSchema
}
