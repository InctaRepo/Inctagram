import React from 'react'

import { render, screen, userEvent, waitFor } from '@/__mocks__/customRender'

import { CreateNewPasswordForm } from './CreateNewPasswordForm'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ locale: 'en' }),
}))

function setup(jsx: React.JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  }
}

const onSubmitHandler = jest.fn()

describe('CreateNewPasswordForm', () => {
  it('renders form fields and submits data', async () => {
    const onSubmitHandler = jest.fn()
    const { container, user } = setup(<CreateNewPasswordForm onSubmitHandler={onSubmitHandler} />)

    expect(container.querySelector('form')).toBeInTheDocument()
    await user.type(screen.getByRole('password', { name: /password/i }), '1qaz@WSX')
    await user.type(screen.getByRole('passwordConfirm', { name: /password/i }), '1qaz@WSX')
    await user.click(screen.getByRole('button', { name: /Create new password/i }))
    expect(onSubmitHandler).toHaveBeenCalledTimes(1)
    expect(onSubmitHandler).toHaveBeenCalledWith({
      password: '1qaz@WSX',
      passwordConfirm: '1qaz@WSX',
    })
  })
  it('snapshot CreateNewPasswordForm', () => {
    const snapshot = setup(<CreateNewPasswordForm onSubmitHandler={onSubmitHandler} />)

    waitFor(() => expect(snapshot).toMatchSnapshot())
  })
})
