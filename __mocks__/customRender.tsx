import React, { ReactElement } from 'react'

import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'

import { store } from '@/store'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    // <ThemeProvider theme="light">
    //   <TranslationProvider messages={defaultStrings}>
    <Provider store={store}>{children}</Provider>
    //   </TranslationProvider>
    // </ThemeProvider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// eslint-disable-next-line import/export
export * from '@testing-library/react'
// eslint-disable-next-line import/export
export { customRender as render }
