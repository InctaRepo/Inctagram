import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import { HistoryProvider, useLoader } from '@/src/shared/hooks'
import { NextPageWithLayout } from '@/src/shared/service/nextPageWithLayout'
import { wrapper } from '@/src/store'

import 'src/styles/_globals.scss'
import 'src/styles/nprogress.scss'
import 'react-toastify/dist/ReactToastify.css'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, ...rest }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(rest)

  useLoader()
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <HistoryProvider>
      <Provider store={store}>{getLayout(<Component {...props.pageProps} />)}</Provider>
    </HistoryProvider>
  )
}
