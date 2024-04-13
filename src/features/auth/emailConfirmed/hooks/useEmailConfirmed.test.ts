import { useEmailConfirmed } from '@/features/auth/emailConfirmed/hooks/useEmailConfirmed'
import { renderHook } from '@testing-library/react'

jest.mock('next/router', () => ({
  useRouter: () => ({
    locale: 'en',
    query: { code: 'mockCode' },
  }),
}))
const useEmailConfirmedMutation = jest
  .fn(() => [
    jest.fn(),
    {
      data: {
        extensions: [{ message: 'email is already confirmed' }],
        resultCode: 2,
      },
      isSuccess: true,
    },
  ])
  .mockImplementationOnce(() => [
    jest.fn(),
    {
      data: {
        extensions: [{ message: 'email is already confirmed' }],
        resultCode: 0,
      },
      isSuccess: true,
    },
  ])
  .mockImplementationOnce(() => [
    jest.fn(),
    {
      data: {
        extensions: [{ message: 'email is already confirmed' }],
        resultCode: 2,
      },
      isSuccess: true,
    },
  ])
  .mockImplementationOnce(() => [
    jest.fn(),
    {
      data: {
        extensions: [{ message: 'Code is incorrect' }],
        resultCode: 2,
      },
      isSuccess: true,
    },
  ])
  .mockImplementationOnce(() => [
    jest.fn(),
    {
      data: {
        extensions: [{ message: 'email confirmation code is expired' }],
        resultCode: 2,
      },
      isSuccess: true,
    },
  ])

jest.mock('@/features/auth/emailConfirmed/service/emailConfirmed', () => ({
  useEmailConfirmedMutation: () => useEmailConfirmedMutation(),
}))

describe('useEmailConfirmed', () => {
  it('expect correct properties and types', () => {
    const { result } = renderHook(useEmailConfirmed)

    expect(result.current).toHaveProperty('data')
    expect(result.current).toHaveProperty('t')
    expect(result.current).toHaveProperty('message')
    expect(result.current).toHaveProperty('messageConfirmed')
    expect(result.current).toHaveProperty('messageExpire')
    expect(result.current).toHaveProperty('messageIncorrectCode')
    expect(result.current).toHaveProperty('isSuccess')

    expect(typeof result.current.data).toBe('object')
    expect(typeof result.current.t).toBe('object')
    expect(typeof result.current.message).toBe('string')
    expect(typeof result.current.messageConfirmed).toBe('string')
    expect(typeof result.current.messageExpire).toBe('string')
    expect(typeof result.current.messageIncorrectCode).toBe('string')
    expect(typeof result.current.isSuccess).toBe('boolean')
  })
})
