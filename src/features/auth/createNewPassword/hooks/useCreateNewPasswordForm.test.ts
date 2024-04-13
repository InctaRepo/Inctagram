import { useCreateNewPasswordForm } from '@/features/auth/createNewPassword/hooks'
import { renderHook } from '@testing-library/react'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ locale: 'en' }),
}))
const onSubmitHandler = jest.fn(() => ({ data: { password: 'string', passwordConfirm: 'string' } }))

describe('useCreateNewPasswordForm', () => {
  it('expect correct properties and types', async () => {
    const { result } = renderHook(() => useCreateNewPasswordForm({ onSubmitHandler }))

    expect(result.current).toHaveProperty('submit')
    expect(result.current).toHaveProperty('t')
    expect(result.current).toHaveProperty('control')
    expect(result.current).toHaveProperty('handleSubmit')
    expect(result.current).toHaveProperty('errors')

    expect(typeof result.current.submit).toBe('function')
    expect(typeof result.current.t).toBe('object')
    expect(typeof result.current.control).toBe('object')
    expect(typeof result.current.handleSubmit).toBe('function')
    expect(typeof result.current.errors).toBe('object')
  })
})
