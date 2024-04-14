import React from 'react'

import { customRender as render } from '@/__mocks__/customRender'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

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
  it('submits the form with valid data 1 variant for user-event', async () => {
    const { debug, user } = setup(<CreateNewPassword />)

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
    render(<CreateNewPassword />)
    await waitFor(() => {
      expect(screen.getByText('Your password was successfully changed')).toBeInTheDocument()
    })
  })
  it('submits the form with valid data 2 variant for user-event', async () => {
    render(<CreateNewPassword />)
    await waitFor(() =>
      expect(screen.getByRole('password', { name: 'New password' })).toBeInTheDocument()
    )
    await waitFor(() =>
      expect(
        screen.getByRole('passwordConfirm', { name: 'Password confirmation' })
      ).toBeInTheDocument()
    )

    fireEvent.change(screen.getByRole('password'), { target: { value: passwordText } })

    fireEvent.change(screen.getByRole('passwordConfirm'), { target: { value: passwordText } })

    fireEvent.click(screen.getByRole('button', { name: 'Create new password' }))
    await waitFor(() => {
      expect(createNewPasswordMock).toHaveBeenCalledWith({
        newPassword: passwordText,
        recoveryCode: 'code',
      })
    })
  })
  it('snapshot CreateNewPassword', () => {
    const snapshot = render(<CreateNewPassword />)

    waitFor(() => expect(snapshot).toMatchSnapshot())
  })
})
