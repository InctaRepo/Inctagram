import '@/src/styles/_globals.scss'
import '@/src/styles/nprogress.scss'
import 'react-toastify/dist/ReactToastify.css'

import { ReactElement, ReactNode, useEffect, useState } from 'react'

import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import NProgress from 'nprogress'
import { QueryClient, QueryClientProvider, useIsFetching, useIsMutating } from 'react-query'
import { ToastContainer } from 'react-toastify'

import { useLoader } from '@/src/assets/hooks/useLoader'

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <MyApp Component={Component} {...pageProps} />
    </QueryClientProvider>
  )
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useLoader()
  const getLayout = Component.getLayout ?? (page => page)
  const isFetching = useIsFetching()
  const isMutation = useIsMutating()

  useEffect(() => {
    if (isFetching || isMutation) {
      NProgress.start()
    } else {
      NProgress.done()
    }

    return () => {
      NProgress.done()
    }
  }, [isFetching, isMutation])

  return (
    <>
      {getLayout(<Component {...pageProps} />)}
      <ToastContainer position="bottom-left" autoClose={4000} closeOnClick draggable />
    </>
  )
}
