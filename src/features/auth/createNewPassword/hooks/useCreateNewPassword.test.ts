import { useCreateNewPassword } from '@/features/auth/createNewPassword/hooks'
import { renderHook } from '@testing-library/react'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ locale: 'en', query: { code: 'code' } }),
}))
const useCreateNewPasswordMutation = jest.fn(() => [
  jest.fn(),
  {
    data: {
      extensions: [undefined],
    },
    error: null,
    isLoading: false,
    isSuccess: false,
  },
])

jest.mock('@/features/auth/createNewPassword/service/CreateNewPassword', () => ({
  useCreateNewPasswordMutation: () => useCreateNewPasswordMutation(),
}))

describe('useCreateNewPassword', () => {
  it('expect correct properties and types', () => {
    const { result } = renderHook(useCreateNewPassword)

    expect(result.current).toHaveProperty('submit')
    expect(result.current).toHaveProperty('t')
    expect(result.current).toHaveProperty('passwordSentModal')
    expect(result.current).toHaveProperty('onModalClose')
    expect(result.current).toHaveProperty('onSaveModalAction')
    expect(result.current).toHaveProperty('isLoading')

    expect(typeof result.current.submit).toBe('function')
    expect(typeof result.current.t).toBe('object')
    expect(typeof result.current.passwordSentModal).toBe('boolean')
    expect(typeof result.current.onModalClose).toBe('function')
    expect(typeof result.current.onSaveModalAction).toBe('function')
    expect(typeof result.current.isLoading).toBe('boolean')
  })
})
