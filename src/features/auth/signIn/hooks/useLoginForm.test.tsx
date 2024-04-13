import { useLoginForm } from '@/features/auth/signIn/hooks/useLoginForm'
import { renderHook } from '@testing-library/react'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ locale: 'en', push: jest.fn() }),
}))
const onSubmitHandler = jest.fn(() => ({ data: { email: 'test@mail.com', password: '1qaz@WSX' } }))
const errorServer = 'error'

describe('useSignIn', () => {
  it('expect correct properties and types', () => {
    const { result } = renderHook(() => useLoginForm({ errorServer, onSubmitHandler }))

    expect(result.current).toHaveProperty('control')
    expect(result.current).toHaveProperty('t')
    expect(result.current).toHaveProperty('errors')
    expect(result.current).toHaveProperty('handleSubmit')
    expect(result.current).toHaveProperty('router')
    expect(result.current).toHaveProperty('submitData')

    expect(typeof result.current.control).toBe('object')
    expect(typeof result.current.t).toBe('object')
    expect(typeof result.current.errors).toBe('object')
    expect(typeof result.current.handleSubmit).toBe('function')
    expect(typeof result.current.router).toBe('object')
    expect(typeof result.current.submitData).toBe('function')
  })
})
