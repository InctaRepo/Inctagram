import { ReactElement, ReactNode, useEffect } from 'react'

import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import NProgress from 'nprogress'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { useLoader } from '@/src/assets/hooks/use-loader'
import { HistoryProvider } from '@/src/assets/hooks/useHistory'
import { appIsLoadingSelector } from '@/src/services/app'
import { store, useAppSelector, wrapper } from '@/src/services/store'
import '@/src/styles/_globals.scss'
import '@/src/styles/nprogress.scss'

import 'react-toastify/dist/ReactToastify.css'

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, ...rest }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <HistoryProvider>
      <Provider store={store}>
        <MyApp Component={Component} {...props.pageProps} />
      </Provider>
    </HistoryProvider>
  )
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useLoader()
  const getLayout = Component.getLayout ?? (page => page)
  const isLoading = useAppSelector(appIsLoadingSelector)

  useEffect(() => {
    // this is global loader for all pages , see in components/ui/progess-bar
    if (isLoading) {
      NProgress.start()
    } else {
      NProgress.done()
    }

    return () => {
      NProgress.done()
    }
  }, [isLoading])

  return (
    <>
      {getLayout(<Component {...pageProps} />)}
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        closeOnClick
        draggable
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </>
  )
}
