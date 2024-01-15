import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { authReducer } from '@/src/features/auth/authService'
import { signInReducer } from '@/src/features/auth/signIn'
import { postReducer } from '@/src/features/posts/service'
import { baseApi } from '@/src/shared/api'
import { appReducer } from '@/src/shared/app'
import { authMeReducer } from '@/src/shared/hoc'
import { loadState, saveState } from '@/src/shared/lib/localStorage'
import { menuReducer } from '@/src/shared/sidebar'
import { StateSchema } from '@/src/store/types'

const rootReducer: ReducersMapObject<StateSchema> = {
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  authMe: authMeReducer,
  signIn: signInReducer,
  app: appReducer,
  post: postReducer,
  menu: menuReducer,
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
