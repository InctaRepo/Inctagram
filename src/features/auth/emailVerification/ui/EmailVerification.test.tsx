import React from 'react'

import { render, screen, userEvent, waitFor } from '@/__mocks__/customRender'

import { EmailVerification } from './EmailVerification'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ locale: 'en', query: { code: 'code' } }),
}))

function setup(jsx: React.JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  }
}
const emailRecoveryMock = jest.fn()
const useEmailRecoveryMutation = jest.fn().mockReturnValue([emailRecoveryMock])

jest.mock('@/features/auth/emailVerification/service/emailRecovery', () => ({
  useEmailRecoveryMutation: () => useEmailRecoveryMutation(),
}))
jest.mock('@/ui/recaptcha', () => ({
  Recaptcha: jest.fn(({ onChange }) => {
    onChange(true)
  }),
}))
// ignore console.error
const consoleErrorSpy = jest.spyOn(console, 'error')

consoleErrorSpy.mockImplementation(() => {})
describe('EmailVerification', () => {
  it('submits the email recovery form', async () => {
    const { user } = setup(<EmailVerification />)

    await user.type(screen.getByRole('email', { name: 'Email' }), 'test@example.com')
    await user.click(screen.getByRole('button', { name: 'Send Link' }))
    await waitFor(() => {
      expect(emailRecoveryMock).toHaveBeenCalledWith({ email: 'test@example.com' })
    })
  })
  it('snapshot EmailVerification', () => {
    const snapshot = setup(<EmailVerification />)

    waitFor(() => expect(snapshot).toMatchSnapshot())
  })
})
