import React from 'react'

import { customRender as render } from '@/__mocks__/customRender'
import { useCreateNewPasswordForm } from '@/features/auth/createNewPassword/hooks'
import { renderHook } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ locale: 'en' }),
}))

function setup(jsx: React.JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  }
}

// Mocked onSubmitHandler function for testing
const onSubmitHandler = jest.fn(() => ({ data: { password: 'string', passwordConfirm: 'string' } }))

describe('CreateNewPasswordForm', () => {
  it('should return an object with correct properties', async () => {
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
    //   await expect(
    //     result.current.submit({ password: '1qaz@WSX', passwordConfirm: '1qaz@WSX' })
    //   // ).toHaveBeenCalledWith()
  })
})
