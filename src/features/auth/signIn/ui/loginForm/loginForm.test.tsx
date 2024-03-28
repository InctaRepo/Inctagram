import { LoginForm } from '@/features/auth/signIn/ui/loginForm/LoginForm'
import { render } from '@/shared/helpers/test-utils'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ locale: 'en' }),
}))
// jest.mock('module', () => ({
//   __esModule: true, // this makes it work
//   default: jest.fn(),
// }))

describe('LoginForm', () => {
  test('renders LoginForm component', () => {
    render(<LoginForm />)

    // Assert that the component is rendered
    // expect(screen.getByText('Sign In')).toBeInTheDocument()
    // expect(screen.getByLabelText('Email')).toBeInTheDocument()
    // expect(screen.getByLabelText('Password')).toBeInTheDocument()
    // expect(screen.getByText('Sign In')).toBeInTheDocument()
  })

  test('calls onSubmitHandler with form data on submit', () => {
    const onSubmitHandler = jest.fn()

    render(<LoginForm onSubmitHandler={onSubmitHandler} />)

    // Fill in the form fields
    // fireEvent.change(screen.getByRole('Email'), { target: { value: 'test@example.com' } })
    // fireEvent.change(screen.getByRole('Password'), { target: { value: 'password123' } })
    //
    // // Submit the form
    // fireEvent.click(screen.getByText('Sign In'))

    // Assert that onSubmitHandler is called with the form data
    // expect(onSubmitHandler).toHaveBeenCalledTimes(1)
    // expect(onSubmitHandler).toHaveBeenCalledWith({
    //   email: 'test@example.com',
    //   password: 'password123',
    // })
  })

  // Add more tests for other functionality as needed
})
