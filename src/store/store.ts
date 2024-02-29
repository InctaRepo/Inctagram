import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { autocompleteApi } from '@/entities/profile/service/autocompleteApi'
import { signInReducer } from '@/features/auth/signIn'
import { baseApi } from '@/shared/api'
import { authMeReducer } from '@/shared/hoc'
import { loadState, saveState } from '@/shared/lib/localStorage'
import { menuReducer } from '@/shared/sidebar'
import { StateSchema } from '@/store'
import { progressBarReducer } from '@/ui/progressBar'

const rootReducer: ReducersMapObject<StateSchema> = {
  [baseApi.reducerPath]: baseApi.reducer,
  [autocompleteApi.reducerPath]: autocompleteApi.reducer,
  authMe: authMeReducer,
  signIn: signInReducer,
  menu: menuReducer,
  progressBar: progressBarReducer,
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([baseApi.middleware]).concat([autocompleteApi.middleware]),
  preloadedState: loadState(),
})
setupListeners(store.dispatch)
store.subscribe(() => {
  saveState(store.getState())
})
