import React from 'react'

import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { LoginForm } from './LoginForm'

import { customRender as render } from '@/__mocks__/customRender'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ locale: 'en' }),
}))

function setup(jsx: React.JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  }
}

describe('LoginForm', () => {
  it('renders LoginForm component', async () => {
    render(<LoginForm />)

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByRole('email', { name: /email/i })).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('password', { name: /password/i })).toBeInTheDocument()
    expect(screen.getByText('Forgot password?')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Forgot password?/i })).toBeInTheDocument()
    expect(screen.getByText('Sign In', { selector: 'p.bold16.primary' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.getByText('Sign Up')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
  })

  it('calls onSubmitHandler with form data on submit', async () => {
    const onSubmitHandler = jest.fn()
    const { user, debug } = setup(<LoginForm onSubmitHandler={onSubmitHandler} />)

    await user.type(screen.getByRole('email', { name: /email/i }), 'test@example.com')
    await user.type(screen.getByRole('password', { name: /password/i }), '1qaz@WSX')
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    expect(onSubmitHandler).toHaveBeenCalledTimes(1)
    expect(onSubmitHandler).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: '1qaz@WSX',
    })
    //debug()
  })

  it('displays error message when form submission fails', async () => {
    render(<LoginForm errorServer="Invalid email or password" />)

    await waitFor(() => {
      const errorElements = screen.queryAllByText(/Invalid email or password/i, {
        selector: 'p.regular14.primary.errorWrap',
      })

      expect(errorElements.length).toBeGreaterThan(0)
    })
  })
})
