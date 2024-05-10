import type { AppProps } from 'next/app'

import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'

import { HistoryProvider, useLoader } from '@/shared/hooks'
import { wrapper } from '@/store'
import { ProgressBar } from '@/ui/progressBar'
import { NextPage } from 'next'

import '@/styles/_globals.scss'
import '@/styles/nprogress.scss'
import 'react-toastify/dist/ReactToastify.css'
// import '../scripts/wdyr' необходимо для просмотра что именно рендериться повторно

type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode & NextPage<P, IP>
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, ...rest }: AppPropsWithLayout) {
  const { props, store } = wrapper.useWrappedStore(rest)

  useLoader()
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <HistoryProvider>
      <Provider store={store}>
        <ProgressBar>{getLayout(<Component {...props.pageProps} />)}</ProgressBar>
      </Provider>
    </HistoryProvider>
  )
}
// App.whyDidYouRender = true
