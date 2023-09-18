// TODO may be use for protect routes

import { Middleware } from '@reduxjs/toolkit'
import { useRouter } from 'next/router'

import { authActions } from '@/src/services/auth/auth-slice'
import { AppRootStateType } from '@/src/services/index'

export const redirectMiddleware: Middleware<{}, AppRootStateType> =
  ({ dispatch, getState }) =>
  next =>
  action => {
    const router = useRouter()
    const state = getState()

    if (action.type === authActions.setIsAuth.type && !action.payload) {
      router.push('/login')
    }

    return next(action)
  }
// Compare this snippet from src/store.ts:
// import { configureStore } from '@reduxjs/toolkit'
// import { useDispatch } from 'react-redux'
// import { useMemo } from 'react'
// import { createWrapper } from 'next-redux-wrapper'
// import { combineReducers } from 'redux'
//
// import { authReducer } from '@/src/services/auth/auth-slice'
// import { appReducer } from '@/src/services/app'
// import { redirectMiddleware } from '@/src/middleware'
//
// const rootReducer = combineReducers({
//   auth: authReducer,
//   app: appReducer,
// })
//
// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(redirectMiddleware),
// })
//
// export type RootState = ReturnType<typeof rootReducer>
//
// export type AppDispatch = typeof store.dispatch
//
// export const useAppDispatch = () => useDispatch<AppDispatch>()
//
// export const wrapper = createWrapper(() => store)
// Compare this snippet from src/pages/_app.tsx:
// import { AppProps } from 'next/app'
// import { Provider } from 'react-redux'
// import { wrapper } from '@/src/store'
//
// import '@/src/styles/globals.css'
//
// const MyApp = ({ Component, pageProps }: AppProps) => {
//   return (
//     <Provider store={wrapper.store}>
//       <Component {...pageProps} />
//     </Provider>
//   )
// }
//
// export default wrapper.withRedux(MyApp)
