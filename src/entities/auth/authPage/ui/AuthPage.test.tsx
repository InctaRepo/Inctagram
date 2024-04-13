import React from 'react'

import { customRender as render } from '@/__mocks__/customRender'
import { AuthPage } from '@/entities/auth/authPage'
import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import clsx from 'clsx'

const routerMock = { locale: 'en', push: '/dashboard' }

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => routerMock),
}))

function setup(jsx: React.JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  }
}

describe('AuthPage', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should render the component with the correct props', async () => {
    const linkPathMock = '/dashboard'
    const nameButtonMock = 'Login'
    const nameButtonTwoMock = 'Register'
    const textMock = 'Welcome to the authentication page!'
    const titleMock = 'Authentication'
    const variantMock = 'merger'

    render(
      <AuthPage
        linkPath={linkPathMock}
        nameButton={nameButtonMock}
        nameButtonTwo={nameButtonTwoMock}
        text={textMock}
        title={titleMock}
        variant={variantMock}
      />
    )
    expect(screen.getByText(titleMock)).toBeInTheDocument()
    expect(screen.getByText(textMock)).toBeInTheDocument()
    expect(screen.getByText(nameButtonMock)).toBeInTheDocument()
    expect(screen.getByText(nameButtonTwoMock)).toBeInTheDocument()

    const buttonOne = screen.getByText(nameButtonMock).parentElement
    const buttonTwo = screen.getByText(nameButtonTwoMock).parentElement

    expect(buttonOne).toHaveClass(clsx('button', 'buttonMerger'))
    expect(buttonTwo).toHaveClass('button')
  })

  it('should render the component without the second button when variant prop is not provided', async () => {
    const linkPathMock = '/dashboard'
    const nameButtonMock = 'Login'
    const nameButtonTwoMock = 'Register'
    const textMock = 'Welcome to the authentication page!'
    const titleMock = 'Authentication'
    const variantMock = undefined
    const { debug, user } = setup(
      <AuthPage
        linkPath={linkPathMock}
        nameButton={nameButtonMock}
        nameButtonTwo={nameButtonTwoMock}
        text={textMock}
        title={titleMock}
        variant={variantMock}
      />
    )

    expect(screen.getByText(titleMock)).toBeInTheDocument()
    expect(screen.getByText(textMock)).toBeInTheDocument()
    expect(screen.getByText(nameButtonMock)).toBeInTheDocument()
    expect(screen.queryByText(nameButtonTwoMock)).toBeNull()

    const buttonOne = screen.getByText(nameButtonMock).parentElement

    expect(buttonOne).toHaveClass('button')

    user.click(screen.getByRole('button', { name: 'Login' }))
    waitFor(() => expect(routerMock.push).toHaveBeenCalledWith(linkPathMock))
  })
})
