import React from 'react'

import { render, screen, userEvent, waitFor } from '@/__mocks__/customRender'

import { Logout } from './Logout'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ locale: 'en', push: jest.fn() }),
}))
const email = 'test@example.com'
const mockGetUserEmail = jest.fn(() => email)

jest.mock('@/shared/hoc/model/selectors/getUserEmail/getUserEmail', () => ({
  getUserEmail: () => mockGetUserEmail(),
}))

function setup(jsx: React.JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  }
}
describe('Logout', () => {
  it('renders Logout button', async () => {
    setup(<Logout />)

    const logoutButton = screen.getByRole('button', { name: 'Log Out' })

    await waitFor(() => expect(logoutButton).toBeInTheDocument())
  })

  it('opens the confirmation modal on button click', async () => {
    const { user } = setup(<Logout />)

    await user.click(screen.getByRole('button', { name: 'Log Out' }))

    const confirmationModal = screen.getByText(
      'Are you really want to log out of your account test@example.com?'
    )

    await waitFor(() => expect(confirmationModal).toBeInTheDocument())
  })

  it('calls logoutHandler when confirming logout', async () => {
    const { user } = setup(<Logout />)

    await user.click(screen.getByRole('button', { name: 'Log Out' }))
    await user.click(screen.getByText('Yes'))

    const confirmationModal = screen.queryByText(
      'Are you really want to log out of your account test@example.com?'
    )

    expect(confirmationModal).not.toBeInTheDocument()
  })

  it('closes the confirmation modal on cancel', async () => {
    const { user } = setup(<Logout />)

    await user.click(screen.getByRole('button', { name: 'Log Out' }))
    await user.click(screen.getByText('No'))

    const confirmationModal = screen.queryByText(
      'Are you really want to log out of your account test@example.com?'
    )

    expect(confirmationModal).not.toBeInTheDocument()
  })
  it('snapshot Logout', () => {
    const snapshot = setup(<Logout />)

    waitFor(() => expect(snapshot).toMatchSnapshot())
  })
})
