import { useLoader } from '@/src/assets/hooks/use-loader'
import { store } from '@/src/services/store'
import '@/src/styles/_globals.scss'
import '@/src/styles/nprogress.scss'

import { ReactElement, ReactNode } from 'react'

import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // const [queryClient] = useState(() => new QueryClient())

  return (
    <Provider store={store}>
      <MyApp Component={Component} {...pageProps} />
    </Provider>
  )
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useLoader()
  const getLayout = Component.getLayout ?? (page => page)
  // const isFetching = useIsFetching()
  // const isMutation = useIsMutating()

  // useEffect(() => {
  //   if (isFetching || isMutation) {
  //     NProgress.start()
  //   } else {
  //     NProgress.done()
  //   }
  //
  //   return () => {
  //     NProgress.done()
  //   }
  // }, [isFetching, isMutation])

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
