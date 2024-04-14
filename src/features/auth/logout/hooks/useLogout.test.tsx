import { customRenderHook } from '@/__mocks__/customRender'
import { useLogout } from '@/features/auth/logout/hooks/useLogout'
import { act } from '@testing-library/react'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ locale: 'en', push: jest.fn() }),
}))
const useLogoutMutation = jest.fn(() => [jest.fn()])
const useAppDispatch = jest.fn().mockReturnValue(jest.fn())

jest.mock('@/shared/hooks/useAppDispatch', () => ({
  useAppDispatch: () => useAppDispatch(),
}))
jest.mock('@/features/auth/logout/service/logout', () => ({
  useLogoutMutation: () => useLogoutMutation(),
}))
describe('useLogout', () => {
  it('expect correct properties and types', () => {
    const { result } = customRenderHook(useLogout)

    expect(result.current).toHaveProperty('email')
    expect(result.current).toHaveProperty('t')
    expect(result.current).toHaveProperty('logoutHandler')
    expect(result.current).toHaveProperty('onClickOpenModal')
    expect(result.current).toHaveProperty('onModalClose')
    expect(result.current).toHaveProperty('openModal')
    expect(result.current).toHaveProperty('styles')
    expect(result.current).toHaveProperty('variantIcon')

    expect(typeof result.current.email).toBe('string')
    expect(typeof result.current.t).toBe('object')
    expect(typeof result.current.logoutHandler).toBe('function')
    expect(typeof result.current.onClickOpenModal).toBe('function')
    expect(typeof result.current.onModalClose).toBe('function')
    expect(typeof result.current.openModal).toBe('boolean')
    expect(typeof result.current.styles).toBe('object')
    expect(typeof result.current.variantIcon).toBe('object')
  })
  it('expect correct work openModal', () => {
    const { result } = customRenderHook(useLogout)

    expect(result.current.openModal).toBe(false)
    act(() => {
      result.current.onClickOpenModal()
    })
    expect(result.current.openModal).toBe(true)
    act(() => {
      result.current.onModalClose()
    })
    expect(result.current.openModal).toBe(false)
  })
})
