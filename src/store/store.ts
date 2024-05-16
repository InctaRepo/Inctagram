import { autocompleteApi } from '@/entities/profile/service/autocompleteApi'
import { signInReducer } from '@/features/auth/signIn'
import { baseApi } from '@/shared/api'
import { authMeReducer } from '@/shared/hoc'
import { loadState, saveState } from '@/shared/lib'
import { menuReducer } from '@/shared/sidebar'
import { StateSchema } from '@/store'
import { progressBarReducer } from '@/ui/progressBar'
import { ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

const rootReducer: ReducersMapObject<StateSchema> = {
  authMe: authMeReducer,
  [autocompleteApi.reducerPath]: autocompleteApi.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
  menu: menuReducer,
  progressBar: progressBarReducer,
  signIn: signInReducer,
}

// @ts-ignore
export const store = configureStore({
  // @ts-ignore
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat([baseApi.middleware]).concat([autocompleteApi.middleware])
  },
  preloadedState: loadState(),
  // @ts-ignore
  reducer: rootReducer,
})
setupListeners(store.dispatch)
store.subscribe(() => {
  saveState(store.getState())
})
