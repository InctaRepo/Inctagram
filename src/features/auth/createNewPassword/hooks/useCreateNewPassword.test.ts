import { useCreateNewPassword } from '@/features/auth/createNewPassword/hooks'
import { renderHook } from '@testing-library/react'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ locale: 'en', query: { code: 'code' } }),
}))
const createNewPasswordMock = jest.fn()
const useCreateNewPasswordMutation = jest
  .fn(() => [
    createNewPasswordMock,
    {
      data: {
        extensions: [undefined],
      },
      error: null,
      isLoading: false,
      isSuccess: false,
    },
  ])
  .mockImplementationOnce(() => [
    createNewPasswordMock,
    {
      data: {
        extensions: [undefined],
      },
      error: null,
      isLoading: false,
      isSuccess: false,
    },
  ])
  .mockImplementationOnce(() => [
    createNewPasswordMock,
    {
      data: {
        extensions: [undefined],
      },
      error: null,
      isLoading: false,
      isSuccess: true,
    },
  ])

jest.mock('@/features/auth/createNewPassword/service/CreateNewPassword', () => ({
  useCreateNewPasswordMutation: () => useCreateNewPasswordMutation(),
}))

const passwordText = '1qaz@WSX'

describe('CreateNewPassword', () => {
  it('1', () => {
    const { result } = renderHook(useCreateNewPassword)

    expect(result.current).toHaveProperty('submit')
    expect(result.current).toHaveProperty('t')
    expect(result.current).toHaveProperty('passwordSentModal')
    expect(result.current).toHaveProperty('onModalClose')
    expect(result.current).toHaveProperty('onSaveModalAction')
    expect(result.current).toHaveProperty('isLoading')
  })
})
