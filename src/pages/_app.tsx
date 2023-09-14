import { useLoader } from '@/src/assets/hooks/use-loader'
import { appIsLoadingSelector } from '@/src/services/app'
import { store, useAppSelector } from '@/src/services/store'
import '@/src/styles/_globals.scss'
import '@/src/styles/nprogress.scss'

// eslint-disable-next-line import/order
import { NextPage } from 'next'
// eslint-disable-next-line import/order
import type { AppProps } from 'next/app'
// eslint-disable-next-line import/order,import/no-named-as-default
import NProgress from 'nprogress'

// eslint-disable-next-line import/order
import { ReactElement, ReactNode, useEffect } from 'react'
// eslint-disable-next-line import/order
import { Provider } from 'react-redux'
// eslint-disable-next-line import/order
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <Provider store={store}>
      <MyApp Component={Component} {...pageProps} />
    </Provider>
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
