import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { signInReducer } from '@/src/features/auth/signIn'
import { baseApi } from '@/src/shared/api'
import { authMeReducer } from '@/src/shared/hoc'
import { loadState, saveState } from '@/src/shared/lib/localStorage'
import { menuReducer } from '@/src/shared/sidebar'
import { progressBarReducer } from '@/src/shared/ui/progressBar'
import { StateSchema } from '@/src/store/types'

const rootReducer: ReducersMapObject<StateSchema> = {
  [baseApi.reducerPath]: baseApi.reducer,
  authMe: authMeReducer,
  signIn: signInReducer,
  menu: menuReducer,
  progressBar: progressBarReducer,
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([baseApi.middleware]),
  preloadedState: loadState(),
})
setupListeners(store.dispatch)
store.subscribe(() => {
  saveState(store.getState())
})
