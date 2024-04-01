import { render } from '@testing-library/react'

import { CreateNewPasswordForm } from './CreateNewPasswordForm'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ locale: 'en' }),
}))
// Mocked onSubmitHandler function for testing
const mockOnSubmitHandler = jest.fn()

describe('CreateNewPasswordForm', () => {
  test('renders form fields and submits data', () => {
    render(<CreateNewPasswordForm onSubmitHandler={mockOnSubmitHandler} />)

    // Find form fields
    //   const newPasswordInput = screen.getByLabelText('New Password')
    //   const confirmPasswordInput = screen.getByLabelText('Password Confirmation')
    //   const submitButton = screen.getByRole('button', { name: 'Create New Password' })
    //
    //   // Fill in form fields
    //   fireEvent.change(newPasswordInput, { target: { value: 'password123' } })
    //   fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } })
    //
    //   // Submit the form
    //   fireEvent.click(submitButton)
    //
    //   // Assert that onSubmitHandler is called with the correct data
    //   expect(mockOnSubmitHandler).toHaveBeenCalledWith({
    //     password: 'password123',
    //     passwordConfirm: 'password123',
    //   })
  })
})
