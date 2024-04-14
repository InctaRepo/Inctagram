import { customRender as render } from '@/__mocks__/customRender'
import { fireEvent, screen, waitFor } from '@testing-library/react'

import { Logout } from './Logout'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ locale: 'en', push: jest.fn() }),
}))
const email = 'test@example.com'
const mockGetUserEmail = jest.fn(() => email)

jest.mock('@/shared/hoc/model/selectors/getUserEmail/getUserEmail', () => ({
  getUserEmail: () => mockGetUserEmail(),
}))

describe('Logout', () => {
  it('renders Logout button', async () => {
    render(<Logout />)

    const logoutButton = screen.getByRole('button', { name: 'Log Out' })

    await waitFor(() => expect(logoutButton).toBeInTheDocument())
  })

  it('opens the confirmation modal on button click', async () => {
    render(<Logout />)

    const logoutButton = screen.getByRole('button', { name: 'Log Out' })

    fireEvent.click(logoutButton)

    const confirmationModal = screen.getByText(
      'Are you really want to log out of your account test@example.com?'
    )

    expect(confirmationModal).toBeInTheDocument()
  })

  it('calls logoutHandler when confirming logout', async () => {
    render(<Logout />)

    const logoutButton = screen.getByRole('button', { name: 'Log Out' })

    fireEvent.click(logoutButton)

    const confirmButton = screen.getByText('Yes')

    fireEvent.click(confirmButton)

    const confirmationModal = screen.queryByText(
      'Are you really want to log out of your account test@example.com?'
    )

    expect(confirmationModal).not.toBeInTheDocument()
  })

  it('closes the confirmation modal on cancel', async () => {
    render(<Logout />)

    const logoutButton = screen.getByRole('button', { name: 'Log Out' })

    fireEvent.click(logoutButton)

    const cancelButton = screen.getByText('No')

    fireEvent.click(cancelButton)

    const confirmationModal = screen.queryByText(
      'Are you really want to log out of your account test@example.com?'
    )

    expect(confirmationModal).not.toBeInTheDocument()
  })
  it('snapshot Logout', () => {
    const snapshot = render(<Logout />)

    waitFor(() => expect(snapshot).toMatchSnapshot())
  })
})
