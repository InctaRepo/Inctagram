import { autocompleteApi } from '@/entities/profile/service/autocompleteApi'
import { SignInSchema } from '@/features/auth/signIn'
import { baseApi } from '@/shared/api'
import { AuthMeSchema } from '@/shared/hoc'
import { MenuSchema } from '@/shared/sidebar'
import { makeStore, store } from '@/store'
import { ProgressBarSchema } from '@/ui/progressBar'

export type AppDispatch = typeof store.dispatch
export type AppStore = ReturnType<typeof makeStore>
export type AppRootState = ReturnType<AppStore['getState']>
export type StateSchema = {
  [autocompleteApi.reducerPath]: ReturnType<typeof autocompleteApi.reducer>
  [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>
  authMe: AuthMeSchema
  menu: MenuSchema
  progressBar: ProgressBarSchema
  signIn: SignInSchema
}
