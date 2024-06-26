import React from 'react'

import { render, screen, userEvent } from '@/__mocks__/customRender'
import { LoginForm } from '@/features/auth/signIn/ui/loginForm'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ locale: 'en' }),
}))

function setup(jsx: React.JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  }
}

const errorServerMock = 'Invalid credentials'
const onSubmitHandler = jest.fn()

describe('LoginForm', () => {
  test('should call submit function with correct data on form submission', async () => {
    const { user } = setup(<LoginForm errorServer={''} onSubmitHandler={onSubmitHandler} />)

    await user.type(screen.getByLabelText('Email'), 'test@example.com')
    await user.type(screen.getByLabelText('Password'), 'password')
    await user.click(screen.getByRole('button', { name: 'Sign In' }))

    expect(onSubmitHandler).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    })
  })

  test('should display server error message', async () => {
    const { container } = setup(
      <LoginForm errorServer={errorServerMock} onSubmitHandler={onSubmitHandler} />
    )
    const invalidCredentialsElements = container.querySelectorAll('p.regular14.primary.errorWrap')
    const invalidCredentialsText = errorServerMock
    const matchingElements = Array.from(invalidCredentialsElements).filter(
      element => element.textContent === invalidCredentialsText
    )

    expect(matchingElements).toHaveLength(2)
  })
})
