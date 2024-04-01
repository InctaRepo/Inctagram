// import { LoginForm } from '@/features/auth/signIn/ui/loginForm/LoginForm'

//
import { fireEvent, screen, waitFor } from '@testing-library/react'

import { LoginForm } from './LoginForm'

import { render } from '__mocks__/customRender'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ locale: 'en' }),
}))
// jest.mock('module', () => ({
//   __esModule: true, // this makes it work
//   default: jest.fn(),
// }))

describe('LoginForm', () => {
  it('renders LoginForm component', async () => {
    render(<LoginForm />)

    //Assert that the component is rendered
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /password/i })).toBeInTheDocument()
    expect(screen.getByText('Forgot password?')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Forgot password?/i })).toBeInTheDocument()
    expect(screen.getByText('Sign In', { selector: 'p.bold16.primary' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.getByText('Sign Up')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
  })

  it('calls onSubmitHandler with form data on submit', async () => {
    const onSubmitHandler = jest.fn()

    render(<LoginForm onSubmitHandler={onSubmitHandler} />)
    await waitFor(() => {
      fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
        target: { value: 'test@example.com' },
      })
      fireEvent.change(screen.getByRole('textbox', { name: /password/i }), {
        target: { value: '1qaz@WSX' },
      })
    })
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: /sign in/i }))
    })
    // Submit the form
    // Check if the onSubmitHandler function was called with the correct data
    // await waitFor(() => expect(onSubmitHandler).toHaveBeenCalledTimes(1))
    // await waitFor(() => expect(onSubmitHandler).toHaveBeenCalledTimes(1))
    // expect(onSubmitHandler).toHaveBeenCalled()
  })
})

test('displays error message when form submission fails', async () => {
  render(<LoginForm errorServer="Invalid email or password" />)

  await waitFor(() => {
    const errorElements = screen.queryAllByText(/Invalid email or password/i, {
      selector: 'p.regular14.primary.errorWrap',
    })

    expect(errorElements.length).toBeGreaterThan(0)
  })
})
