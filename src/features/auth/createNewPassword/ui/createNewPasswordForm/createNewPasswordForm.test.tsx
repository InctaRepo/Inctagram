import React from 'react'

import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { CreateNewPasswordForm } from './CreateNewPasswordForm'

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

// Mocked onSubmitHandler function for testing
const onSubmitHandler = jest.fn()

describe('CreateNewPasswordForm', () => {
  it('renders form fields and submits data', async () => {
    const onSubmitHandler = jest.fn()
    const { user, debug, container } = setup(
      <CreateNewPasswordForm onSubmitHandler={onSubmitHandler} />
    )

    expect(container.querySelector('form')).toBeInTheDocument()
    // Fill in form fields
    await user.type(screen.getByRole('password', { name: /password/i }), '1qaz@WSX')
    await user.type(screen.getByRole('passwordConfirm', { name: /password/i }), '1qaz@WSX')
    // Submit the form
    await user.click(screen.getByRole('button', { name: /Create new password/i }))

    // Assert that onSubmitHandler is called with the correct data
    expect(onSubmitHandler).toHaveBeenCalledTimes(1)
    expect(onSubmitHandler).toHaveBeenCalledWith({
      password: '1qaz@WSX',
      passwordConfirm: '1qaz@WSX',
    })
  })
  it('snapshot CreateNewPasswordForm', () => {
    const snapshot = render(<CreateNewPasswordForm onSubmitHandler={onSubmitHandler} />)

    waitFor(() => expect(snapshot).toMatchSnapshot())
  })
})
