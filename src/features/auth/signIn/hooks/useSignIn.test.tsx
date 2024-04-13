import { useSignIn } from '@/features/auth/signIn/hooks/useSignIn'
import { renderHook } from '@testing-library/react'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ locale: 'en', push: jest.fn() }),
}))
jest.mock('@/features/auth/signIn/authByEmail', () => ({
  useSignInMutation: jest.fn().mockReturnValue([
    jest.fn(), // Mocked loginUser function
    {
      data: {}, // Mocked loginData value
      isSuccess: true, // Mocked isSuccess value
    },
  ]),
}))
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  Provider: ({ children }: any) => children,
  useDispatch: jest.fn(),
  useSelector: jest.fn(() => 'string'),
}))
jest.mock('@/shared/hoc', () => ({
  useGetMeQuery: jest.fn().mockReturnValue({
    data: {
      userId: 'user123', // Mocked userId value
    },
    isSuccess: true, // Mocked isSuccess value
  }),
}))
describe('useSignIn', () => {
  it('expect correct properties and types', () => {
    const { result } = renderHook(useSignIn)

    expect(result.current).toHaveProperty('errorServer')
    expect(result.current).toHaveProperty('submit')

    expect(typeof result.current.errorServer).toBe('string')
    expect(typeof result.current.submit).toBe('function')
  })
})
