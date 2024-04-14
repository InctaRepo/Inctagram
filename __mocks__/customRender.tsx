import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'

import { store } from '@/store'
import { RenderOptions, render, renderHook } from '@testing-library/react'

export const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    // <ThemeProvider theme="light">
    //   <TranslationProvider messages={defaultStrings}>
    <Provider store={store}>{children}</Provider>
    //   </TranslationProvider>
    // </ThemeProvider>
  )
}

export const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })
export const customRenderHook = (hook: any, options?: Omit<RenderOptions, 'wrapper'>) => {
  return renderHook(() => hook(), { wrapper: AllTheProviders, ...options })
}
