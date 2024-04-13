import { useLogout } from '@/features/auth/logout/hooks/useLogout'
import { renderHook } from '@testing-library/react'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ locale: 'en', push: jest.fn() }),
}))
const useLogoutMutation = jest.fn(() => [jest.fn()])

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  Provider: ({ children }: any) => children,
  useDispatch: jest.fn(),
  useSelector: jest.fn(() => 'string'),
}))
jest.mock('@/features/auth/logout/service/logout', () => ({
  useLogoutMutation: () => useLogoutMutation(),
}))
describe('useLogout', () => {
  it('expect correct properties and types', () => {
    const { result } = renderHook(useLogout)

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
    expect(typeof result.current.variantIcon).toBe('string')
  })
})
