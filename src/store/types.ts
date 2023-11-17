import { rootReducer } from '@reduxjs/toolkit/src/tests/injectableCombineReducers.example'
import { makeStore, store } from '@/src/store'

export type AppDispatch = typeof store.dispatch
export type AppRootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof makeStore>
