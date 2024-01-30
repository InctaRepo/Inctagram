import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import { HistoryProvider, useLoader } from '@/shared/hooks'
import { NextPageWithLayout } from '@/shared/service/nextPageWithLayout'
import { wrapper } from '@/store'
import { ProgressBar } from '@/ui/progressBar'
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
      <Provider store={store}>
        <ProgressBar>{getLayout(<Component {...props.pageProps} />)}</ProgressBar>
      </Provider>
    </HistoryProvider>
  )
}
