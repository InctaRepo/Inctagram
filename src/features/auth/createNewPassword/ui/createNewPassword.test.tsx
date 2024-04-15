import React from 'react'

import { render, screen, userEvent, waitFor } from '@/__mocks__/customRender'

import { CreateNewPassword } from './CreateNewPassword'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ locale: 'en', query: { code: 'code' } }),
}))

function setup(jsx: React.JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  }
}

const createNewPasswordMock = jest.fn()
const useCreateNewPasswordMutation = jest
  .fn(() => [
    createNewPasswordMock,
    {
      data: {
        extensions: [undefined],
      },
      error: null,
      isLoading: false,
      isSuccess: false,
    },
  ])
  .mockImplementationOnce(() => [
    createNewPasswordMock,
    {
      data: {
        extensions: [undefined],
      },
      error: null,
      isLoading: false,
      isSuccess: false,
    },
  ])
  .mockImplementationOnce(() => [
    createNewPasswordMock,
    {
      data: {
        extensions: [undefined],
      },
      error: null,
      isLoading: false,
      isSuccess: true,
    },
  ])

jest.mock('@/features/auth/createNewPassword/service/CreateNewPassword', () => ({
  useCreateNewPasswordMutation: () => useCreateNewPasswordMutation(),
}))

const passwordText = '1qaz@WSX'

describe('CreateNewPassword', () => {
  it('submits the form with valid data for user-event', async () => {
    const { user } = setup(<CreateNewPassword />)

    expect(screen.getByRole('password', { name: 'New password' })).toBeInTheDocument()

    expect(
      screen.getByRole('passwordConfirm', { name: 'Password confirmation' })
    ).toBeInTheDocument()
    await user.type(screen.getByRole('password', { name: 'New password' }), passwordText)
    await user.type(
      screen.getByRole('passwordConfirm', { name: 'Password confirmation' }),
      passwordText
    )
    await user.click(screen.getByRole('button', { name: 'Create new password' }))
    await waitFor(() => {
      expect(createNewPasswordMock).toHaveBeenCalledWith({
        newPassword: passwordText,
        recoveryCode: 'code',
      })
    })
  })
  it('submits the form with valid data "Your password was successfully changed"', async () => {
    setup(<CreateNewPassword />)
    await waitFor(() => {
      expect(screen.getByText('Your password was successfully changed')).toBeInTheDocument()
    })
  })
  it('snapshot CreateNewPassword', () => {
    const snapshot = setup(<CreateNewPassword />)

    waitFor(() => expect(snapshot).toMatchSnapshot())
  })
})
