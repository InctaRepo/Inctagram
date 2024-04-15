/* eslint-disable */
import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'

import { store } from '@/store'
import { render, renderHook, RenderOptions } from '@testing-library/react'

export const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
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

export const customRenderHook = (hook: any, options?: Omit<RenderOptions, 'wrapper'>) => {
  return renderHook(() => hook(), { wrapper: AllTheProviders, ...options })
}
export * from '@testing-library/react'
export * from '@testing-library/user-event'
// eslint-disable-next-line import/export
export { customRender as render }
